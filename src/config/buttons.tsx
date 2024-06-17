import { ColorSheme, Size, Variant} from '@/interfaces';
import { ConfigButton } from './icons.config';


export type ButtonsConfigs = "addButtonClassic" |"dropdownIcon"| 'fallback' 
export type ButtonConfig ={
        class:string,
        variant:Variant | undefined,
        colorScheme:ColorSheme | undefined
        size:Size | undefined,
        icon?: {
            icon?:ConfigButton | undefined
            className?:string,
            position?:"LEFT"|"RIGHT"
        },
        text:string |undefined
        laodingConfig?:{
            icon?:ConfigButton|undefined
            text?:string |undefined
            variant?:Variant | undefined
        }
}

type ButtonConfigObj = {
    getConfig: (c: ButtonsConfigs) => ButtonConfig,
} & {[key in ButtonsConfigs]: ButtonConfig};



export const buttonConfig:ButtonConfigObj = {
    addButtonClassic:{
        class:"",
        colorScheme:undefined,
        variant:"outline",
        size:undefined,
        icon:{
            icon:"logo",
            
        },
        text:"Agregar"
    },
    dropdownIcon:{
        class:"!justify-center !items-center !flex !duration-300",
        colorScheme:undefined,
        variant:undefined,
        size:undefined,
        icon:{
            icon:"dropdown",
            className:"text-3xl",

        },
        text:undefined
    },
    fallback:{
        class:"",
        variant:undefined,
        colorScheme:undefined,
        size:undefined,
        icon:undefined,
        text:undefined
    } ,
    getConfig(config:ButtonsConfigs){
        const buttonConfig = this[config]
        if(this[config]){
            return buttonConfig
        }
        return this.fallback
    },
}