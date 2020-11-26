const Pro = require('../models/Pro');

module.exports = {
  getProData: async id => Pro.findOne({ _id: id }).populate('clients').exec(),
  updatePro: async (id, data) => Pro.findByIdAndUpdate(id, data, { new: true }),
  deletePro: async id => Pro.deleteOne({ _id: id }),
};
