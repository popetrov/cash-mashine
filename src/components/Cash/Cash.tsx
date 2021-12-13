import React, { useState } from "react";
import { Fragment } from "react";

import { Info } from "../Info/Info";
import { Numpad } from "../Numpad/Numpad";
import { TextTerminal } from "../TextTerminal/TextTerminal";

export const Cash = () => {
    let content;
    const limit:{[key:number]:number} = {5000:100, 2000:400, 1000:1000, 500:3000, 200:6000, 100:8000, 50:10000}
    const limits2 = {5000:476,2000:345,1000:6741,500:4362,200:234,100:1643,50:3450}
    const limits3 = {5000:234,2000:678,1000:845,500:2451,200:9654,100:2345,50:234}
    const limits4 = {5000:546,2000:562,1000:2543,500:4365,200:2154,100:124,50:342}
    const limits5 = {5000:2732,2000:347,1000:479,500:7556,200:3296,100:1257,50:3854}
    const limits6 = {5000:73,2000:147,1000:279,500:356,200:696,100:857,50:854}
    const SET_NOTE = [1,2,3,4,5,6]
    const inputRef = React.createRef<HTMLInputElement>()
    const [inputText, setInputText] = useState("")
    const[limited, setLimited] = useState(limit)
    const[active, setActive]= useState(false)
    const[note, setNote] = useState({5000:0,
                                     2000:0,
                                     1000:0,
                                     500:0,
                                     200:0,
                                     100:0,
                                     50:0})
    const[remainingNote, setRemainingNote] = useState(limited)
    const[remainBalance, setRemainBalance] = useState(0)
    
    const banknoteNominals = Object.keys(limit).map(Number).sort((a,b)=>limit[b]*b-limit[a]*a)
    const lowestNominals = banknoteNominals[banknoteNominals.length-1]
    const result:{[key:number]:number} = {}

    const getAmountCash = (amount:number) => {
        if(amount % lowestNominals) {
            setRemainBalance(Number(inputText)%lowestNominals)
        }

        let currentAmount = amount

        for(let i = 0; i < banknoteNominals.length; i++){
            let currentNominal = banknoteNominals[i]

            const banknotesNeeded = Math.floor(currentAmount/currentNominal)
            const banknotesHave = limit[currentNominal]

            const giveBanknotes = banknotesNeeded < banknotesHave ? banknotesNeeded : banknotesHave

            result[currentNominal] = giveBanknotes
            currentAmount = currentAmount - currentNominal*giveBanknotes

            if(currentAmount === 0) break
        }

        if(currentAmount>0) return false

        banknoteNominals.forEach(type => {
            limit[type] = limited[type] - (result[type] || 0)
        })

        setLimited(limit)
        
        return result
    }

    const handleChange = ()=>{
        setRemainBalance(0)
        setInputText(inputRef.current!.value)
    }

    const getCash = ()=>{
            getAmountCash(Number(inputText))
            setNote(prev => ({...prev, 5000:result[5000]||0,
                                       2000:result[2000]||0,
                                       1000:result[1000]||0,
                                       500:result[500]||0,
                                       200:result[200]||0,
                                       100:result[100]||0,
                                       50:result[50]||0}))
            
            setRemainingNote(prev => ({...prev, 5000:limited[5000]-(result[5000]||0),
                                                2000:limited[2000]-(result[2000]||0),
                                                1000:limited[1000]-(result[1000]||0),
                                                500:limited[500]-(result[500]||0),
                                                200:limited[200]-(result[200]||0),
                                                100:limited[100]-(result[100]||0),
                                                50:limited[50]-(result[50]||0)}))
                                                
    }

    const onKeypressHandler = (e:React.KeyboardEvent<HTMLDivElement>)=>{
        if(e.key === "Enter"){
            getAmountCash(Number(inputText))
            setNote(prev => ({...prev, 5000:result[5000]||0,
                                       2000:result[2000]||0,
                                       1000:result[1000]||0,
                                       500:result[500]||0,
                                       200:result[200]||0,
                                       100:result[100]||0,
                                       50:result[50]||0}))
            setRemainingNote(prev => ({...prev, 5000:limited[5000]-(result[5000]||0),
                                                2000:limited[2000]-(result[2000]||0),
                                                1000:limited[1000]-(result[1000]||0),
                                                500:limited[500]-(result[500]||0),
                                                200:limited[200]-(result[200]||0),
                                                100:limited[100]-(result[100]||0),
                                                50:limited[50]-(result[50]||0)}))

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

    const selectTerminal =(e:any)=>{
        switch(e.target.value){
            case '1':
                setRemainingNote(limit)
                break;
            case '2':
                setRemainingNote(limits2)
                break;
            case '3':
                setRemainingNote(limits3)
                break;
            case '4':
                setRemainingNote(limits4)
                break;
            case '5':
                setRemainingNote(limits5)
                break;
            case '6':
                setRemainingNote(limits6)
                break;
        }
    }

    if(Number(inputText)>=50) {
        content = 
            <Fragment>
                <button className="button" onClick={getCash}>Получить деньги</button>
                <TextTerminal  remainBalance={remainBalance} bills={{
                    note5000: note[5000],
                    note2000: note[2000],
                    note1000: note[1000],
                    note500: note[500],
                    note200: note[200],
                    note100: note[100],
                    note50: note[50]
                }}/>
            </Fragment>
    }else{
        content = 
            <Fragment>
                <h1 className="content__text_amount">Введите необходимую сумму</h1>
            </Fragment>
}

    return(       
        <div className="wrapper">
            <div className="set-note">
                <p>Выберите банкомат</p>
                {SET_NOTE.map((i)=>{
                    return(
                        <button className="button button__set-note" key={i} value={i} onClick={selectTerminal}>{i}</button>
                    )
                })}
            </div>
            <div className="content">
                <input className="content__input" 
                        ref={inputRef} 
                        type="number" 
                        placeholder="введите требуемую сумму" 
                        value={inputText}
                        onChange={handleChange}
                        onKeyDown={onKeypressHandler}
                        />
                <div className="content__text">
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
                amount5000={remainingNote[5000]}
                amount2000={remainingNote[2000]}
                amount1000={remainingNote[1000]}
                amount500={remainingNote[500]}
                amount200={remainingNote[200]}
                amount100={remainingNote[100]}
                amount50={remainingNote[50]}/>
        </div>
    )
}