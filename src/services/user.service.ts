import jwt from "jsonwebtoken";
import { AppDataSource } from "../database";
import { User } from "../entities/user";
import { UserRepository } from "../repositories/user.repository"
import bcrypt from 'bcrypt';

export class UserService {

    private userRepository: UserRepository;

    constructor(userRepository = new UserRepository(AppDataSource.manager)) {

        this.userRepository = userRepository;

    }

    createUser = async (firstName: string, lastName: string, email: string, password: string, isActive: boolean): Promise<User | string> => {


        try {

            const saltRounds = 10;

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const user = new User(firstName, lastName, email, hashedPassword, isActive);

            return await this.userRepository.createUser(user);

        }
        catch (error) {
            throw new Error('Ocorreu um erro ao tentar cadastrar o usuário. Tente novamente mais tarde.');
        }


    }

    getUserByEmail = async (userEmail: string): Promise<boolean> => {

        return await this.userRepository.getUserByEmail(userEmail);
    }

    getUserById = async (userId: string): Promise<any> => {

        const user = await this.userRepository.getUserById(userId);

        const userDTO = {
            id: user?.id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
        }

        return userDTO;
    }

    getAuthenticatedUser = async (email: string, password: string): Promise<User | null> => {

        const user = await this.userRepository.getUserBodyByEmail(email);

        if (!user || !user.password) {
            return null;
        }

        //compara a senha com o hash no banco de dados
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return null;
        }

        return user; 
    };

    getToken = async (email: string, password: string): Promise<string> => {

        const user = await this.getAuthenticatedUser(email, password);

        if (!user) {
            throw new Error('Dados inválidos!');
        }

        if (!user.id) {
            throw new Error('ID do usuário não está definido.');
        }

        const tokenData = {
            name: user.firstName,
            email: user.email
        };

        const tokenKey = process.env.JWT_SECRET as string;
        if (!tokenKey) {
            throw new Error('A chave JWT_SECRET não está configurada nas variáveis de ambiente.');
        }

        const tokenOptions: jwt.SignOptions = {
            subject: user.id.toString()
        };

        const token = jwt.sign(tokenData, tokenKey, tokenOptions);
        return token;
    };

    updateUser = async (userId: string, updatedData: Partial<User>): Promise<User | string> => {
        try {
            const updatedUser = await this.userRepository.updateUser(userId, updatedData);
            
            if (!updatedUser) {
                throw new Error('Usuário não encontrado.');
            }

            const userDTO = {
                id: updatedUser.id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
            };

            return userDTO;
        } catch (error) {
            throw new Error('Ocorreu um erro ao tentar atualizar o usuário.');
        }
    }
}