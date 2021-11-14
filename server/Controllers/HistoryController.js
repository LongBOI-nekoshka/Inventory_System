const {historyModel} = require('../Models/history');

class HistoryController {
  static async getAll(req,res) {
    res.send( await historyModel.history.find({}).exec());
  }
}

module.exports = HistoryController; 