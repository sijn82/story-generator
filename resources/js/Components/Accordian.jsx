import { useState } from "react";

export default function Accordian({title, small = false, indent = '', children}) {
    const [showContent, setShowContent] = useState(false);
    const [arrow, setArrow] = useState("+");
    return (
        <>
            <div className={`font-bold ${small ? 'text-xl' :'text-2xl'} ${indent} text-zinc-500 my-3`} 
                onClick={() => {setShowContent((prevState) => !prevState); setArrow(arrow == "+" ? "-" : "+");}}> 
                {title} <span className={arrow == "+" ? 'text-lime-500' : 'text-orange-500'}>{arrow}</span>  
            </div>
            {/* {
                showContent ?  */}
                <div className={`grid ${showContent ?'[grid-template-rows:1fr]' : '[grid-template-rows:0fr]'} transition-[grid-template-rows] ease-in duration-300`}>
                    <div className="overflow-hidden">{children}</div>
                </div>
            {/* } */}
        
        </>
        
    );
}