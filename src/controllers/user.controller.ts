import { Request } from "express";
import { UserService } from "../services/user.service";
import { userSchema } from "../schemas/user.schema";

export class UserController {

    userService: UserService;

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    };

    createUser = async (req: Request, res: any) => {
        
        try{

            const user = userSchema.parse(req.body);

            const alreadyRegistered = await this.userService.getUserByEmail(user.email);

            if(alreadyRegistered){
                return res.status(400).json({message: 'Esse e-mail já foi utilizado no sistema!'});
            }

            await this.userService.createUser(user.firstName, user.lastName, user.email, user.password, user.isActive);

            return res.status(200).json({message: "Usuário criado com sucesso!"});

        }
        catch(error){

            return res.status(400).json({message: 'Não foi possível criar o usuário!'});
            
        }
    }

    getUserById = async (req: Request, res: any) => {

        const {id} = req.params;

        if(!id){

            return res.status(400).json({message: "Informe o campo ID"});

        }

        try{
            const user = await this.userService.getUserById(id);

            return res.status(200).json(user);
        }
        catch (error){
            return res.status(400).json({message: "Usuário não encontrado"});
        }

        
    }

    updateUser = async (req: Request, res: any) => {
        const { id } = req.params;
        const updatedData = req.body;

        if (!id) {
            return res.status(400).json({ message: "Informe o campo ID" });
        }

        try {
            const updatedUser = await this.userService.updateUser(id, updatedData);

            if (!updatedUser) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(400).json({ message: 'Não foi possível atualizar o usuário!' });
        }
    }

    

}