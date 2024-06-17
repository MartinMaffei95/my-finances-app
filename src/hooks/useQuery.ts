import { useLocation, useSearchParams } from 'react-router-dom';

const useQuery= () => {
    const query = new URLSearchParams(useLocation().search);
    console.log(useLocation())
    const [searchParams] = useSearchParams();
    searchParams.get('page'); // 10
    return query
}

export default useQuery;