import express from 'express';
import configs from '../configs.json' with { type: "json" };
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './modules/auth/auth.route.js';
import questionsRouter from './modules/questions/questions.route.js';
import usersRouter from './modules/users/users.route.js';
import fightsRouter from './modules/fights/fights.route.js';
import notiicationsRouter from './modules/notifications/notifications.route.js';

const app = express();

app.use(cors(configs.security.corsOptions));
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/users', usersRouter);
app.use('/api/fights', fightsRouter);
app.use('/api/notifications', notiicationsRouter);

async function run() {
    try {
        const dbUrl = configs.dbUrl
            .replace('password', configs.password)
            .replace('app_name', configs.appName);
        await mongoose.connect(dbUrl, configs.clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        app.listen(configs.port, () => console.log('Server started on port ' + process.env.port || configs.port));
    } catch (err) {
        console.log('ERROR HAPPENED', err);
    }
}

run();