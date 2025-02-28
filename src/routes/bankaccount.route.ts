import { Router } from "express";
import { BankAccountController } from "../controllers/account.controller";


const bankAccountRouter = Router();

const bankAccountController = new BankAccountController();

bankAccountRouter.post('/create', bankAccountController.createBankAccount);
bankAccountRouter.get('/user/:user', bankAccountController.getBankAccountByUser);
bankAccountRouter.put('/update/:id', bankAccountController.updateBankAccount);
bankAccountRouter.delete('/delete/:id', bankAccountController.deleteBankAccount);

export default bankAccountRouter;

