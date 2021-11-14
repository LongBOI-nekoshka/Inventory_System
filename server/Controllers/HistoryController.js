const {historyModel} = require('../Models/history');

class HistoryController {
  static async getAll(req,res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.send( await historyModel.history.find({}).exec());
  }
}

module.exports = HistoryController; 