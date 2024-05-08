import express from 'express';
import configs from '../configs.json' assert { type: "json" };
import mongoose from 'mongoose';
import authRouter from './modules/auth/auth.route.js';
import questionsRouter from './modules/questions/questions.route.js';
import usersRouter from './modules/users/users.route.js';

const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/users', usersRouter);

async function run() {
    try {
        const dbUrl = configs.dbUrl
            .replace('password', configs.password)
            .replace('app_name', configs.appName);
        await mongoose.connect(dbUrl, configs.clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        app.listen(configs.port, () => console.log('Server started on port ' + configs.port));
    } catch (err) {
        console.log('ERROR HAPPENED', err);
    }
}

run();