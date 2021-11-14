const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class historyModel {
  static #history = new Schema ({
    item:{
      type: Object,
      require:true
    },
    action:{
      type: String,
      require:true
    }
  },{timestamps:true});

  static history = mongoose.model('history',this.#history);
}


module.exports = {historyModel};