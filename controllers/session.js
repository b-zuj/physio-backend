const Session = require('../models/Session');
const Client = require('../models/Client');

module.exports = {
  getAllSessions: async (pro, client) => {
    const queryFilters = {}
    pro ? queryFilters['pro'] = pro : null;
    client ? queryFilters['client'] = client : null;
    const sessionsData = await Session.find(queryFilters).exec();
    return sessionsData;
  },
  getSession: async id => Session.findOne({ _id: id }),
  createSession: async values => {
    try {
      const newSession = new Session(values);
      const savedSession = await newSession.save();
      const clientId = values.client;
      const sessionId = savedSession._id;
      await Client.updateOne({ _id: clientId }, { $push: { sessions: [sessionId] } }, {new: false})
      return savedSession;
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
  updateSession: async (id, data) => Session.findByIdAndUpdate(id, data, {new: true}),
  deleteSession: async id => {
    try {
      const clientId = await Session.findOne({ _id: id }).select('client-_id');
      console.log(clientId);
      await Client.updateOne({ _id: clientId }, { $pull: { sessions: [id] } }, {new: false});
      await Session.deleteOne({ _id: id });
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
