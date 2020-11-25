const Client = require('../models/Client');
const Pro = require('../models/Pro');

module.exports = {
  getAllClient: async pro => {
    const queryFilters = {}
    pro ? queryFilters['pro'] = pro : null;
    const clientsData = await Client.find(queryFilters).exec();
    return clientsData;
  },
  getClient: async id => Client.findOne({ _id: id }),
  // create should only be done though signup
  // createClient: async values => {
  //   try {
  //     const newClient = new Client(values);
  //     const savedClient = await newClient.save();
  //     const proId = values.pro;
  //     const clientId = savedClient._id;
  //     await Pro.findByIdAndUpdate(proId, { $push: { clients: [clientId] } }, {new: false});
  //     return savedClient;
  //   } catch (err) {
  //     let message = err;
  //     if (info) {
  //       message = info.message;
  //     }
  //     return res.status(500).json({
  //       status: "error",
  //       error: {
  //         message,
  //       },
  //     });
  //   }
  // },
  updateClient: async (id, data) => Client.findByIdAndUpdate(id, data, {new: true}),
  deleteClient: async id => {
    try {
      const proId = await Client.findOne({ _id: id }).select('pro -_id');
      console.log(proId);
      await Pro.updateOne( proId, { $pull: { customer: [id] } }, {new: false});
      await Client.deleteOne({ _id: id });
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
