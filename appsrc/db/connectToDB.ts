const mongoose = require('mongoose');
import { Error } from 'mongoose';
import { logEvents } from '../middleware/logEvents';

const connectToDB = async (callback: any) => {

    // mongoose.connect('mongodb://root:example@mongodocker_container:27017/testdsdsd', {
    //     // useNewUrlParser: true,
    //     // useUnifiedTopology: true,
    //     authSource: 'admin', // Specify the authentication database
    //     authMechanism: 'DEFAULT',
    // }).then(mongoConn => {
    //     console.log(mongoConn);
    //     console.log('connected to db');
    //     callback(null, mongoConn)
    // }).catch(error => {
    //     console.error(error);
    //     logEvents(`${error.name}: ${error.message}`, 'errorlog.txt');
    //     callback(error, null)
    // })

    try {
        await mongoose.connect('mongodb://root:example@mongodocker_container:27017/testdsdsd', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            authSource: 'admin', // Specify the authentication database
            authMechanism: 'DEFAULT',
        })
        console.log('connected to db');
        callback(null, mongoose)
    } catch (error: Error | any) {
        console.error(error);
        logEvents(`${error.name}: ${error.message}`, 'errorlog.txt');
        callback(error, null)
    }
}

export default connectToDB