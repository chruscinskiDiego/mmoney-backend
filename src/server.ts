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

const server = express();
const port = process.env.SERVER_PORT;

server.use(express.json());

server.use('/users', userRouter);
server.use('/categories', verifyAuth, categoryRouter);
server.use('/banks', verifyAuth, bankRouter);
server.use('/bank-accounts', verifyAuth, bankAccountRouter);
server.use('/login', loginRouter);
server.use('/expenses', verifyAuth, expensesRouter);


AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

server.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}!`);
})