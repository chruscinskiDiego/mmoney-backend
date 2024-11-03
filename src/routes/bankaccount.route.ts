import { Router } from "express";
import { BankAccountController } from "../controllers/account.controller";


const bankAccountRouter = Router();

const bankAccountController = new BankAccountController();

bankAccountRouter.post('/create', bankAccountController.createBankAccount);
bankAccountRouter.get('/user/:id', bankAccountController.getBankAccountByUser);
bankAccountRouter.put('/update/:id', bankAccountController.updateBankAccount);

export default bankAccountRouter;

