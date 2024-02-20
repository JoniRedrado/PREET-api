const { Booking, User, Room, Hotel, Feedback} = require('../../db.js');
const { Sequelize, Op } = require('sequelize');

const metricUsers = async (start_date, end_date) => {
    const userMetrics = await User.findAll({
      attributes: [
        'nationality',
        [Sequelize.fn('count', Sequelize.col('id')), 'user_count']
      ],
      where: {
        createdAt: {
          [Op.between]: [start_date, end_date]
        }
      },
      group: ['nationality']
    });
  
    return userMetrics;
  }

const metricIncomesHotels = async (start_date, end_date) => {

    const incomes = await Hotel.findAll({
      attributes: [
        'id',"name",
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'incomes'],
        [Sequelize.literal('ROUND(SUM(amount) - SUM(commission) - SUM(price))'), 'net_incomes']
      ],
      include: [
        {
           model: Room, as: 'rooms', attributes: [], include: [{

               model: Booking, as: 'bookings', attributes: [],
               where: {
                createdAt: {
                  [Op.between]: [start_date, end_date]
                }
              },
           }],
        },
      ],
      group: ["hotel.id"],
      order: [[Sequelize.literal('incomes'), 'DESC']]
    })
    return incomes
};
const metricNetIncome = async (start_date, end_date) => {

    const netIncomes = await Hotel.findAll({
        attributes: [
          'id',"name",
          [Sequelize.literal('SUM(amount) - SUM(commission) - SUM(price)'),  'net_incomes']
        ],
        include: [
          {
             model: Room, as: 'rooms', attributes: [], include: [{
  
                 model: Booking, as: 'bookings', attributes: [],
                 where: {
                  createdAt: {
                    [Op.between]: [start_date, end_date]
                  }
                },
             }],
          },
        ],
        group: ["hotel.id"],
        order: [[Sequelize.literal('net_incomes'), 'DESC']]
      })
      return netIncomes
}
      


const metricBookingsHotels = async (start_date, end_date) => {
    const numberOfBookings = await Hotel.findAll({
      attributes: [
        'id', "name", 
        [Sequelize.fn('COUNT', Sequelize.col('rooms.bookings.id')), 'total_bookings']
      ],
      include: [
        {
          model: Room, as: 'rooms', attributes: [], 
          include: [
            {
              model: Booking, as: 'bookings', attributes: [],
              where: {
                createdAt: {
                  [Op.between]: [start_date, end_date]
                }
              },
            }
          ],
        },
      ],
      group: ["hotel.id"],
      order: [[Sequelize.literal('total_bookings'), 'DESC']]
    });
    return numberOfBookings;
  };
const metricRanking = async (start_date, end_date) => {

    const scores = await Hotel.findAll({
      attributes: [
        "id", "name",
         [Sequelize.literal('ROUND(AVG(score), 2)'), 'total_score'],
      ],
      include: [
        {
        model: Feedback, as: 'feedbacks', attributes: [],
        where: {
          createdAt: {
            [Op.between]: [start_date, end_date]
          }
        },
      }],
      group: ["hotel.id"],
      order: [[Sequelize.literal('total_score'), 'DESC']]
    })
    return scores
  }
  module.exports = { 
    metricUsers,
    metricIncomesHotels,
    metricNetIncome,
    metricBookingsHotels,
    metricRanking
 }