import React, { useState } from "react"

export const Cash = ()=>{
    
    const [inputText, setInputText] = useState("")

    const getCash = () =>{
        const arrayDenominations = [1000, 500, 100, 50]
        const resultCash = []
        let amountRequest = Number(inputRef.current!.value)
        if(Number(inputRef.current!.value)<0){
            console.log('введите необходимую сумму')
        }
        for(let i=0; i<arrayDenominations.length;i++){
            let note = arrayDenominations[i]

            while(Number(inputRef.current!.value)-note>=0){
                amountRequest-=note
                resultCash.push(inputRef.current!.value)
            }
        }
        return console.log(resultCash)
    }

    const handleChange = ()=>{
        setInputText(inputRef.current!.value)
    }

    const inputRef = React.createRef<HTMLInputElement>()

    return(
        <div>
            <input ref={inputRef} type="text" placeholder="введите требуемую сумму" value={inputText} onChange={handleChange}/>
            <div>
                <button onClick={getCash}>Получить деньги</button>
                <h1>Итого к выдаче</h1>
                <p>купюр номиналом 1000: </p>
                <p>купюр номиналом 500: </p>
                <p>купюр номиналом 100: </p>
                <p>купюр номиналом 50: </p>
            </div>
        </div>
    )
}