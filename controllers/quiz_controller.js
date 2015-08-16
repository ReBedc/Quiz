var models = require('../models/models.js');

exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
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
<<<<<<< HEAD
	models.Quiz.findAll().then(function(quizes) {
			res.render('index.ejs', {title: 'Quiz', quizes: quizes});
		}
	).catch(function (error) {next(error);});
};

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/question.ejs', {quiz: req.quiz});
};

// GET /quizes/:id/answer 
exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});	
=======
	models.Quiz.findAll().then(
		function (quizes) {
			res.render('quizes/index.ejs', {quizes: quizes, errors: []});
		}
	).catch(function (error) {next(error);});
};

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz, errors: []});
};

// GET /quizes/:id/answer 
exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});	
>>>>>>> busqueda
};

// GET /quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build( // creación de un nuevo objeto quiz
<<<<<<< HEAD
		{pregunta: "Pregunta", respuesta: "Respuesta"}
	);

	res.render('quizes/new', {quiz: quiz});
};
=======
		{pregunta: "Pregunta", respuesta: "Respuesta", tema: "Tema"}
	);

	res.render('quizes/new', {quiz: quiz, errors: []});
};

// GET /quizes/create
export.create = function(req, res) {
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

>>>>>>> busqueda
