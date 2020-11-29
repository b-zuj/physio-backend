const Pro = require('../models/Pro');

module.exports = {
  getProData: async (id) =>
    Pro.findOne({ _id: id })
      .populate({
        path: 'invitations',
        path: 'clients',
        populate: {
          path: 'sessions',
          model: 'Session',
          populate: {
            path: 'exercises.exercise',
            model: 'Exercise',
          },
        },
      })
      .exec(),
  updatePro: async (id, data) =>
    Pro.findByIdAndUpdate(id, data, { new: true })
      .populate({
        path: 'invitations',
        path: 'clients',
        populate: {
          path: 'sessions',
          model: 'Session',
          populate: {
            path: 'exercises.exercise',
            model: 'Exercise',
          },
        },
      })
      .exec(),
  deletePro: async (id) => Pro.deleteOne({ _id: id }),
};
