// # APP DATA
export interface Account {
  id: number;
  name: string;
  description?: string;
  type: AccountTypes;
  normalizedType: string;
  init_balance: number;
  balance: number;
  color?: string;
  icon?: string;
  min?: any;
  max?: any;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  daysAgo: {
    d30: {
      balance: number;
      differenceInt: number;
      differencePercentage: number;
    };
  };
  totalIncome: number;
  totalExpense: number;
  totalTransferOut: number;
  totalTransferIn: number;
}

export interface Currency {
  id: number;
  name: string;
  code: string;
  symbol: string;
}

// # API DATA
export interface AccountAPI {
  id: number;
  name: string;
  description?: string;
  type: AccountTypes;
  init_balance: number;
  balance: number;
  color?: string;
  icon?: string;
  min?: any;
  max?: any;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  vs30d: number;

  totalIncome: number;
  totalExpense: number;
  totalTransferOut: number;
  totalTransferIn: number;
}

export type AccountTypes =
  | "EFECTIVE"
  | "BANK_ACCOUNT"
  | "CREDIT_CARD"
  | "ACTIVES_ACCOUNT"
  | "DEBT_ACCOUNT";

export interface CurrencyAPI {
  id: number;
  name: string;
  code: string;
  symbol: string;
}

// ## New account post object
export type NewAccountPostObject ={
  name: string,
  description: string,
  init_balance: number,
  currency: number,
  type: AccountTypes,
  color: string,
  active_labels?: "",
  //sincronization:"",
  min?:number  | null
  max?:number  | null
}