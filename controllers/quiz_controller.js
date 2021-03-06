var models = require('../models/models.js');

exports.load = function(req, res, next, quizId) {
	models.Quiz.findById(quizId).then(
		function (quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else {
				next (new Error('No existe quizId = ' + quizId));
			}
		}
	).catch(function (error) {next(error);});
};

// GET /quizes
exports.index = function(req, res) {
	var str = (req.query.search || '').replace(/ /g, '%');
	models.Quiz.findAll({where: ["pregunta like ?", '%'+str+'%'], order: 'pregunta ASC'}).then(function(quizes) {
			res.render('index.ejs', {title: 'Quiz', quizes: quizes, errors: []});
		}
	).catch(function (error) {next(error);});
};

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/question.ejs', {quiz: req.quiz, errors: []});
};

// GET /quizes/:id/answer 
exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});	
};

// GET /quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build( // creación de un nuevo objeto quiz
		{pregunta: "Pregunta", respuesta: "Respuesta", tema: "Tema"}
	);

	res.render('quizes/new', {quiz: quiz, errors: []});
};

// GET /quizes/create
exports.create = function(req, res) {
	var quiz = models.Quiz.build(req.body.quiz);

	quiz.validate().then(
		function (err) {
			if (err){
				res.render('quizes/new', {quiz: quiz, errors: err.errors});
			}
			else {
				// guarda la pregunta en BBDD y redirecciona a la página de quizes
				quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(
					function () {
						res.redirect('/quizes');
					}
				)
			}
		}
	);
};

exports.edit = function(req, res) {
	var quiz = req.quiz; // autoload de instancia de quiz
	res.render('quizes/edit', {quiz: quiz, errors: []});
};

exports.update = function(req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;

	req.quiz.validate().then(
		function(err) {
			if (err) {
				res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
			}
			else {
				req.quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(
					function() {res.redirect('/quizes');} // redirección a la lista de preguntas
				);
			}
		}
	)
};
