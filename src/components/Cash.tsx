import React, { Fragment, useState } from "react"
import { Error } from "./Error";
import { Info } from "./Info"
import { Numpad } from "./Numpad";
import { TextTerminal } from "./TextTerminal"

export const Cash = ()=>{
    
let content;
let error;
let arrayDenominations = [
        {
            name:5000,
            amount:100
        },
        {
            name:2000,
            amount:400
        },
        {
            name:1000,
            amount:1000
        },
        {
            name:500,
            amount:3000
        },
        {
            name:100,
            amount:8000
        },
        {
            name:50,
            amount:10000
        }
]

const resultCash: number[] = []
const inputRef = React.createRef<HTMLInputElement>()
const[note5000, setNote5000] = useState(arrayDenominations[0].amount)
const[note2000, setNote2000] = useState(arrayDenominations[1].amount)
const[note1000, setNote1000] = useState(arrayDenominations[2].amount)
const[note500, setNote500] = useState(arrayDenominations[3].amount)
const[note100, setNote100] = useState(arrayDenominations[4].amount)
const[note50, setNote50] = useState(arrayDenominations[5].amount)
const[active, setActive]= useState(false)
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
        setRemainBalance(0)

        let amountRequest = Number(inputRef.current!.value)
        for(let i of arrayDenominations){
            let note = i.name
            while(amountRequest-note>=0){
                amountRequest-=note
                resultCash.push(note)
            }
        }
        let count5000 = 0
        let count2000 = 0
        let count1000 = 0
        let count500 = 0
        let count100 = 0
        let count50 = 0
        for(let j of resultCash){

           switch(j){
               case 5000:
                count5000++
                setResult5000(prev=>(prev+=1))
                setNote5000((prev)=>(prev-=1))
                if(count5000>=note5000){
                    setResult5000(arrayDenominations[0].amount)
                    setNote5000(0)
                }         
                break
               case 2000:
                count2000++
                setResult2000(prev=>(prev+=1))
                setNote2000((prev)=>(prev-=1))
                if(count2000>=note2000){
                    setResult5000(arrayDenominations[0].amount)
                    setNote5000(0)
                }     
                break;
               case 1000:
                count1000++
                setResult1000(prev=>(prev+=1))
                setNote1000((prev)=>(prev-=1))
                if(count1000>=note1000){
                    setResult5000(arrayDenominations[0].amount)
                    setNote5000(0)
                }   
                break;
               case 500:
                count500++
                setResult500(prev=>(prev+=1))
                setNote500((prev)=>(prev-=1))
                if(count500>=note500){
                    setResult5000(arrayDenominations[0].amount)
                    setNote5000(0)
                }   
                break;
               case 100:
                count100++
                setResult100(prev=>(prev+=1))
                setNote100((prev)=>(prev-=1))
                if(count100>=note100){
                    setResult5000(arrayDenominations[0].amount)
                    setNote5000(0)
                }   
                break;
               case 50:
                count50++
                setResult50(prev=>(prev+=1))
                setNote50((prev)=>(prev-=1))
                if(count50>=note50){
                    setResult5000(arrayDenominations[0].amount)
                    setNote5000(0)
                }   
                break     
           }
        }
        return (setRemainBalance(amountRequest))
    }

const handleChange = ()=>{

        setResult5000(0)
        setResult2000(0)
        setResult1000(0)
        setResult500(0)
        setResult100(0)
        setResult50(0)
        setRemainBalance(0)
        setInputText(inputRef.current!.value)
    }

const onKeypressHandler = (e:React.KeyboardEvent<HTMLDivElement>)=>{
        if(e.key === "Enter"){
            setResult5000(0)
            setResult2000(0)
            setResult1000(0)
            setResult500(0)
            setResult100(0)
            setResult50(0)
            setRemainBalance(0)

            let amountRequest = Number(inputRef.current!.value)
            for(let i of arrayDenominations){
                let note = i.name
                while(amountRequest-note>=0){
                    amountRequest-=note
                    resultCash.push(note)
                }
            }
            for(let j of resultCash){
                switch(j){
                    case 5000:
                     setResult5000(prev=>(prev+=1))
                     setNote5000((prev)=>(prev-=1))
                     break;
                    case 2000:
                     setResult2000(prev=>(prev+=1))
                     setNote2000((prev)=>(prev-=1))
                     break;
                    case 1000:
                     setResult1000(prev=>(prev+=1))
                     setNote1000((prev)=>(prev-=1))
                     break;
                    case 500:
                     setResult500(prev=>(prev+=1))
                     setNote500((prev)=>(prev-=1))
                     break;
                    case 100:
                     setResult100(prev=>(prev+=1))
                     setNote100((prev)=>(prev-=1))
                     break;
                    case 50:
                     setResult50(prev=>(prev+=1))
                     setNote50((prev)=>(prev-=1))
                     break     
                }
            }
            setNote5000(note5000-result5000)
            setNote2000(note2000-result2000)
            setNote1000(note1000-result1000)
            setNote500(note500-result500)
            setNote100(note100-result100)
            setNote50(note50-result50)
            return (setRemainBalance(amountRequest))
            }
    }

if(Number(inputText)>50) {
        content = 
            <Fragment>
                <button className="button" onClick={getCash}>Получить деньги</button>
                <TextTerminal note1000={result1000} note500={result500} note100={result100} note50={result50} remainBalance={remainBalance} note5000={result5000} note2000={result2000}/>
            </Fragment>
    }else{
        content = 
            <Fragment>
                <h1 className="content__text_amount">Введите необходимую сумму</h1>
            </Fragment>
}

const SET_NOTE = [1,2,3,4,5,6]

const getSetNote = (e:any)=>{
    switch(e.target.value){
        case "1":
            setNote5000(100)
            setNote2000(400)
            setNote1000(1000)
            setNote500(3000)
            setNote100(8000)
            setNote50(10000)
            break;
        case "2":
            setNote5000(476)
            setNote2000(345)
            setNote1000(6741)
            setNote500(4362)
            setNote100(1643)
            setNote50(3450)
            break
        case "3":
            setNote5000(234)
            setNote2000(678)
            setNote1000(845)
            setNote500(2451)
            setNote100(2345)
            setNote50(234)
            break
        case "4":
            setNote5000(546)
            setNote2000(562)
            setNote1000(2543)
            setNote500(4365)
            setNote100(124)
            setNote50(342)
            break
        case "5":
            setNote5000(2732)
            setNote2000(347)
            setNote1000(479)
            setNote500(7556)
            setNote100(1257)
            setNote50(3854)
            break
        case "6":
            setNote5000(73)
            setNote2000(147)
            setNote1000(279)
            setNote500(356)
            setNote100(857)
            setNote50(854)
            break
    }
}

const handleClick = (e:any)=>{
    setInputText(prev=>prev+=e.target.value)
    if(e.target.value==='<'){
        setInputText(inputText.slice(0,-1))
    }
    if(e.target.value===''){

    }
}

return(
    <div className="wrapper">
        <div className="set-note">
            <p>Выберите банкомат</p>
            {SET_NOTE.map((i)=>{
                return(
                    <button className="button button__set-note" key={i} onClick={getSetNote} value={i}>{i}</button>
                )
            })}
        </div>
        <div className="content">
            <input className="content__input" ref={inputRef} type="number" placeholder="введите требуемую сумму" value={inputText} onChange={handleChange} onKeyDown={onKeypressHandler}/>
            <div className="content__text">
                {error}
                {content}    
            </div>
        </div>
        <div className="tools">
            <button className="button" onClick={()=>(setActive(true))}>Получить справку</button>
            <div onClick={handleClick}>
                <Numpad/> 
            </div>
        </div>
        <Info 
            active={active} 
            setActive={setActive} 
            amount5000={note5000} 
            amount2000={note2000} 
            amount1000={note1000} 
            amount500={note500} 
            amount100={note100} 
            amount50={note50}/>
    </div>
)
}