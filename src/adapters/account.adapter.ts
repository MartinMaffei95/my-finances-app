import { AccountAPI, Account ,Currency, CurrencyAPI, Option } from "@/interfaces";

export const adaptAccount = (account: AccountAPI): Account => {
  const vs30d = account.vs30d || 0; // Asignar 0 si vs30d es nulo o indefinido
  const differenceInt = account.balance - vs30d;
  const differencePercentage =
    vs30d !== 0 ? (differenceInt / vs30d) * 100 : 100; // Evitar división por cero

  const adaptedCategory: Account = {
    id: account.id,
    name: account.name,
    type: account.type,
    normalizedType: account.type,
    init_balance: account.init_balance,
    balance: account.balance,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
    color: account.color,
    deletedAt: account.deletedAt,
    description: account.description,
    icon: account.icon,
    max: account.max,
    min: account.min,
    daysAgo: {
      d30: {
        balance: vs30d,
        differenceInt: differenceInt,
        differencePercentage: differencePercentage,
      },
    },
    totalIncome: account.totalIncome,
    totalExpense: account.totalExpense,
    totalTransferOut: account.totalTransferOut,
    totalTransferIn: account.totalTransferIn,
  };
  return adaptedCategory;
};

export const adaptAccounts = (accounts: AccountAPI[]): Account[] => {
  let adaptedAccounts: Account[] = [];

  accounts.forEach((account) => {
    const adaptedAccount = adaptAccount(account);
    adaptedAccounts.push(adaptedAccount);
  });
  return adaptedAccounts;
};

// Adapt Account from API to Option
export const adaptAccountFromAPIToOption = (account: AccountAPI): Option => {
  const adaptedCategory: Option = {
    value: `${account.id}`,
    label: account.name,
    id: account.id,
  };
  return adaptedCategory;
};

export const adaptAccountsFromAPIToOptions = (
  accounts: AccountAPI[]
): Option[] => {
  let adaptedAccounts: Option[] = [];

  accounts.forEach((account) => {
    const adaptedAccount = adaptAccountFromAPIToOption(account);
    adaptedAccounts.push(adaptedAccount);
  });
  return adaptedAccounts;
};
// Adapt Account who is already adapted for api to Option
export const adaptAccountToOption = (account: Account): Option => {
  const adaptedCategory: Option<Account> = {
    value: `${account.id}`,
    label: account.name,
    id: account.id,
    extraData: account,
  };
  return adaptedCategory;
};

export const adaptAccountsToOptions = (accounts: Account[]): Option[] => {
  let adaptedAccounts: Option[] = [];

  accounts.forEach((account) => {
    const adaptedAccount = adaptAccountToOption(account);
    adaptedAccounts.push(adaptedAccount);
  });
  return adaptedAccounts;
};

// # Currency
export const adaptCurrency = (currency: CurrencyAPI): Currency => {
  const adaptedCurrency: Currency = {
    id: currency.id,
    name: currency.name,
    code: currency.code,
    symbol: currency.symbol,
  };
  return adaptedCurrency;
};

export const adaptCurrencies = (currencies: Currency[]): Currency[] => {
  let adaptedCurrencies: Currency[] = [];

  currencies.forEach((currency) => {
    const adaptedCurencies = adaptCurrency(currency);
    adaptedCurrencies.push(adaptedCurencies);
  });
  return adaptedCurrencies;
};

// ## Currency to options
export const adaptCurrencyToOption = (currency: Currency): Option => {
  const adaptedCurrency: Option<Currency> = {
    value: `${currency.id}`,
    label: currency.name,
    id: currency.id,
    extraData: currency,
  };
  return adaptedCurrency;
};

export const adaptCurrenciesToOptions = (currencies: Currency[]): Option[] => {
  let adaptedOptions: Option[] = [];

  currencies.forEach((currency) => {
    const adaptedOption = adaptCurrencyToOption(currency);
    adaptedOptions.push(adaptedOption);
  });
  return adaptedOptions;
};
