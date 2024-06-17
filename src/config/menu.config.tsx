import { TbCategory, TbCategoryPlus } from "react-icons/tb"

export type Menu ={
    id:number|string
    label?:string
    icon?:JSX.Element
    url?:string //Si tiene o no renderiza un RouterLink
    subMenu?:Array<Menu| MenuDivisor>
}
export type MenuDivisor ="DIVISOR"

export const menu: Array<Menu|MenuDivisor> =[
    {
        id:1,
        label:"Categorias",
        url:"", 
        icon:<TbCategory/>,
        subMenu:[
            {
                id:1001,
                label:"Ver Todas",
                url:"/categories", 
                subMenu:[],
                icon:<TbCategory/>,

            },
            {
                id:1002,
                label:"Crear",
                url:"/categories/new", 
                subMenu:[],
                icon:<TbCategoryPlus/>,

            }
        ]
    },
    // {
    //     id:1,
    //     label:"Cuentas",
    //     url:"", 
    //     icon:<FaICursor/>,
    //     subMenu:[
    //         {
    //             id:1001,
    //             label:"Ver Todas",
    //             url:"", 
    //             subMenu:[]
    //         },
    //         {
    //             id:1002,
    //             label:"Crear",
    //             url:"", 
    //             subMenu:[]
    //         }
    //     ]
    // },
    // "DIVISOR",
    // {
    //     id:3,
    //     label:"Movimientos",
    //     url:"", 
    //     icon:<FaICursor/>,
    //     subMenu:[
    //         {
    //             id:1001,
    //             label:"Ver Todos",
    //             url:"", 
    //             subMenu:[]
    //         },
    //     ]
    // },
]