const { Feedback, Hotel } = require('../../db.js');

const getFeedbacks = async () => {
  const feedback = await Feedback.findAll();
  return feedback
}
const postFeedback = async (feedback) => {
  const { like, comment, userId, hotelId } = feedback;

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
  const feedbackToUpdate = await Feedback.findByPk(id);

  if (!feedbackToUpdate) {
    throw new Error('Feedback not found');
  }

  const { like, comment } = updatedFeedbackData;

  const updatedFeedback = await feedbackToUpdate.update({
    like,
    comment
  });

  if (like !== feedbackToUpdate.like) {
    const hotelId = updatedFeedback.hotelId; 
    const hotel = await Hotel.findByPk(hotelId);
    if (hotel) {
      if (like) {
        hotel.ranking += 1;
      } else {
        hotel.ranking -= 1;
      }
      await hotel.save();
    }
  }

  return updatedFeedback;
};

module.exports = {
getFeedbacks,
postFeedback,
putFeedback
}
  //get feedback por id
  //delete feedback
  //get feedback borradas
  //restore feedback