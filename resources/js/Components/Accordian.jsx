import { useState } from "react";
import ReactGA from "react-ga4";

export default function Accordian({title, small = false, indent = '', children}) {
    const [showContent, setShowContent] = useState(false);
    const [arrow, setArrow] = useState("+");
    const [buttonClicked, setButtonCLicked] = useState(false);
    const buttonActions = () => {
        setShowContent((prevState) => !prevState); 
        setArrow(arrow == "+" ? "-" : "+");
        if (!buttonClicked) {
            setButtonCLicked(true);
            ReactGA.event({
                category: 'Experience',
                action: 'Click',
                label: title
            });
        }
    }
    return (
        <>
            <div className={`font-bold ${small ? 'text-xl' :'text-2xl'} ${indent} text-zinc-500 my-3`} 
                onClick={() => {buttonActions()}}> 
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