module.exports = function (sequelize, Sequelize) {

	return sequelize.define('Model', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		first_name: {
			type: Sequelize.STRING
		},
		last_name: {
			type: Sequelize.STRING
        },
        height: {
			type: Sequelize.DECIMAL(10, 2)
        },
        bust: {
			type: Sequelize.STRING
        },
        waist: {
			type: Sequelize.DECIMAL(10, 2)
        },
        hips: {
			type: Sequelize.DECIMAL(10, 2)
        },
        dress: {
			type: Sequelize.STRING
        },
        shoe: {
			type: Sequelize.STRING
        },
        hair: {
			type: Sequelize.STRING
        },
        eyes: {
			type: Sequelize.STRING
		}
	}, {
		underscored: true
	});

}