

export default function Card({card, showCard, setHand, zoom}) {
    return (
        <>
            <div className={`rounded border border-2 border-gray-400 text-gray-600 ${card.in_play ? 'bg-cyan-700' : 'bg-gray-600'} ${zoom ? 'w-24 h-32 p-2' : 'w-32 h-48 lg:w-20 lg:h-28 p-1'} grid grid-rows-4`} 
                key={card.id} id={card.id} 
                onClick={() => 
                    showCard(card, setHand)
            }>
                <div className={`relative flex`}>
                    <div 
                        style={{ backgroundImage: `url('https://sijn-portfolio.s3.eu-west-2.amazonaws.com/${card.suit}.svg')` }} 
                        className={` bg-no-repeat absolute bg-contain top-0 right-0 h-8 w-8`}>

                    </div>
                </div>
                <div className="row-span-3 flex items-center">
                    <p className={`text-center font-bold text-white ${zoom ? 'text-md' : 'text-xs'} flex-1`}><span className={`text-5xl`}>{card.name} </span></p>
                </div>
            </div>
        </>
    )
}