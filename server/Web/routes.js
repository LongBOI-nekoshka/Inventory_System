function reactApp (app,express,path) {
    app.use(express.static(path.join(__dirname, '../../', 'build')));
    app.use(express.static('public'));
    web(app,path);
}

function web(app,path) {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
}

module.exports = {reactApp}