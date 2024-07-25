import express from 'express';
import configs from '../configs.json' with { type: "json" };
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './modules/auth/auth.route.js';
import questionsRouter from './modules/questions/questions.route.js';
import usersRouter from './modules/users/users.route.js';
import fightsRouter from './modules/fights/fights.route.js';
import notiicationsRouter from './modules/notifications/notifications.route.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();

app.get('/', (req, res) => res.send('API works'));

app.use(cors(configs.security.corsOptions));
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/questions', verifyToken, questionsRouter);
app.use('/api/users', verifyToken, usersRouter);
app.use('/api/fights', verifyToken, fightsRouter);
app.use('/api/notifications', verifyToken, notiicationsRouter);

function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      const userError = Object.assign(new Error, { message: 'No token provided.', status: 401 });
      return res.status(userError.status).send(userError);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, _user) => {
      if (error) {
        const userError = Object.assign(new Error, { message: 'Failed to authenticate', status: 401 });
        return res.status(userError.status).send(userError);
      }
      next();
    });
  };

async function run() {
    try {
        const dbUrl = process.env.DB_URL
            .replace('password', process.env.MDB_PASSWORD)
            .replace('app_name', process.env.APP_NAME);
        await mongoose.connect(dbUrl, configs.clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        const port = process.env.port || configs.port;
        app.listen(3000, () => console.log('Server started on port ' + 3000));
    } catch (err) {
        console.log('ERROR HAPPENED', err);
    }
}

run();