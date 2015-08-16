var path = require('path');

// Carga el modelo ORM
var Sequelize = require('sequelize');

// BBDD SQLite
var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage: "quiz.sqlite"});

// Importamos la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// Exportamos la definición de la tabla Quiz
exports.Quiz = Quiz;

// Creación e inicialización de la tabla de preguntas en BBDD
sequelize.sync().success(function() {
	//success(..) ejecuta  el manejador una vez creada la tabla
	Quiz.count().success(function (count) {
		if (count === 0) { // solo inicializamos la tabla cuando está vacía
			Quiz.create({pregunta: 'Capital de Italia', respuesta: 'Roma', tema:'ciencia'});
			Quiz.create({pregunta: 'Capital de Portugal', respuesta: 'Lisboa', tema:'ciencia'})
			.then(function () {console.log('Base de Datos inicializada')});
		};
	});
});