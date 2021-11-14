const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class itemsModel {
  static #items = new Schema({
    name: {
      type: String,
      required:true
    },
    Quantity:{
      type: Number,
      required:true
    }
  },{timestamps: true});

  static items = mongoose.model('items',this.#items);

  static upsert = (data) => {
    return this.items.updateOne({_id:data.id === '' ? mongoose.Types.ObjectId() : data.id},{Quantity:data.quantity,name:data.name}, {upsert:true}).then((result)=>{
      result['ok'] = true;
      return result;
    }).catch((err) => {
      err['ok'] = false;
      return err;
    });
  };
}

module.exports = {itemsModel};