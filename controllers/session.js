const Session = require('../models/Session');

module.exports = {
  getAllSessions: async (pro, client) => {
    const queryFilters = {}
    pro ? queryFilters['pro'] = pro : null;
    client ? queryFilters['client'] = client : null;
    console.log('sessions controllers', queryFilters);
    await Session.find(queryFilters).exec();
  }
  
  // getSession: async id => Session.findOne({ _id: id }),
  // updatePro: async (id, data) => Session.findByIdAndUpdate(id, data, {new: true}),
  // deletePro: async id => Session.deleteOne({ _id: id }),
};
