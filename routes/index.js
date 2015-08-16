var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
<<<<<<< HEAD
  res.render('bienvenido', {title: 'Quiz'});
=======
  res.render('index', { title: 'Bienvenido a Quiz' });
>>>>>>> busqueda
});

// Autoload
router.param('quizId', quizController.load);

<<<<<<< HEAD
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
//router.get('/quizes/new', quizController.new);
//router.get('quizes/create', quizController.create);
=======
router.get('quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.get('quizes/create', quizController.create);
>>>>>>> busqueda

router.get('/author', function(req, res, next) {
  res.render('author');
});

module.exports = router;
