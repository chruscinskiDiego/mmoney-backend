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

    createBankAccount = async (number: string, type: string, userId: string, bankId: string):Promise<BankAccount | null> => {

        try {
            
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

    getBankAccountByUser = async(userId:string):Promise<BankAccount[] | null> => {

        try{

            const teste = await this.bankAccountRepository.getAccountByUser(userId);

            console.log('teste: ' + JSON.stringify(teste));

            return await this.bankAccountRepository.getAccountByUser(userId);

        }
        catch(error){

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
}