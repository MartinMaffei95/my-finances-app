import { siteConfig } from "@/config/site.config";
import dayjs, { Dayjs } from "dayjs"


// # Formatters
// ## Date & hour

export const formatDate =(date:string|Dayjs,format:string = siteConfig.formats.dateHour,getRelative:boolean =true)=>{
    if(!date){
        date = dayjs()
    }
    const dayjsDate = dayjs(date)

    if(getRelative){
        console.log(dayjsDate," | ",dayjs().from(dayjsDate))
        return dayjs().from(dayjsDate)
    }
    const formattedDate = dayjsDate.format(format)
    return formattedDate
}



/**
 * Convierte un color hexadecimal a RGBA.
 * @param hex - El valor hexadecimal del color.
 * @param alpha - La opacidad (valor entre 0 y 1).
 * @returns La representación RGBA del color.
 */
export function hexToRgba(hex: string, alpha: number = 1): string {
    // Elimina el carácter '#' si está presente
    hex = hex.replace(/^#/, '');

    // Divide el valor hexadecimal en componentes RGB
    let r: number, g: number, b: number;

    if (hex.length === 3) {
        // Formato hexadecimal corto (e.g., #abc)
        r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
        g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
        b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
    } else if (hex.length === 6) {
        // Formato hexadecimal completo (e.g., #aabbcc)
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    } else {
        throw new Error('Formato hexadecimal no válido');
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* FORMAT MONEY */
export const formatMoney =(total:number|undefined|null):string=>{
    if(!total){
      return '0,00'
    }
    total = +total
    const formatedValue =total.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return formatedValue
  }