import { EntityManager } from "typeorm";
import { User } from "../entities/user";

export class UserRepository {

    private manager: EntityManager;

    constructor(manager: EntityManager){
        this.manager = manager;
    }

    //tipo de entidade "User"
    createUser = async(user:User):Promise<User> => {
        return this.manager.save(user);
    }

    getUserById = async(userId: string): Promise<User | null> =>{
        return this.manager.findOne(User, {
            where:{
                id: userId
            }
        });
    }

    getUserByEmailAndPassword = async(userEmail: string, userPassword: string):Promise<User | null> => {

        return this.manager.findOne(User, {
            where: {
                email: userEmail,
                password: userPassword
            }
        })
    }

    getUserBodyByEmail = async (userEmail: string): Promise<User | null> => {
        return this.manager.findOne(User, {
            where: {
                email: userEmail,
            },
        });
    };

    getUserByEmail = async (userEmail: string): Promise<boolean> => {
        const user = await this.manager.findOne(User, {
            where: {
                email: userEmail,
            },
        });
        
        return user !== null;
    };

    updateUser = async(userId: string, updatedData: Partial<User>): Promise<User | null> => {
        const user = await this.getUserById(userId);
        if (!user) {
            return null;
        }
        
        Object.assign(user, updatedData);

        return this.manager.save(user);
    };

}