import { Dispatch, FC, SetStateAction } from "react";
import "../Info/info.css"

export type InfoProps = {
    active:boolean,
    setActive:Dispatch<SetStateAction<boolean>>,
    amount5000:number,
    amount2000:number,
    amount1000:number,
    amount500:number,
    amount200:number,
    amount100:number,
    amount50:number
}

export const Info:FC<InfoProps> = ({active, setActive, amount5000, amount2000, amount1000, amount500,amount200, amount100, amount50})=>{

    return (            
        <div className={active ? "modal modal_active": "modal"} onClick={()=>setActive(false)}>
            <div className="modal__content" onClick={(e)=>(e.stopPropagation())}>
                <h1>Банкнот в банкомате</h1>
                <p>купюр номиналом 5000:{amount5000}</p>
                <p>купюр номиналом 2000:{amount2000}</p>
                <p>купюр номиналом 1000:{amount1000}</p>
                <p>купюр номиналом 500:{amount500} </p>
                <p>купюр номиналом 200:{amount200} </p>
                <p>купюр номиналом 100:{amount100}</p>
                <p>купюр номиналом 50:{amount50}</p>
            </div>
        </div>
    )
}