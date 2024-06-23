import { CustomIcon } from "@/components/Generic/SelectIcon/Molecule/CustomIcon"
import { Category, CategoryAPI, Option, OptionWithComponent } from "@/interfaces"
import { twMerge } from "tailwind-merge"

export const adaptCategory =(category:CategoryAPI):Category=>{
    const adaptedCategory:Category ={
        id: category.id,
        name: category.name,
        color:category.color,
        color2:category.color2,
        icon:category.icon,
        children:category.children && category.children?.length > 0 ? adaptCategories(category.children) : []
    }
    return adaptedCategory
}

export const adaptCategories =(categories:CategoryAPI[]):Category[]=>{
    let adaptedCategories:Category[]=[]

    categories.forEach(
        category =>{
            const adaptedCategory = adaptCategory(category)
            adaptedCategories.push(adaptedCategory)
        }
    )
    return  adaptedCategories
}



// Adapt Category from API to Option
export const adaptCategoryFromAPIToOption  =(category:CategoryAPI):Option=>{
    const adaptedCategory:Option ={
        value: `${category.id}`,
        label: category.name,
        id: category.id
    }
    return adaptedCategory
}

export const adaptCategoriesFromAPIToOptions =(categories:CategoryAPI[]):Option[]=>{
    let adaptedCategories:Option[]=[]

    categories.forEach(
        category =>{
            const adaptedCategory = adaptCategoryFromAPIToOption(category)
            adaptedCategories.push(adaptedCategory)
        }
    )
    return  adaptedCategories
}
// Adapt Category who is already adapted for api to Option
export const adaptCategoryToOption  =(category:Category,isSubCategory:boolean = false):OptionWithComponent<Category>=>{
    const label =  <div className={twMerge('flex items-center rounded-md gap-1',isSubCategory ? "ml-2" : "font-medium")}> {category.name} <CustomIcon iconName={category?.icon || ""}/></div>
    const adaptedCategory:OptionWithComponent<Category> ={
        value: `${category.id}`,
        label,
        id: category.id,
        extraData:category
    }
    return adaptedCategory
}

export const adaptCategoriesToOptions =(categories:Category[]):OptionWithComponent[]=>{
    let adaptedCategories:OptionWithComponent[]=[]

    categories.forEach(
        category =>{
            const adaptedCategory = adaptCategoryToOption(category)
            adaptedCategories.push(adaptedCategory)
1
            if(category?.children && category?.children?.length > 0){
                category.children?.forEach(
                    subCategory =>{
                         const adaptedCategory = adaptCategoryToOption(subCategory,true)
                         adaptedCategories.push(adaptedCategory)
                    }
                )
            }
           
        }
    )
    return  adaptedCategories
}

