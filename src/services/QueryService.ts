import { QueryObject } from "@/interfaces";

type QueryClassConfig ={
    dictionary:QueryObject
}


export class QueryService{
    activeLogs = true
    dictionary: QueryObject ={}

    constructor(config?:QueryClassConfig){
         this.dictionary = config?.dictionary || {}
    }

    adaptQuery =(query:QueryObject)=>{
        let returnObj:QueryObject  = {}
        Object.entries(query).forEach(
            ([key,value])=>{
              if(this.dictionary[key]){
                key = this.dictionary[key]
              }
              returnObj={
                ...returnObj,
                [key]:`${value}`
              }
            }
          )
         return returnObj
      }

      createQueryObjectArray(queryObject: QueryObject,filterEmptyString:boolean = false): QueryObject[] {
        let queryObjectArray:QueryObject[] =[]
        if(this.dictionary){
            queryObject = this.adaptQuery(queryObject)
        }
        Object.entries(queryObject).forEach(
            ([key,value]) => {
                
                if(filterEmptyString && value.length<= 0){

                }else{
                    queryObjectArray.push({[key]:value})
                }
            }
          )
          return queryObjectArray
    }

    createQueryString(queryObject: QueryObject[] | QueryObject,filterEmptyString:boolean = false): string {
        if(!Array.isArray(queryObject)){
            queryObject= this.createQueryObjectArray(queryObject as QueryObject)
        }
        const queryString = queryObject
            .map((query) =>
                Object.entries(query)
                    .filter(([, value]) => value !== undefined) // Filtrar aquellos pares donde el valor es undefined
                    .filter(([, value]) => !(filterEmptyString && value === '')) // Filtrar aquellos pares donde el valor es '' solo si filterEmptyString es true
                    .map(([key, value]) => `&${key}=${value}`)
                    .join('')
            )
            .join('')

        return queryString
    }

    log(logData:any){
        if(this.activeLogs){
                console.log("[ QueryService ] ",logData)
        }
    }
}