const Session = require('../models/Session');
const Client = require('../models/Client');

module.exports = {
  getAllSessions: async (pro, client) => {
    const queryFilters = {};
    pro ? (queryFilters.pro = pro) : null;
    client ? (queryFilters.client = client) : null;
    const sessionsData = await Session.find(queryFilters).exec();
    return sessionsData;
  },
  getSession: async (id) => Session.findOne({ _id: id }),
  createSession: async (proId, values) => {
    try {
      values['pro'] = proId;
      const newSession = new Session(values);
      const savedSession = await newSession.save();
      const clientId = values.client;
      const sessionId = savedSession.id;
      await Client.updateOne(
        { _id: clientId },
        { $push: { sessions: [sessionId] } },
        { new: false }
      );
      return savedSession;
    } catch (err) {
      let message = err;
      if (info) {
        message = info.message;
      }
      return res.status(500).json({
        status: 'error',
        error: {
          message,
        },
      });
    }
  },
  updateSession: async (id, data) => {
    const exercises = {};
    console.log(data);
    // data.exercise ? exercises.exercise = data.exercise : null;
    // data.comment ? exercises.comment = data.comment : null;
    // const updateData = data;
    // exercises ? updateData.exercises = exercises : null;
    const updatedSession = await Session.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedSession;
  },
  deleteSession: async (id) => {
    try {
      const clientId = await Session.findOne({ _id: id }).select('client-_id');
      await Client.updateOne(
        { _id: clientId },
        { $pull: { sessions: [id] } },
        { new: false }
      );
      await Session.deleteOne({ _id: id });
      return;
    } catch (err) {
      let message = err;
      if (info) {
        message = info.message;
      }
      res.status(500).json({
        status: 'error',
        error: {
          message,
        },
      });
    }
  },
};
