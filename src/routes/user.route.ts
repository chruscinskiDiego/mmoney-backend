import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { verifyAuth } from "../middleware/auth";

const userRouter = Router();

const userController = new UserController();

userRouter.post('/create', userController.createUser);
userRouter.get('/:id', verifyAuth, userController.getUserById);
userRouter.put('/update/:id', verifyAuth, userController.updateUser);

export default userRouter;