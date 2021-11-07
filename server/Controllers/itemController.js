const {itemsModel} = require('../Models/items');

class ItemController {
    static async upsert(req,res) {
        
        if(req.query.quantity !== undefined && req.query.name !== undefined ) {
            const result = await itemsModel.upsert(req.query)
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);
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
    

    static delete(req,res) {
        if(req.body.name !== undefined) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);    
            itemsModel.items.deleteOne({name:req.body.name})
            .then((result) => {
                res.status(200).send({message:'success',result:result,status:200});
            }).catch((err) => {
                res.status(500).send({message:'something went wrong',status:500});
            });
        }else {
            res.status(404).send({message:'Empty name',status:404});
        }
    }
};

module.exports = ItemController;