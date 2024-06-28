import Card from "./Card";

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
                    <h2 className="mx-2 my-auto p-1 font-bold text-gray-600">{player} Score: </h2>
                    <div className="text-xl px-2 font-bold text-gray-600 border border-2 bg-white my-auto"> {currentTotal(hand)}</div>
                </div>      
            </div>
            <div className={`flex items-center gap-3 mx-5 ${zoom ? 'h-48 lg:h-32' : 'h-32'}`}>
                {hand.length > 0 && hand?.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        showCard={showCard}
                        setHand={setHand}
                        zoom={zoom}
                    />
                ))}
            </div>
        </>
    );
}