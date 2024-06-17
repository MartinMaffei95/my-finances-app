import axios, { AxiosError } from "axios";
import { QueryService } from "./QueryService";
import { Account, AccountTypes, Currency, NewAccountPostObject, PaginatedData, QueryObject } from "@/interfaces";
import { endpoints } from "@/config/endpoints.config";
import { errorRequestHandler } from "./ErrorHandler";
import { adaptAccount, adaptAccounts, adaptCurrencies } from "@/adapters/account.adapter";

const queryFactory = new QueryService();
export default class AccountService {
  async getAccounts(filters?: QueryObject[], page?: number) {
    if (!filters) {
      filters = [];
    }
    if (!page) {
      page = 1;
    }
    try {
      const request = await axios({
        baseURL: `${import.meta.env.VITE_BASE_URL}${endpoints["ACCOUNTS"]}?${
          filters?.length > 0 ? queryFactory.createQueryString(filters) : ""
        }&page=${page}`,
        method: "GET",
      });
      // Adapting response
      console.log(request.data);
      const adaptedData = adaptAccounts(request.data.data);
      const responseData: PaginatedData<Account[]> = {
        data: adaptedData,
        pagination: request.data.paginate,
      };
      return responseData;
    } catch (error: any | AxiosError) {
      errorRequestHandler(error);
    }
  }

  async getAccountById(id: number) {
    try {
      const request = await axios({
        baseURL: `${import.meta.env.VITE_BASE_URL}${
          endpoints["ACCOUNTS"]
        }/${id}`,
        method: "GET",
      });
      // Adapting response
      const adaptedData = adaptAccount(request.data);
      return adaptedData;
    } catch (error: any | AxiosError) {
      errorRequestHandler(error);
    }
  }
  async getCurrencies(filters?: QueryObject[], page?: number) {
    if (!filters) {
      filters = [];
    }
    if (!page) {
      page = 1;
    }
    try {
      const request = await axios({
        baseURL: `${import.meta.env.VITE_BASE_URL}${endpoints["ACCOUNTS_CURRENCIES"]}?${
          filters?.length > 0 ? queryFactory.createQueryString(filters) : ""
        }&page=${page}`,
        method: "GET",
      });
      // Adapting response
      console.log(request.data);
      const adaptedData = adaptCurrencies(request.data.data);
      const responseData: PaginatedData<Currency[]> = {
        data: adaptedData,
        pagination: request.data.paginate,
      };
      return responseData;
    } catch (error: any | AxiosError) {
      errorRequestHandler(error);
    }
  }
  async getAccountsTypes(filters?: QueryObject[], page?: number) {
    if (!filters) {
      filters = [];
    }
    if (!page) {
      page = 1;
    }
    try {
      const request = await axios({
        baseURL: `${import.meta.env.VITE_BASE_URL}${endpoints["ACCOUNTS_TYPES"]}?${
          filters?.length > 0 ? queryFactory.createQueryString(filters) : ""
        }&page=${page}`,
        method: "GET",
      });
      // Adapting response
      console.log("getAccountsTypes",request.data)
      
      const adaptedData = (request.data.data);
      const responseData: {data:AccountTypes[]} = {
        data: adaptedData,
      };
      return responseData;
    } catch (error: any | AxiosError) {
      errorRequestHandler(error);
    }
  }
  async createAccount(postObject:NewAccountPostObject) {
    try {
       await axios({
        baseURL: `${import.meta.env.VITE_BASE_URL}${endpoints["ACCOUNTS"]}`,
        method: "POST",
        data:postObject
       
      });
      return "CREATE_ACCOUNT_SUCCESS"
    } catch (error: any | AxiosError) {
        errorRequestHandler(error)
     
    }
  }
}
