import { Move, MoveAPI, MoveTypes } from "@/interfaces"
import { adaptCategory } from "./category.adapter"

export const adaptMove =(move:MoveAPI):Move=>{
    const adaptedMove:Move ={
        id: move.id,
        type: move.type,
        parsedType: parseMoveType(move?.type) || "",
        value: move.value,
        comment: move.comment,
        createdAt: move.createdAt,
        updatedAt: move.updatedAt,
        category:adaptCategory(move.category)
    }
    return adaptedMove
}

export const adaptMoves =(moves:MoveAPI[]):Move[]=>{
    let adaptedMoves:Move[]=[]

    moves.forEach(
        move =>{
            const adaptedMove = adaptMove(move)
            adaptedMoves.push(adaptedMove)
        }
    )
    return  adaptedMoves
}

export const parseMoveType =(moveType:MoveTypes | undefined)=>{
    const types:{[moveType in MoveTypes]:string} = {
        INCOME: "Ingreso",
        EXPENSE: "Gasto",
        TRANSFER: "Transferencia"
    }
    if(moveType && types[moveType]){
        return types[moveType]
    }
    return moveType
}