import { useState } from "react";

const useRenderInfinite = <  T,Args extends any[],>(
  load: (...data: Args[]) => Promise<T[]>,
  extraConfig?: {
    onUpdatePage?: (page: number, newPage: number) => void;
  }
) => {
  const [dataToRender, setDataToRender] = useState<T[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasNext, setHasNext] = useState<boolean>(true);

  const updatePage = () => {
    setPage((state) => {
        const newstate =state + 1
        if (extraConfig?.onUpdatePage) {
            extraConfig?.onUpdatePage(state, newstate);
         }
      return newstate;
    });

    
  };

  const fetchNext = async () => {
    const dataLoaded: T[] = await load() || [];
    if (dataLoaded && dataLoaded.length > 0) {
      setDataToRender((oldState) => [...oldState, ...dataLoaded]);
      updatePage();
    } else {
      setHasNext(false);
    }
  };

  return {
    dataToRender,
    page,
    hasNext,
    fetchNext,
  };
};

export default useRenderInfinite;
