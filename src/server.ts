import 'reflect-metadata'
import express from "express";
import userRouter from "./routes/user.route";
import { AppDataSource } from "./database";
import bankAccountRouter from './routes/bankaccount.route';
import loginRouter from './routes/login.route';
import bankRouter from './routes/bank.route';
import categoryRouter from './routes/category.route';
import expensesRouter from './routes/expenses.route';
import { verifyAuth } from './middleware/auth';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import rateLimit from 'express-rate-limit';

const server = express();
const port = process.env.SERVER_PORT;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // 100 reqs por ip
    message: 'Muitas requisições, tente novamente mais tarde.'
});

//limite de reqs
server.use(limiter);

server.use(express.json());
server.use(cors({
    origin: 'https://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization',],
}));

//inserir verifyAuth
server.use('/login', loginRouter);
server.use('/users', userRouter);
server.use('/categories', verifyAuth, categoryRouter);
server.use('/banks', verifyAuth, bankRouter);
server.use('/bank-accounts', verifyAuth, bankAccountRouter);
server.use('/expenses', verifyAuth, expensesRouter);

AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

/*server.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}!`);
})*/

https.createServer({
    cert: fs.readFileSync('src/ssl/code.crt'),
    key: fs.readFileSync('src/ssl/code.key')
}, server).listen(port, () => console.log('SERVIDOR HTTPS INICIADO'));

