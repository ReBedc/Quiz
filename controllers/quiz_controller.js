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
};

// GET /quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build( // creación de un nuevo objeto quiz
		{pregunta: "Pregunta", respuesta: "Respuesta"}
	);

	res.render('quizes/new', {quiz: quiz});
};