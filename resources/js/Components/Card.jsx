

export default function Card({
    card, 
    // showCard, 
    // setHand, 
    zoom
}) {
    return (
        <>
            {/* <div className={`rounded p-0.5 tall:p-2  border border-2 border-gray-400 text-gray-600 ${card.in_play ? 'bg-cyan-700' : 'bg-gray-600'} tall:h-32 medium:h-20 h-16 2xl:h-24 aspect-[3/4] grid grid-rows-4 ${zoom ? 'lg:h-24' : ''}`}  */}
            <div className={`rounded p-0.5 tall:p-2 border-2 border-gray-200 text-gray-600 ${card.in_play ? 'bg-gray-100' : 'bg-gray-600'} tall:h-32 medium:h-20 h-16 2xl:h-24 aspect-[3/4] grid grid-rows-4 ${zoom ? 'lg:h-24' : ''}`} 
                key={card.id} id={card.id} 
                onClick={() => {}
                    // showCard(card, setHand)
            }>
                <div className={`relative flex row-span-2`}>
                    <div 
                        style={{ backgroundImage: `url('https://d1fftu7568zsov.cloudfront.net/${card.suit.toLowerCase()}.svg')` }}
                        // style={{ backgroundImage: `url('http://localhost/storage/images/${card.suit.toLowerCase()}.svg')` }} 
                        className={` bg-no-repeat absolute bg-contain top-0 right-0 tall:h-8 tall:w-8 medium:h-8 medium:w-8 h-6 w-6 xl:h-8 xl:w-8 `}>

                    </div>
                </div>
                <div className="row-span-2 flex items-center">
                    {/* <p className={`text-center font-bold text-white ${zoom ? 'text-md' : 'text-xs'} flex-1`}><span className={`tall:text-5xl medium:text-5xl text-3xl xl:text-4xl`}>{card.name} </span></p> */}
                    <p className={`text-center font-bold text-gray-800 ${zoom ? 'text-md' : 'text-xs'} flex-1`}><span className={`tall:text-5xl medium:text-5xl text-3xl xl:text-4xl`}>{card.name} </span></p>
                </div>
            </div>
        </>
    )
}