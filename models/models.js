var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

// Carga el modelo ORM
var Sequelize = require('sequelize');

// BBDD SQLite

var sequelize = new Sequelize(DB_name, user, pwd, 
	{	dialect: protocol,
		protocol: protocol,
		port: port,
		host: host,
	 	storage: storage,
	 	omitNull: true
	 }
);

// Importamos la definición de la tabla Quiz
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);


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