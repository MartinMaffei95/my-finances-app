// ## Generic adapter 
export const adaptCollectionElements =<RawElement,AdaptedElement>(rawCollection:Array<RawElement>|undefined,adapter:(rawElement:RawElement)=>AdaptedElement):AdaptedElement[]=>{
    const adaptedDataCollection:AdaptedElement[] =[]
    if(!rawCollection || rawCollection.length<=0){
        return adaptedDataCollection
    }
    
    rawCollection.forEach(
        deta=>{
            const adaptedData = adapter(deta)
            adaptedDataCollection.push(adaptedData)
        }
    )
    return adaptedDataCollection
}