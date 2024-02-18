const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Feedback = sequelize.define('feedback', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 0,
                max: 5
            }
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Feedback.addHook('afterUpdate', async (feedback, options) => {
        // Verificar si 'score' ha cambiado
        if (feedback.changed('score')) {
            const hotel = await feedback.getHotel();

            if (hotel) {
                // Actualizar el ranking del hotel basado en el cambio de puntuación
                const previousScore = feedback.previous('score') || 0;
                const newScore = feedback.score || 0;
                hotel.ranking = hotel.ranking - previousScore + newScore;

                await hotel.save({ transaction: options.transaction });
            }
        }
    });

    return Feedback;
};