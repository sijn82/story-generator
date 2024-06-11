export default function CardHand({
    hand, 
    setHand, 
    player, 
    dealCard = null, 
    playerSticking,
    setPlayerSticking = null, 
    showCard, 
    currentTotal, 
    currentDeck,
    playDealerHandAndDetermineWhoWins = null,
    zoom = false
}) {

    return (
        <>

            <div className="flex my-1 border border-2 px-1 py-1 justify-between">
                <div className="flex">
                    <h2 className="mx-2 border border-2 my-auto p-1 font-bold text-gray-600">{player} Score: </h2>
                    <div className="text-xl font-bold text-gray-600 border border-2 my-auto"> {currentTotal(hand)}</div>
                </div>
                
                {/* { player !== "Dealer" &&  */}
                    {/* // <div className="flex">
                    //     <button className="ml-3 btn bg-rose-700 disabled:bg-rose-200 text-white font-bold py-2 px-4 rounded" 
                    //     disabled={playerSticking}
                    //         onClick={() => 
                    //             dealCard(currentDeck, player, true)
                    //         }
                    //     >Hit</button>
                    //     <button className="ml-3 btn bg-teal-700 disabled:bg-teal-200 text-white font-bold py-2 px-4 rounded" 
                    //         disabled={playerSticking}
                    //         onClick={() => {
                    //             setPlayerSticking(true); 
                    //             playDealerHandAndDetermineWhoWins()
                    //         }}
                    //     >Stick</button>
                    // </div> */}
                    
                {/* // } */}
                
            </div>
            <div className="mx-auto flex gap-3 mx-5">
                {hand.length > 0 && hand?.map((card) => (
                    <div className={`${zoom ? 'p-1' : 'p-2'} rounded border border-2 border-gray-400 text-gray-600 ${card.in_play ? 'bg-cyan-700' : 'bg-gray-600'} ${zoom ? 'w-16' : 'w-20'} ${zoom ? 'h-20' : 'h-32'} flex items-center`} 
                        key={card.id} id={card.id} 
                        onClick={() => 
                            showCard(card, setHand)
                        }>
                        <p className={`text-center font-bold text-white ${zoom ? 'text-xs' : 'text-md'} flex-1`}><span className={`${zoom ? 'text-md' : 'text-xl'}`}>{card.name} </span>of {card.suit}</p>
                    </div>
                ))}
            </div>
    
        </>
    );
}