import { useState } from "react";
import { UseApiRequestStatus } from "../interfaces";

export interface ApiResponse<ResponseData = any> {
  data: ResponseData | null;
  error: any | null;
}

export function useApiRequest<
  ResponseData,
  ApiFunctionParams extends any[],
  AdaptedResponseData = ResponseData
>(
  apiFunction: (...data: ApiFunctionParams) => Promise<ResponseData>,
  extraConfig?: {
    succesAction?: (result: ResponseData | AdaptedResponseData) => void;
    errorAction?: (error: any) => void;
    adapter?: (response: ResponseData) => AdaptedResponseData;
  }
) {
  const [status, setStatus] = useState<UseApiRequestStatus>("NONE");
  const [response, setResponse] = useState<
    ApiResponse<ResponseData | AdaptedResponseData>
  >({
    data: null,
    error: null,
  });

  const executeRequest = async (
    ...params: ApiFunctionParams
  ): Promise<ResponseData | AdaptedResponseData|undefined> => {
    setStatus("LOADING");
    setResponse(() => ({
      data: null,
      error: null,
    }));

    try {
      const result = await apiFunction(...params);
      let finalResult: ResponseData | AdaptedResponseData = result;

      if (extraConfig?.adapter) {
        finalResult = extraConfig.adapter(result);
      }
      
      setResponse((state) => ({ ...state, data: finalResult }));
      setStatus("SUCCESS");
      
      if (extraConfig?.succesAction) {
        extraConfig.succesAction(finalResult);
      }
      
      return finalResult;
    } catch (error) {
      setResponse((state) => ({ ...state, error: error }));
      setStatus("ERROR");
      if (extraConfig?.errorAction) {
        extraConfig.errorAction(error);
      }
      throw error;
    }
  };

  return { status, response, executeRequest };
}
