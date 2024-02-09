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
  const feedback = await Feedback.findByPk(id);
  if (!feedback) {
    throw new Error('Feedback not found');
  }
  const updatedFeedback = await feedback.update(updatedFeedbackData);
  return updatedFeedback;
};

module.exports = {
getFeedbacks,
postFeedback,
putFeedback
}
  //get feedback user
  //get feedback por id
  //delete feedback
  //get feedback borradas
  //restore feedback