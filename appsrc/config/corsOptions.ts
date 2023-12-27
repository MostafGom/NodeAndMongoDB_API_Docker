import { CorsOptions } from "cors";

// const corsWhiteList = ['']
const corsWhiteList = ['http://localhost:4000']
const corsOptions: any = {
    origin: (origin: any, callback: any) => {
        if (corsWhiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not Allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}


export default corsOptions