import { adaptCategoriesToOptions } from '@/adapters/category.adapter';
import { useApiRequest } from '@/hooks/useApiRequest';
import { OptionWithComponent } from '@/interfaces';
import CategoriesService from '@/services/Category.service';
import { FC, useEffect } from 'react';

type Props = {}
const AllCAtegories: FC<Props> = ({}) => {
    const categoyService = new CategoriesService();
    // Get Categories (for parent)
    const {executeRequest,response} = useApiRequest(
      () => categoyService.getCategories(),
      {
        adapter: (categories) => adaptCategoriesToOptions(categories?.data || []),
      }
    );

    useEffect(()=>{
        executeRequest()
    },[])
    return <div>  <ul className="overflow-auto">
    {(
      response.data as OptionWithComponent[]
    )?.map((c) => (
      <li key={c.id} className="bg-white  shadow-md rounded my-2 p-2">
        {c.label}
      </li>
    ))}
  </ul></div>
}

export default AllCAtegories;