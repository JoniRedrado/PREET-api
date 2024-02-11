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
      attributes: ['name', "image"]
     }
    });
  return feedback
}
const getFeedbacksHotel = async (id) => {
  const feedback = await Feedback.findAll({
    where: { hotelId: id },
    include: [{
      model: User,
      attributes: ['name', "last_name"]
    }]
  });
  return feedback
}
const postFeedback = async (feedback, userId, hotelId) => {
  const { like, comment, roomId } = feedback;

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

  const newFeedback = await Feedback.create({ like, comment, userId, hotelId });

  if (like) {
    const hotel = await Hotel.findByPk(hotelId);
    if (hotel) {
      hotel.ranking += 1;
      await hotel.save();
    }
  }

  return newFeedback;
};
const putFeedback = async (id, updatedFeedbackData) => {
  const feedback = await Feedback.findByPk(id);
  if (!feedback) {
    throw new Error('Feedback not found');
  }
  const updatedFeedback = await feedback.update(updatedFeedbackData);
  return updatedFeedback;
};
const deleteFeedback = async (id) => {
  const feedback = await Feedback.findByPk(id);
  if (!feedback) {
    throw new Error('Feedback not found');
  }
  feedback.like = false;
  await feedback.save(); 

  await feedback.destroy(); 
}

module.exports = {
getFeedbacks,
getFeedbacksUser,
getFeedbacksHotel,
postFeedback,
putFeedback,
deleteFeedback
}

  //delete feedback
  //get feedback borradas
  //restore feedback