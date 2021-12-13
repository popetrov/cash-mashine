const NUMPAD_BTN = [1,2,3,4,5,6,7,8,9,'',0,'<']

export const Numpad = () => {
    return (
        <div className="numpad">
            {NUMPAD_BTN.map((i)=>{
                return(
                    <button className="button button__set-note" value={i} key={i} >{i}</button>
                )
            })}
        </div>
    )
}