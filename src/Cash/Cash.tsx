import React, { useState } from "react"
import { GettingCash } from "./TextTerminal"

export const Cash = ()=>{
    
    const inputRef = React.createRef<HTMLInputElement>()
    const [inputText, setInputText] = useState("")
    const[result5000, setResult5000] = useState(0)
    const[result2000, setResult2000] = useState(0)
    const [result1000, setResult1000] = useState(0)
    const[result500, setResult500] = useState(0)
    const[result100, setResult100] = useState(0)
    const[result50, setResult50] = useState(0)
    const[remainBalance, setRemainBalance] = useState(0)
    
    const getCash = () =>{
        setResult5000(0)
        setResult2000(0)
        setResult1000(0)
        setResult500(0)
        setResult100(0)
        setResult50(0)

        const arrayDenominations = [5000, 2000, 1000, 500, 100, 50]
        const resultCash = []
        let amountRequest = Number(inputRef.current!.value)
        for(let i=0; i<arrayDenominations.length;i++){
            let note = arrayDenominations[i]
            while(amountRequest-note>=0){
                amountRequest-=note
                resultCash.push(note)
            }
        }
        for(let j of resultCash){
           switch(j){
               case 5000:
                setResult5000(prev=>(prev+=1))
                break;
               case 2000:
                setResult2000(prev=>(prev+=1))
                break;
               case 1000:
                setResult1000(prev=>(prev+=1))
                break;
               case 500:
                setResult500(prev=>(prev+=1))
                break;
               case 100:
                setResult100(prev=>(prev+=1))
                break;
               case 50:
                setResult50(prev=>(prev+=1))
                break     
           }
        }
        console.log()
        return (setRemainBalance(amountRequest))
    }



    const handleChange = ()=>{
        setInputText(inputRef.current!.value)
    }


    return(
        <div>
            <input ref={inputRef} type="text" placeholder="введите требуемую сумму" value={inputText} onChange={handleChange}/>
            <div>
                <button onClick={getCash}>Получить деньги</button>
                <GettingCash note1000={result1000} note500={result500} note100={result100} note50={result50} remainBalance={remainBalance} note5000={result5000} note2000={result2000}/>
            </div>
        </div>
    )
}