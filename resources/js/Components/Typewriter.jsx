import React, {useState, useEffect} from 'react';

const Typewriter = ({text, additionalText, textDelay, additionalTextDelay, setCompleted = null}) => {

    const [primaryText, setPrimaryText] = useState('');
    const [primaryIndex, setPrimaryIndex] = useState(0);
    const [secondaryText, setSecondaryText] = useState('');
    const [secondaryIndex, setSecondaryIndex] = useState(0);

    useEffect(() => {
        if (primaryIndex < text.length) {
          const timeout = setTimeout(() => {
            setPrimaryText(prevText => prevText + text[primaryIndex]);
            setPrimaryIndex(prevIndex => prevIndex + 1);
          }, textDelay);
      
          return () => clearTimeout(timeout);

        } else if (additionalText && additionalText.length > 0) {
            if (secondaryIndex < additionalText.length) {
                const timeout = setTimeout(() => {
                  setSecondaryText(prevText => prevText + additionalText[secondaryIndex]);
                  setSecondaryIndex(prevIndex => prevIndex + 1);
                }, additionalTextDelay);
            
                return () => clearTimeout(timeout);
            }
        }
        
        if (primaryIndex === text.length && setCompleted) {
            if (additionalText && additionalText?.length > 0) {
                if (secondaryIndex === additionalText.length) {
                    setCompleted(true);
                }
            } else {
                setCompleted(true);
            }
        }
      }, [primaryIndex, secondaryIndex, textDelay, additionalTextDelay, text, additionalText]);

    return <span className="flex">{primaryText}<p className='flex ml-2 text-sm justify-center items-center'>{secondaryText}</p></span>;

};

export default Typewriter;