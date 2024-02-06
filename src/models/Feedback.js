const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Feedback = sequelize.define('feedback', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        like: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    { paranoid: true }
    );

    Feedback.addHook('afterUpdate', async (feedback, options) => {
        // Verificar si 'like' ha cambiado
        if (feedback.changed('like')) {
            const hotel = await feedback.getHotel();

            if (hotel) {
                // Restar 1 al ranking si 'like' cambió de true a false
                if (feedback.previous('like')) {
                    hotel.ranking -= 1;
                }
                // Sumar 1 al ranking si 'like' cambió de false a true
                if (feedback.like) {
                    hotel.ranking += 1;
                }

                await hotel.save({ transaction: options.transaction });
            }
        }
    });

    return Feedback;
};