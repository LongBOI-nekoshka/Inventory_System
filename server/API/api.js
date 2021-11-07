const ItemController = require('../Controllers/itemController');

function exposeApi(app,express) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
     
    app.post('/api/delete/item/', 
    (req,res) => ItemController.delete(req,res));
    
    app.get('/api/upsert-items/?',
    (req,res) => ItemController.upsert(req,res));
    
    app.get('/api/get-all-items/',
    (req,res)=>ItemController.getall(req,res));
};

module.exports = {exposeApi};