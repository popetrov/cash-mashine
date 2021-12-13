import { FC } from "react"

export type GettingCashProps = {
    bills:
        {note5000:Number,
        note2000:Number,
        note1000:Number,
        note500:Number,
        note200:Number,
        note100:Number,
        note50:Number,}
    remainBalance:Number
}

export const TextTerminal:FC<GettingCashProps> = ({bills, remainBalance}) => {

    return (
        <div className="TextTerminal">
            <h1 className="content__text_amount">Итого к выдаче</h1>
            <p>купюр номиналом 5000:{bills.note5000} </p>
            <p>купюр номиналом 2000:{bills.note2000} </p>
            <p>купюр номиналом 1000:{bills.note1000} </p>
            <p>купюр номиналом 500: {bills.note500}</p>
            <p>купюр номиналом 200: {bills.note200}</p>
            <p>купюр номиналом 100:{bills.note100} </p>
            <p>купюр номиналом 50: {bills.note50}</p>
            <p>невыданная сумма: {remainBalance}</p>
        </div>
    )
}
