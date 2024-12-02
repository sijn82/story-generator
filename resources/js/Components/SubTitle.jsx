import { useState } from "react";

export default function SubTitle({title, small = false, indent = '', handleState = null})
{
    const [arrow, setArrow] = useState("+");
    return (
        <div className={`font-bold ${small ? 'text-xl' :'text-2xl'} ${indent} text-zinc-500 my-6`} onClick={() => {handleState(); setArrow(arrow == "+" ? "-" : "+");}}> {title} <span className={arrow == "+" ? 'text-lime-500' : 'text-orange-500'}>{handleState ? arrow : ''}</span>  </div>
    );
}