const {itemsModel} = require('../Models/items');
const {historyModel} = require('../Models/history');

class ItemController {
    static async upsert(req,res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);

        if(req.query.quantity !== undefined && req.query.name !== undefined ) {
            if(req.query.id === '') {
                await historyModel.history.create({'item':req.query,'action':'added'});
            }else {
                req.query.preval = await itemsModel.items.findById(req.query.id).exec();
                if(req.query.quantity == req.query.preval.Quantity && req.query.name == req.query.preval.name) {
                    res.status(200).send({message:'Nothing changed',result:[],status:200});
                    return;
                }
                await historyModel.history.create({'item':req.query,'action':'updated'});
            }

            const result = await itemsModel.upsert(req.query);
            switch(result.ok) {
                case true:
                    res.status(200).send({message:'success',result:result,status:200});
                break;
                default:
                    res.status(500).send(result);
            };
    
        }else {
            res.status(404).send({message:'Incomplete Path Parameter',status:404});
        }
    }

    static getall(req,res) {
        itemsModel.items.find({},function(err, items) {
            let collectionItem = {};

            items.forEach(element => {
                collectionItem[element._id] = element;
            });

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.send(collectionItem);
        });
    }

    static async delete(req,res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        if(JSON.parse(Object.keys(req.body)).id !== undefined) {
            historyModel.history.create({'item':await itemsModel.items.findById(JSON.parse(Object.keys(req.body)).id).exec(),'action':'deleted'});
            itemsModel.items.deleteOne({_id:JSON.parse(Object.keys(req.body)).id})
            .then((result) => {
                return res.status(200).send({message:'success',result:result,status:200});
            }).catch((err) => {
                return res.status(500).send({message:'something went wrong',status:500});
            });
        }else {
            return res.status(404).send({message:'Empty id',status:404});
        }
    }
};

module.exports = ItemController;