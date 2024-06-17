import { Account } from "@/interfaces";
import AccountService from "@/services/Account.service";
import { create } from "zustand";

export interface AccountState {
  accounts: Account[];
  refresh: () => void;
  loading:boolean
}

const accountsService = new AccountService();

export const useAccountStore = create<AccountState>()((set) => ({
  accounts: [],
  loading:false,
  refresh: async () => {
    set((state)=>({...state,loading:true}))
    const response = await accountsService.getAccounts([], 50);
    // Set State
    set((state) => ({ ...state, accounts: response?.data,loading:false }));
  },
}));
