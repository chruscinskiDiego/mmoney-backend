import { Router } from "express";
import { BankController } from "../controllers/bank.controller";

const bankRouter = Router();

const bankController = new BankController();

bankRouter.post('/create', bankController.createBank);
bankRouter.get('/:id', bankController.getBankById);
bankRouter.get('/', bankController.getBanks);
bankRouter.put('/update/:id', bankController.udpdateBank);
bankRouter.delete('/delete/:id', bankController.deleteBank);

export default bankRouter;