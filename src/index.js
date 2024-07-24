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

dotenv.config();
const app = express();

app.get('/', (req, res) => res.send('API works'));

app.use(cors(configs.security.corsOptions));
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/users', usersRouter);
app.use('/api/fights', fightsRouter);
app.use('/api/notifications', notiicationsRouter);

async function run() {
    try {
        const dbUrl = process.env.DB_URL
            .replace('password', process.env.MDB_PASSWORD)
            .replace('app_name', process.env.APP_NAME);
        await mongoose.connect(dbUrl, configs.clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        const port = process.env.port || configs.port;
        app.listen(port, () => console.log('Server started on port ' + port));
    } catch (err) {
        console.log('ERROR HAPPENED', err);
    }
}

run();