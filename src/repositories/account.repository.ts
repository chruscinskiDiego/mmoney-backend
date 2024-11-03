import { EntityManager } from "typeorm";
import { BankAccount } from "../entities/account";
import { Equal } from "typeorm";

export class BankAccountRepository {

    private manager: EntityManager;

    constructor(manager: EntityManager) {
        this.manager = manager;
    }

    createAccount = async (account: BankAccount): Promise<BankAccount | null> => {
        return this.manager.save(account);
    }


    getAccountByUser = async (userId: string): Promise<BankAccount[]> => {
        return this.manager.find(BankAccount, {
            where: {
                fk_user: { id: Equal(userId) }
            },
            relations: ['fk_bank']
        });
    }


    getAccountById = async (bankId: string): Promise<BankAccount | null> => {

        return this.manager.findOne(BankAccount, {
            where: {
                id: bankId
            }
        })
    }

    updateAccount = async (accountId: string, updatedData: Partial<BankAccount>): Promise<BankAccount | null> => {

        const account = await this.getAccountById(accountId);

        if (!account) {
            return null;
        }

        Object.assign(account, updatedData);

        return this.manager.save(account);

    }
}