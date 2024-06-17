import { useState } from "react";
import { UseApiRequestStatus } from "../interfaces";

export interface ApiResponse<ResponseData = any> {
  data: ResponseData | null;
  error: any | null;
}

export function useApiRequest<ResponseData, ApiFunctionParams extends any[],AdaptedResponseData = ResponseData>(
  apiFunction: (...data: ApiFunctionParams) => Promise<ResponseData>,
  extraConfig?: {
    succesAction?: (result?: Awaited<ResponseData>) => void
    errorAction?: (error?:any) => void
    adapter?: (response: Awaited<ResponseData>) => AdaptedResponseData
}
) {
  const [status, setStatus] = useState<UseApiRequestStatus>("NONE");
  const [response, setResponse] = useState<
  ApiResponse<ResponseData | AdaptedResponseData>
>({
  data: null,
  error: null,
});

  const executeRequest = async (...params: ApiFunctionParams) => {
    setStatus("LOADING");
    setResponse(() => ({
      data: null,
      error: null,
    }));

    try {
      const result = await apiFunction(...params);
      setResponse((state) => ({ ...state, data: result }));
      setStatus("SUCCESS");
        if (extraConfig?.succesAction) {
          extraConfig?.succesAction(result)
        }
        if (extraConfig?.adapter) {
            const adaptedResult = await extraConfig?.adapter(result)
            response.data = adaptedResult
            setResponse((state) => ({ ...state, data: adaptedResult }));

            return adaptedResult
        }
      return result;
    } catch (error) {
      setResponse((state) => ({ ...state, error: error }));
      setStatus("ERROR");
        if (extraConfig?.errorAction) {
          extraConfig?.errorAction(error)
        }
    }
  };

  return { status, response, executeRequest };
}
