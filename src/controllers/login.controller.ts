import { Request } from "express";
import { UserService } from "../services/user.service";
import { loginSchema } from "../schemas/login.schema";


export class LoginController {


    userService: UserService;

    constructor(
        userService = new UserService()
    ) {
        this.userService = userService

    }

    login = async (req: Request, res: any) => {

        try{

            const login = loginSchema.parse(req.body);

            const token = await this.userService.getToken(login.email, login.password);

            return res.status(200).json({ token });
            
        }
        catch(error){
            return res.status(500).json({message: "Dados inválidos!"});
        }
       

    }

}