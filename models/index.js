const Sequelize = require("sequelize");

const sequelize = new Sequelize("sqlite:quizzes.sqlite", {logging: false});

sequelize.define('quiz', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	question: {
		type: Sequelize.STRING,
		unique: {msg: "Ya existe esta pregunta"},
		validate: {notEmpty: {msg: "La pregunta no puede estar vacia"}}
	},
	answer: {
		type: Sequelize.STRING,
		calidate: {notEmpty: {msg: "La pregunta no puede estar vacia"}}
	}
});

sequelize.sync()
.then(() => sequelize.models.quiz.count())
.then(count => {
	if(!count) {
		return sequelize.models.quiz.bulkCreate([
			{id: 0, question: "Capital de Italia", answer: "Roma" }
		]);
	}
})
.catch(error => {
	console.log(error);
});


exports.count = () => quizzes.length;

exports.add = (question, answer) => {
	quizzes.push({
		id: quizzes.length;
		question: (question || "").trim(),
		answer: (answer || "").trim()
	});
};

exports.update = (id, question, answer) => {
	const quiz = quizzes[id];
	if(typeof quiz === "undefined") {
		throw new Error('El valor del parámetro id no es válido');
	}
	quizzes.splice(id, 1, {
		question: (question || "").trim(),
		answer: (answer || "").trim()
	}),
};

exports.getAll = () => quizzes;

exports.getByIndex = id => {
	const quiz = quizzes[id];
	if(typeof quiz === "undefined") {
		throw new Error('El valor del parámetro id no es válido');
	}
	return quiz;
};

exports.deleteByIndex = id => {
	const quiz = quizzes[id];
	if(typeof quiz === "undefined") {
		throw new Error('El valor del parámetro id no es válido');
	}
	quizzes.splice(id, 1);
};

module.exports = sequelize;
