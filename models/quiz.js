// Definición del modelo de Quiz
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'Quiz',
		{ pregunta: {type: Datatypes.STRING,
					 validate: {notEmpty: {msg: "-> Falta pregunta"}}
					},
		  respuesta: {type: Datatypes.STRING,
		  			  validate: {notEmpty: {msg: "-> Falta respuesta"}}
		  			}
		  tema: {type: Datatypes.STRING}
		}
	);
}