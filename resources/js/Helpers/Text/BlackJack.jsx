export const wood_effect_svg = `
    <svg xmlns="http://www.w3.org/2000/svg">
        <filter id="filter">
            <feTurbulence type="fractalNoise" baseFrequency=".1 .01"/>
            <feColorMatrix values=" 0 0 0 .11 .69
                                    0 0 0 .09 .34
                                    0 0 0 .08 .14
                                    0 0 0 0 1"/>
            <feBlend fill="#7f1d1d" in2="floodFill" mode="multiply" />
        </filter>
        <rect width="100%" height="100%" filter="url(#filter)"/>
    </svg>
    
`;

export const calculate_current_total = `
    const currentTotal = (hand) => {

        // calculate the current total of the hand
        let currentTotal = hand?.reduce((acc, card) => {

            if (card.in_play) {
                if (card.name === 'K' || card.name === 'Q' || card.name === 'J') {
                    acc = acc + 10;
                } else if (card.name === 'A') {
                    // rather than calculate whether to add 11 or 1, we'll just add 11
                    // and then evaluate the total later
                    acc = acc + 11;
                } else {
                    acc = acc + card.value;
                }
            }

            return acc;
            
        }, 0);

        // if the total is greater than 21, we need to re-evaluate the aces
        if (currentTotal > 21 && hand?.filter(card => card.name === 'A').length > 0) {
            
            let acesInHand = hand?.filter(card => card.name === 'A')

            // reduce the value of the first ace to 1 and recalculate the total
            // if the total is still greater than 21, reduce the value of the second ace
            // and recalculate the total etc.

            acesInHand.forEach(() => {
                if (currentTotal > 21 ) {
                    currentTotal = currentTotal - 10;
                } 
            });
        }

        return currentTotal;

    };

`;