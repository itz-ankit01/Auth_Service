const express = require('express');
const {PORT} = require('./config/serverConfig');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/index')

// const bcrypt = require('bcrypt');
// const { User } = require('./models/index');
// const UserRepository = require('./repository/user-repository')

const app = express();

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`server started at PORT ${PORT}`);

        // const user = new UserRepository();
        // const response = await user.getById(1);
        // console.log(response);

        // const incomingPassword = '123456565';
        // const user = await User.findByPk(3);
        // const response = await bcrypt.compareSync(incomingPassword, user.password);
        // console.log(response);
    })
}

prepareAndStartServer();