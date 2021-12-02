import { FC } from "react"



export type GettingCashProps ={
    note5000:Number,
    note2000:Number,
    note1000:Number,
    note500:Number,
    note100:Number,
    note50:Number,
    remainBalance:Number
}

export     const GettingCash:FC<GettingCashProps> = ({note5000, note2000, note1000,note500, note100, note50, remainBalance}) =>{

    return(
        <div>
            <h1>Итого к выдаче</h1>
            <p>купюр номиналом 5000:{note5000} </p>
            <p>купюр номиналом 2000:{note2000} </p>
            <p>купюр номиналом 1000:{note1000} </p>
            <p>купюр номиналом 500: {note500}</p>
            <p>купюр номиналом 100:{note100} </p>
            <p>купюр номиналом 50: {note50}</p>
            <p>невыданная сумма: {remainBalance}</p>
        </div>
    )

}
