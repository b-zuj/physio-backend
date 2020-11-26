const Session = require('../models/Session');
const Exercise = require('../models/Exercise');

module.exports = {
  getAllExercises: async (title) => {
    const queryFilters = {};
    title ? queryFilters['title'] = title : null;
    const sessionsData = await Exercise.find(queryFilters).exec();
    return sessionsData;
  },
  getExercise: async id => Exercise.findOne({ _id: id }),
  createExercise: async values => {
    const newExercise = new Exercise(values);
    const savedExercise = await newExercise.save();
    return savedExercise;
  },
  updateExercise: async (id, data) => Exercise.findByIdAndUpdate(id, data, {new: true}),
  deleteExercise: async id => {
    try {
      const clientId = await Exercise.findOne({ _id: id }).select('client-_id');
      console.log(clientId);
      await Session.update( { exercises: { "$in" : [id]} }, { $pull: { exercises: [id] } }, {new: false});
      await Exercise.deleteOne({ _id: id });
      return;
    } catch (err) {
      let message = err;
      if (info) {
        message = info.message;
      }
      return res.status(500).json({
        status: "error",
        error: {
          message,
        },
      });
    }
  },
};
