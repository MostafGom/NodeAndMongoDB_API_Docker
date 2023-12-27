import { Request, Response } from "express";
import createHttpError from "http-errors";
import express from 'express'
import cors from 'cors'
import path from 'path';
import { logger } from './middleware/logEvents';

import cookieParser from 'cookie-parser';
import routerIndex from './routes';
import errorHandler from './middleware/errorHandler';
import corsOptions from './config/corsOptions';
import connectToDB from './db/connectToDB';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/routeTemp', express.static(path.join(__dirname, 'public')))

app.use(logger);

app.use(cookieParser())
app.use(cors(corsOptions));
app.use('/', routerIndex.rootRoute);
app.use('/register', routerIndex.registerRoute);
app.use('/auth', routerIndex.authRoute);

app.all('*', (req: Request, res: Response) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ error: '404 Not Found' })
    }
})

app.use(errorHandler)


connectToDB((error: any) => {
    if (error) {
        console.error(error);
        createHttpError.InternalServerError('Failed To Connect');
        // res.json({ error: '404 Not Found' })
    } else {
        app.listen(PORT, function () {
            console.log('Server listening on port ' + PORT);
        });
    }
});