import axios, { AxiosError } from "axios";
import { QueryService } from "./QueryService";
import { Category, PaginatedData, PostNewCategory, QueryObject } from "@/interfaces";
import { endpoints } from "@/config/endpoints.config";
import { adaptCategories, adaptCategory, } from "@/adapters/category.adapter";
import { errorRequestHandler } from "./ErrorHandler";

const queryFactory = new QueryService();
export default class CategoriesService {
  async getCategories(
    filters?: QueryObject[],
    page?: number
  ) {
    if (!filters) {
      filters = [];
    }
    if (!page) {
      page = 1;
    }
    try {
      const request = await axios({
        baseURL: `${import.meta.env.VITE_BASE_URL}${endpoints["CATEGORIES"]}?${
          filters?.length > 0 ? queryFactory.createQueryString(filters) : ""
        }&page=${page}`,
        method: "GET",
      });
      // Adapting response
      console.log(request.data);
      const adaptedData = adaptCategories(request.data.data);

      const responseData: PaginatedData<Category[]> = {
        data: adaptedData,
        pagination: request.data.paginate,
      };
      return responseData;
    } catch (error: any | AxiosError) {
        errorRequestHandler(error)
  }
}

  async getCategoryById(id: number) {
    try {
      const request = await axios({
        baseURL: `${import.meta.env.VITE_BASE_URL}${endpoints["CATEGORIES"]}/${id}`,
        method: "GET",
       
      });
      // Adapting response

      const adaptedData = adaptCategory(request.data);

      return adaptedData;
    } catch (error: any | AxiosError) {
        errorRequestHandler(error)
     
    }
  }

  async createCategory(postObject:PostNewCategory) {
    try {
      await axios({
        baseURL: `${import.meta.env.VITE_BASE_URL}${endpoints["CATEGORIES"]}`,
        method: "POST",
        data:postObject
       
      });
      return "CREATE_CATEGORY_SUCCESS"
    } catch (error: any | AxiosError) {
        errorRequestHandler(error)
     
    }
  }
}
