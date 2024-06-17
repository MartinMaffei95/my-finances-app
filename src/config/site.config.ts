// DAYJS CONFIG

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from 'dayjs/plugin/updateLocale'
import es  from 'dayjs/locale/es'

// Configurar el idioma español
dayjs.locale(es);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale)

dayjs.updateLocale('es', {
    relativeTime: {
      future: "en %s",
      past: "hace %s",
      s: 'unos segundos',
      m: "un minuto",
      mm: "%d minutos",
      h: "una hora",
      hh: "%d horas",
      d: "un día",
      dd: "%d días",
      M: "un mes",
      MM: "%d meses",
      y: "un año",
      yy: "%d años"
    }
  });
// END DAYJS CONFIG

export const siteConfig = {
    projectName:"Mis finanzas",
    siteName:"Mis finanzas",
    description:"",
    keyWords:"",
    useLogoIcon:true,
    formats:{
        date:"DD/MM/YYYY",
        hour:"HH:mm",
        dateHour:"DD/MM/YY | HH:mm",
        stringDivider:"|", //use somethimes to splice strings. others:("-" , "/" , ";")
    }
}