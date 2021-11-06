const mongoose = require('mongoose');
const url = 'mongodb://adam:1234@127.0.0.1:27017/inventory_system';


function connectDB (app) {
    mongoose.connect(url).then((result) => {
        listenToThis(app);
    }).catch((err) => {
        console.log(err);
    });
}

function listenToThis (app) {
    app.listen(5000, function () {
        console.log('server is running');
    });
};

module.exports = {connectDB};