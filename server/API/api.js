const ItemController = require('../Controllers/itemController');
const HistoryController = require('../Controllers/HistoryController');

function exposeApi(app,express) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
     
    app.post('/api/delete/item/', 
    (req,res) => ItemController.delete(req,res));
    
    app.get('/api/upsert-items/?',
    (req,res) => ItemController.upsert(req,res));
    
    app.get('/api/get-all-items/',
    (req,res)=>ItemController.getall(req,res));

    app.get('/api/get-all-history/',
    (req,res) => HistoryController.getAll(req,res));
};

module.exports = {exposeApi};