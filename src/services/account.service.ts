import { AppDataSource } from "../database";
import { BankAccount } from "../entities/account";
import { BankAccountRepository } from "../repositories/account.repository";
import { BankRepository } from "../repositories/bank.repository";
import { UserRepository } from "../repositories/user.repository";

export class BankAccountService {

    private bankAccountRepository: BankAccountRepository;
    private userRepository: UserRepository;
    private bankRepository: BankRepository;

    constructor(
        bankAccountRepository = new BankAccountRepository(AppDataSource.manager),
        userRepository = new UserRepository(AppDataSource.manager),
        bankRepository = new BankRepository(AppDataSource.manager)

    ) {
        this.bankAccountRepository = bankAccountRepository;
        this.userRepository = userRepository;
        this.bankRepository = bankRepository;

    }

    createBankAccount = async (number: string, type: string, userEmail: string, bankId: string):Promise<BankAccount | null> => {

        try {
            
            
            const userId = await this.userRepository.getUserIdByEmail(userEmail);
            
            if (!userId) {
                throw new Error('Usuário não encontrado!');
            }
            const user = await this.userRepository.getUserById(userId);
            const bank = await this.bankRepository.getBankById(bankId);

            if (!user) {
                
                throw new Error('Não existe esse usuário!');
                
            }
            if (!bank) {
                throw new Error('Não existe esse banco!');
            }

            const bankAccount = new BankAccount(number, type, user, bank);

            return await this.bankAccountRepository.createAccount(bankAccount);
        }
        catch(error) {

            throw new Error('Não foi possível criar a conta' + error);
            
        }
    }

    getBankAccountByUser = async(user: string): Promise<BankAccount[] | null> => {
        
        if (!user) {
            throw new Error('O ID do usuário é inválido!');
        }
    
        try {
            const userId = await this.userRepository.getUserIdByEmail(user);

            if(!userId){
                throw new Error('Usuário não encontrado!');
            }

            return await this.bankAccountRepository.getAccountByUser(userId);

        } catch (error) {
            throw new Error('Este usuário não tem vínculo com Contas Bancárias!');
        }
    }
    

    updateBankAccount = async(accountId: string, updatedData:Partial<BankAccount>):Promise<BankAccount | string> => {

        try{

            const updatedBankAccount = await this.bankAccountRepository.updateAccount(accountId, updatedData);

            if(!updatedBankAccount){
                throw new Error('Conta não encontrada!');
            }

            return updatedBankAccount;
        }
        catch(error){

            throw new Error('Ocorreu um erro ao tentar atualizar a conta bancária!');
        }
    }

    deleteBankAccount = async(accountId: string):Promise<boolean> => {

        try{

            const deleted = await this.bankAccountRepository.deleteAccount(accountId);

            if(!deleted){
                throw new Error('Conta não encontrada!');
            }

            return deleted;
        }
        catch(error){

            throw new Error('Ocorreu um erro ao tentar deletar a conta bancária!');
        }
    }
}