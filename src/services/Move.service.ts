import axios, { AxiosError } from "axios";
import { QueryService } from "./QueryService";
import {  Move, MovePostObject, PaginatedData, QueryObject } from "@/interfaces";
import { endpoints } from "@/config/endpoints.config";
import {  adaptCategory } from "@/adapters/category.adapter";
import { errorRequestHandler } from "./ErrorHandler";
import { adaptMoves } from "@/adapters/moves.adapter";

const queryFactory = new QueryService();
export default class MoveService {
  async getAllMoves(
    filters?: QueryObject[],
    page?: number,
    config?:{
        filterEmptyString?:boolean
    }
  ) {
    if (!filters) {
      filters = [];
    }
    if (!page) {
      page = 1;
    }
    try {
      const request = await axios({
        baseURL: `${import.meta.env.VITE_BASE_URL}${endpoints["MOVES"]}?${
          filters?.length > 0 ? queryFactory.createQueryString(filters,config?.filterEmptyString) : ""
        }&page=${page}`,
        method: "GET",
      });
      // Adapting response
      console.log(request.data);
      const adaptedData = adaptMoves(request.data.data);

      const responseData: PaginatedData<Move[]> = {
        data: adaptedData,
        pagination: request.data.paginate,
      };
      return responseData;
    } catch (error: any | AxiosError) {
        errorRequestHandler(error)
  }
}

  async getMoveById(id: number) {
    try {
      const request = await axios({
        baseURL: `${import.meta.env.VITE_BASE_URL}${endpoints["MOVES"]}/${id}`,
        method: "GET",
       
      });
      // Adapting response

      const adaptedData = adaptCategory(request.data);

      return adaptedData;
    } catch (error: any | AxiosError) {
        errorRequestHandler(error)
     
    }
  }

  async createMove(postObject:MovePostObject) {
    try {
      await axios({
        baseURL: `${import.meta.env.VITE_BASE_URL}${endpoints["MOVES"]}`,
        method: "POST",
        data:postObject
       
      });
      return "CREATE_MOVE_SUCCESS"
    } catch (error: any | AxiosError) {
        errorRequestHandler(error)
     
    }
  }
}
