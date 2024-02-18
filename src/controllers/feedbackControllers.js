const { Feedback, Hotel, User, Booking, Room} = require('../../db.js');

const getFeedbacks = async () => {
  const feedback = await Feedback.findAll();
  return feedback
}
const getFeedbacksUser = async (id) => {
  const feedback = await Feedback.findAll({
     where: { userId: id }, 
     include: {
      model: Hotel,
      attributes: ['name']
     }
    });
  return feedback
}
const getFeedbacksHotel = async (query, id) => {

  const {page, limit } = query;


  const feedback = await Feedback.findAndCountAll({
    limit: Number(limit),
    offset: (page - 1) * Number(limit),
    where: { hotelId: id },
    include: [{
      model: User,
      attributes: ['name', "last_name", "nationality"]
    }]
  });
  return feedback
}
const postFeedback = async (feedback, userId, hotelId) => {
  const { score, comment, roomId } = feedback;

  const existingBooking = await Booking.findOne({ where: { userId, roomId } });
  if (!existingBooking) {
    throw new Error('User has not made a booking for this hotel');
  }

  const room = await Room.findByPk(roomId);

  if (room.hotelId != hotelId) {
    throw new Error('Room does not belong to the specified hotel');
  }

  const existingFeedback = await Feedback.findOne({ where: { userId, hotelId } });
  if (existingFeedback) {
    throw new Error('Feedback already exists for this user and hotel');
  }

  const newFeedback = await Feedback.create({ score, comment, userId, hotelId });

  if (score > 0) {
    const hotel = await Hotel.findByPk(hotelId);
    if (hotel) {
      hotel.ranking += score;
      await hotel.save();
    }
  }

  return newFeedback;
};
const putFeedback = async (id, updatedFeedbackData, userId) => {
  const feedback = await Feedback.findByPk(id);
  if (!feedback) {
    throw new Error('Feedback not found');
  }
  if (feedback.userId !== userId) {
    throw new Error('User is not authorized to update this feedback');
  }
  const updatedFeedback = await feedback.update(updatedFeedbackData);
  return updatedFeedback;
};
const deleteFeedback = async (id) => {
  const feedback = await Feedback.findByPk(id);
  if (!feedback) {
    throw new Error('Feedback not found');
  }

  feedback.score = 0;
  await feedback.save();

  await feedback.destroy();
};

module.exports = {
getFeedbacks,
getFeedbacksUser,
getFeedbacksHotel,
postFeedback,
putFeedback,
deleteFeedback
}
