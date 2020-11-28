const Invitation = require('../models/Invitation');

module.exports = {
  getAllInvitations: async pro => {
    const queryFilters = {};
    pro ? queryFilters.pro = pro : null;
    const invitationData = await Invitation.find(queryFilters).exec();
    return invitationData;
  },
  getInvitation: async id => Invitation.findOne({ _id: id }),
  createInvitation: async (proId, values) => {
    values.pro = proId;
    const newInvitation = new Invitation(values);
    const savedInvitation = await newInvitation.save();
    return savedInvitation;
  },
  deleteInvitation: async id => Invitation.deleteOne({ _id: id }),
};