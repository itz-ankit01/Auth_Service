const express = require('express');
const {PORT} = require('./config/serverConfig');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/index')

const UserService = require('./services/user-services');

const db = require('./models/index');
const { User, Role } = require('./models/index');

const app = express();

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`server started at PORT ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true});
        }

        const u1 = await User.findByPk(1);
        const r1 = await Role.findByPk(1);
        // u1.addRole(r1);

        const response = await u1.hasRole(r1);
        console.log(response);
        

        // const service = new UserService();
        // const newToken = await service.createToken({email: 'sanket@admin.com', id: 1} );
        // console.log(newToken);

        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbmtldEBhZG1pbi5jb20iLCJpZCI6MSwiaWF0IjoxNzI0NzcyNzc5LCJleHAiOjE3MjQ3NzI3Nzl9.OGQ0Z2GHA4s0McokJbb1z1t4UZqkT-dXovubgxSPFQI';

        // const response = await service.verrifyToken(token);
        // console.log(response);

        // db.sequelize.sync({alter: true});


    })
}

prepareAndStartServer();