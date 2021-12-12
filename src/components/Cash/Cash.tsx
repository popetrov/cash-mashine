import React, { useState } from "react";
import { Fragment } from "react";
import { Info } from "../Info/Info";
import { Numpad } from "../Numpad/Numpad";
import { TextTerminal } from "../TextTerminal/TextTerminal";

export const Cash = () => {

    const limit:{[key:number]:number} = {5000:100, 2000:400, 1000:1000, 500:3000, 200:6000, 100:8000, 50:10000}
    
    const limits2 = {5000:476,2000:345,1000:6741,500:4362,200:234,100:1643,50:3450}
    const limits3 = {5000:234,2000:678,1000:845,500:2451,200:9654,100:2345,50:234}
    const limits4 = {5000:546,2000:562,1000:2543,500:4365,200:2154,100:124,50:342}
    const limits5 = {5000:2732,2000:347,1000:479,500:7556,200:3296,100:1257,50:3854}
    const limits6 = {5000:73,2000:147,1000:279,500:356,200:696,100:857,50:854}
    let content;
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
    
    const banknoteNominals = Object.keys(limit).map(Number).sort((a,b)=>b-a)
    const lowestNominals = banknoteNominals[banknoteNominals.length]
    const result:{[key:number]:number} = {}

    const getAmountCash = (amount:number) => {
        if(amount % lowestNominals) return false

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
            limit[type] = limit[type] - (result[type] || 0)
        })

        return result
    }

    // const collect=(amount: number, nominals: number[])=>{
    //     if(amount < 50) return {}
    //     if(!nominals.length) return 

    //     let currentNominal = nominals[0]
    //     let availableNotes = limits[currentNominal]
    //     let notesNeeded = Math.floor(amount/currentNominal)
    //     let numberOfNotes = Math.min(availableNotes, notesNeeded)
    //     let result:any = collect(amount - currentNominal*numberOfNotes, nominals.slice(1))
    //     console.log("-----")
    //     console.log(Number(`${currentNominal}`))
    //     setNote(prev => ({...prev, 2000:1}))
    //     console.log(note)
        
    //     if(result){
    //         return numberOfNotes ? {[currentNominal]:numberOfNotes, ...result}:result
    //     }
    // }

    // const iWantToGet = (amountRequired: any, limits: Object) =>{ 
    //     let nominals = Object.keys(limits).map(Number).sort((a,b)=>b-a)
    //     return collect(amountRequired, nominals)
    // }

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

            console.log(note)
        
        // for(let i of resultArray){
        // switch(i){
        //     case 5000:
        //      resultCash+=i*resultObject[5000]
        //      setNote5000(resultObject[5000])
        //      setRemainingNote((prev: any) => ({...prev, 5000:(remainingNote[5000]-resultObject[5000])}))
        //      setLimited((prev: number[]) =>({...prev,
        //         5000:remainingNote[5000]} ))
        //         console.log(remainingNote[5000])
        //      if(remainingNote[5000]<=0){
        //         setNote5000(0)
        //         setRemainingNote((prev: any)=>({...prev,5000:0}))
        //         setRemainBalance(Number(inputText))
        //      }
        //      break
        //     case 2000:
        //      resultCash+=i*resultObject[2000]
        //      setNote2000(resultObject[2000])
        //      setRemainingNote((prev: any) => ({...prev, 2000:(remainingNote[2000]-resultObject[2000])}))
        //      setLimited((prev: number[]) =>({...prev,
        //         2000:remainingNote[2000]} )) 
        //      if(remainingNote[2000]<=0){
        //         setNote2000(0)
        //         setRemainingNote((prev: any)=>({...prev,2000:0}))
        //         setRemainBalance(Number(inputText))
        //      }   
        //      break;
        //     case 1000:
        //      resultCash+=i*resultObject[1000]
        //      setNote1000(resultObject[1000])
        //      setRemainingNote((prev: any) => ({...prev, 1000:(remainingNote[1000]-resultObject[1000])}))
        //      setLimited((prev: number[]) =>({...prev,
        //         1000:remainingNote[1000]} ))  
        //      if(remainingNote[1000]<=0){
        //         setNote1000(0)
        //         setRemainingNote((prev: any)=>({...prev,1000:0}))
        //         setRemainBalance(Number(inputText))
        //      }   
        //      break;
        //     case 500:
        //      resultCash+=i*resultObject[500]   
        //      setNote500(resultObject[500])
        //      setRemainingNote((prev: any) => ({...prev, 500:(remainingNote[500]-resultObject[500])}))
        //      setLimited((prev: number[]) =>({...prev,
        //         500:remainingNote[500]} )) 
        //      if(remainingNote[500]<=0){
        //         setNote500(0)
        //         setRemainingNote((prev: any)=>({...prev,500:0}))
        //         setRemainBalance(Number(inputText))
        //      }    
        //      break;
        //     case 200:
        //      resultCash+=i*resultObject[200]
        //      setNote200(resultObject[200])
        //      setRemainingNote((prev: any) => ({...prev, 200:(remainingNote[200]-resultObject[200])}))
        //      setLimited((prev: number[]) =>({...prev,
        //         200:remainingNote[200]} )) 
        //      if(remainingNote[200]<=0){
        //         setNote500(0)
        //         setRemainingNote((prev: any)=>({...prev,200:0}))
        //         setRemainBalance(Number(inputText))
        //      }    
        //      break;
        //     case 100:
        //      resultCash+=i*resultObject[100]
        //      setNote100(resultObject[100])
        //      setRemainingNote((prev: any) => ({...prev, 100:(remainingNote[100]-resultObject[100])}))
        //      setLimited((prev: number[]) =>({...prev,
        //         100:remainingNote[100]} )) 
        //      if(remainingNote[100]<=0){
        //         setNote500(0)
        //         setRemainingNote((prev: any)=>({...prev,100:0}))
        //         setRemainBalance(Number(inputText))
        //      }    
        //      break;
        //     case 50:
        //      resultCash+=i*resultObject[50]
        //      setNote50(resultObject[50])
        //      setRemainingNote((prev: any) => ({...prev, 50:(remainingNote[50]-resultObject[50])}))
        //      setLimited((prev: number[]) =>({...prev,
        //         500:remainingNote[50]} )) 
        //      if(remainingNote[50]<=0){
        //         setNote500(0)
        //         setRemainingNote((prev: any)=>({...prev,50:0}))
        //         setRemainBalance(Number(inputText))
        //      }    
        //      break     
        // }
        // }
        // setRemainBalance(Number(inputText)-resultCash)
    }

    // const onKeypressHandler = (e:React.KeyboardEvent<HTMLDivElement>)=>{
    //     if(e.key === "Enter"){
    //         iWantToGet(inputText, limits)
    //     let resultArray = Object.keys(resultObject).map(Number).sort((a,b)=>b-a)

    //     for(let i of resultArray){
    //     switch(i){
    //         case 5000:
    //          resultCash+=i*resultObject[5000]
    //          setNote5000(resultObject[5000])
    //          setRemainingNote((prev: any) => ({...prev, 5000:(remainingNote[5000]-resultObject[5000])}))
    //          setLimited((prev: number[]) =>({...prev,
    //             5000:remainingNote[5000]} ))
    //          if(remainingNote[5000]<=0){
    //             setNote5000(0)
    //             setRemainingNote((prev: any)=>({...prev,5000:0}))
    //             setRemainBalance(Number(inputText))
    //          }
    //          break
    //         case 2000:
    //          resultCash+=i*resultObject[2000]
    //          setNote2000(resultObject[2000])
    //          setRemainingNote((prev: any) => ({...prev, 2000:(remainingNote[2000]-resultObject[2000])}))
    //          setLimited((prev: number[]) =>({...prev,
    //             2000:remainingNote[2000]} )) 
    //          if(remainingNote[2000]<=0){
    //             setNote2000(0)
    //             setRemainingNote((prev: any)=>({...prev,2000:0}))
    //             setRemainBalance(Number(inputText))
    //          }   
    //          break;
    //         case 1000:
    //          resultCash+=i*resultObject[1000]
    //          setNote1000(resultObject[1000])
    //          setRemainingNote((prev: any) => ({...prev, 1000:(remainingNote[1000]-resultObject[1000])}))
    //          setLimited((prev: number[]) =>({...prev,
    //             1000:remainingNote[1000]} ))  
    //          if(remainingNote[1000]<=0){
    //             setNote1000(0)
    //             setRemainingNote((prev: any)=>({...prev,1000:0}))
    //             setRemainBalance(Number(inputText))
    //          }   
    //          break;
    //         case 500:
    //          resultCash+=i*resultObject[500]   
    //          setNote500(resultObject[500])
    //          setRemainingNote((prev: any) => ({...prev, 500:(remainingNote[500]-resultObject[500])}))
    //          setLimited((prev: number[]) =>({...prev,
    //             500:remainingNote[500]} )) 
    //          if(remainingNote[500]<=0){
    //             setNote500(0)
    //             setRemainingNote((prev: any)=>({...prev,500:0}))
    //             setRemainBalance(Number(inputText))
    //          }    
    //          break;
    //         case 200:
    //          resultCash+=i*resultObject[200]
    //          setNote200(resultObject[200])
    //          setRemainingNote((prev: any) => ({...prev, 200:(remainingNote[200]-resultObject[200])}))
    //          setLimited((prev: number[]) =>({...prev,
    //             200:remainingNote[200]} )) 
    //          if(remainingNote[200]<=0){
    //             setNote500(0)
    //             setRemainingNote((prev: any)=>({...prev,200:0}))
    //             setRemainBalance(Number(inputText))
    //          }    
    //          break;
    //         case 100:
    //          resultCash+=i*resultObject[100]
    //          setNote100(resultObject[100])
    //          setRemainingNote((prev: any) => ({...prev, 100:(remainingNote[100]-resultObject[100])}))
    //          setLimited((prev: number[]) =>({...prev,
    //             100:remainingNote[100]} )) 
    //          if(remainingNote[100]<=0){
    //             setNote500(0)
    //             setRemainingNote((prev: any)=>({...prev,100:0}))
    //             setRemainBalance(Number(inputText))
    //          }    
    //          break;
    //         case 50:
    //          resultCash+=i*resultObject[50]
    //          setNote50(resultObject[50])
    //          setRemainingNote((prev: any) => ({...prev, 50:(remainingNote[50]-resultObject[50])}))
    //          setLimited((prev: number[]) =>({...prev,
    //             500:remainingNote[50]} )) 
    //          if(remainingNote[50]<=0){
    //             setNote500(0)
    //             setRemainingNote((prev: any)=>({...prev,50:0}))
    //             setRemainBalance(Number(inputText))
    //          }    
    //          break     
    //     }
    //     }
    //     setRemainBalance(Number(inputText)-resultCash)
    //     }
    // }

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

    if(Number(inputText)>50) {
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
                        // onKeyDown={onKeypressHandler}
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