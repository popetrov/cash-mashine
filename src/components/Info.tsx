import { Dispatch, FC, SetStateAction } from "react";
import "../css/info.css"

export type InfoProps={
    active:boolean,
    setActive:Dispatch<SetStateAction<boolean>>
}

export const Info:FC<InfoProps> = ({active, setActive})=>{

    return(            
        <div className={active ? "modal active": "modal"} onClick={()=>setActive(false)}>
            <div className="modal__content" onClick={(e)=>(e.stopPropagation())}>
                <h1>Банкнот в банкомате</h1>
                <p>купюр номиналом 5000:</p>
                <p>купюр номиналом 2000:</p>
                <p>купюр номиналом 1000:</p>
                <p>купюр номиналом 500: </p>
                <p>купюр номиналом 100: </p>
                <p>купюр номиналом 50: </p>
                <p>невыданная сумма:</p>
            </div>
        </div>


    )
}