import CardHand from "@/Components/CardHand";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";


export default function BlackJack({deck, zoom = false}) {

    const [currentDeck, setCurrentDeck] = useState(deck);
    const freshDeck = deck; // resets the deck to the original deck
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [bet, setBet] = useState(100);
    const [chipStack, setChipStack] = useState(5000);
    const [playerSticking, setPlayerSticking] = useState(false);
    const [roundComplete, setRoundComplete] = useState(false);
    const [gameStatus, setGameStatus] = useState('Ready');
    const [gameOver, setGameOver] = useState(false);

    // notes:

    // 1. The player can only bet before the round starts (this feels normal but is it a rule?)
    // 2. Only one player is supported at the moment
    // 3. in_play determines visibility of in play cards but currently all in play cards are visible
    //    so do I need this anymore?

    const shuffleDeck = (deck) => {

        for (let i = deck.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [deck[i], deck[j]] = [deck[j], deck[i]]; 
        }

        setCurrentDeck([...deck]);

    };

    const resetDeck = () => {
        setCurrentDeck([...freshDeck]);
    };

    const dealCard = (deck, player, showImmediately = false) => {

        const card = deck.pop();
        if (showImmediately) {
            card.in_play = true;
        }
        setCurrentDeck([...deck]);

        if (player === 'Dealer') {
            setDealerHand(currentHand => [...currentHand, card]);
            
        } else {
            setPlayerHand(currentHand => [...currentHand, card]);
        }
    };

    const currentTotal = (hand) => {

            // calculate the current total of the hand
            let currentTotal = hand?.reduce((acc, card) => {

                if (card.in_play) {
                    if (card.name === 'King' || card.name === 'Queen' || card.name === 'Jack') {
                        acc = acc + 10;
                    } else if (card.name === 'Ace') {
                        // rather than calculate whether to add 11 or 1, we'll just add 11
                        // and then evaluate the total later
                        acc = acc + 11;
                    } else {
                        acc = acc + card.value;
                    }
                } else {
                     // nothing to do
                }

                return acc;
                
            }, 0);

            // if the total is greater than 21, we need to re-evaluate the aces
            if (currentTotal > 21 && hand?.filter(card => card.name === 'Ace').length > 0) {
                
                let acesInHand = hand?.filter(card => card.name === 'Ace')
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

    const dealHand = (deck) => {

        // reset the dealer and player hands
        setDealerHand([]);
        setPlayerHand([]);
        // reset the game and player status
        setRoundComplete(false);
        setPlayerSticking(false);
        setGameStatus('Playing...');
        // take the bet from the chip stack
        setChipStack(chipStack - bet);

        // deal the intitial 2 cards to the player and 1 to the dealer
        dealCard(deck, "Player", true);
        dealCard(deck, "Dealer", true);
        dealCard(deck, "Player", true);

    };

    const showCard = (card, setHand) => {

        setHand(currentHand => currentHand.map(
            (cardInHand) => cardInHand.id === card.id ?
                {...cardInHand, in_play: true} : cardInHand)
        );

    }

    const playDealerHandAndDetermineWhoWins = () => {

        // dealer draws cards until they have 17 or more
        if (currentTotal(dealerHand) < 17) {
            dealCard(currentDeck, "Dealer", true);

        } else {

            // prevent issuing more wins or losses by spamming the stick button
            if (roundComplete) {
                return;
            }

            // calculate the winner
            const playerTotal = currentTotal(playerHand);
            const dealerTotal = currentTotal(dealerHand);
            let playerBlackjack = false;
            let dealerBlackjack = false;

            // calculate if the hand is a blackjack i.e 21 in 2 cards
            if (playerTotal === 21 && playerHand.length === 2) {
                // setPlayerBlackjack(true);
                playerBlackjack = true;
            }
            if (dealerTotal === 21 && dealerHand.length === 2) {
                // setDealerBlackjack(true);
                dealerBlackjack = true;
            }

            if (playerTotal > 21) {
                // player busts
                setGameStatus('Player Busts');
            } else if (dealerTotal > 21) {
                // dealer busts
                setChipStack(chipStack + (bet * 2));
                setGameStatus('Dealer Busts');
            } else if (playerTotal > dealerTotal) {
                // player wins
                if (playerBlackjack) {
                    setChipStack(chipStack + (bet * 3));
                    setGameStatus('Player wins with Black Jack');
                } else {
                    setChipStack(chipStack + (bet * 2));
                    setGameStatus('Player Wins');
                }

            } else if (playerTotal < dealerTotal) {
                // dealer wins
                if (dealerBlackjack) {
                    setGameStatus('Dealer wins with Black Jack');
                } else {
                    setGameStatus('Dealer Wins');
                }

            } else {
                // draw
                if (playerBlackjack && dealerBlackjack) {
                    setChipStack(chipStack + bet);
                    setGameStatus('Draw with Black Jack');
                } else if (playerBlackjack) {
                    setChipStack(chipStack + (bet * 1.5));
                    setGameStatus('Player wins with Black Jack');
                } else if (dealerBlackjack) {
                    setGameStatus('Dealer wins with Black Jack');
                } else {
                    setChipStack(chipStack + bet);
                    setGameStatus('Draw');
                }
                
            }

            setRoundComplete(true);
            resetDeck();

        }
                
    };

    const selectBetValue = (event) => {
        setBet((event.target.value > chipStack) ? chipStack : event.target.value);
    };

    useEffect(() => {
        setCurrentDeck([...deck]);
        shuffleDeck(currentDeck);
    }, []);

    useEffect(() => {
        shuffleDeck(currentDeck);
    }, [roundComplete]);

    useEffect(() => {
        if (chipStack <= 0 && roundComplete) {
            setGameOver(true);
        }
    }, [chipStack, roundComplete]);

    useEffect(() => {
        if (playerSticking && !roundComplete) {
            playDealerHandAndDetermineWhoWins();
        }
    }, [dealerHand, currentDeck]);

    useEffect(() => {
        if (currentTotal(playerHand) > 21) {
            setPlayerSticking(true);
            setGameStatus('Player Busts');
            setRoundComplete(true);
            resetDeck();
        }
    }, [playerHand]);

    return (
        <div className="h-full flex-col flex text-sm">
            {/* <div className="h-full"> */}
                <div className="">
                    <h1 className="font-bold text-center text-gray-600 text-3xl py-3">Black Jack</h1>
                </div>
                {gameOver ? 
                <div className="border border-2 flex h-full items-center justify-center">
                    <div className="">
                        <div className="mx-4 flex justify-start border border-2 p-3 items-center bg-white">
                            <h2 className="mx-4 flex font-bold text-gray-600">Game Status: <span className="flex mx-2 text-lg font-bold text-gray-600 items-center">{gameStatus}</span></h2>
                            {/* <h2 className="mx-4 flex">Round Complete: <span className="flex mx-2 text-4xl font-bold text-gray-600">{roundComplete ? "true" : "false"}</span></h2> */}
                        </div>
                        <h2 className="mx-4 flex border border-2 p-3 font-bold text-gray-600">Chip Stack: <span className="flex mx-2 text-lg font-bold text-gray-600">{chipStack}</span></h2>
                        <h1 className="font-bold text-center text-gray-600 text-4xl py-4">Game Over</h1>
                    </div>
                </div> :
                <div className="mx-3 border border-2 p-2">
                    <div className="flex justify-between border border-2 border-gray-200 p-1">
                        <div className="mx-1 grid grid-rows-2 justify-start border border-2 p-1 items-center bg-white">
                            <h2 className="mx-1 flex font-bold text-gray-600 border-b-2">Game Status </h2>
                            <p className="flex mx-1 font-bold text-gray-600 items-center">{gameStatus}</p>
                            {/* <h2 className="mx-4 flex">Round Complete: <span className="flex mx-2 text-4xl font-bold text-gray-600">{roundComplete ? "true" : "false"}</span></h2> */}
                        </div>
                        {/* <div className="mx-2 flex justify-end items-center"> */}
                            {/* <h2 className="mx-4 flex">Bet: <span className="flex mx-2 text-4xl font-bold text-gray-600">{bet}</span></h2> */}
                            <FormControl size="small">
                                <InputLabel id="bet-select-label">Bet</InputLabel>
                                <Select
                                    sx={{backgroundColor: 'white'}}
                                    labelId="bet-select-label"
                                    id="bet-select"
                                    value={bet}
                                    label="Bet"
                                    onChange={selectBetValue}
                                >
                                    { chipStack >= 100 && <MenuItem value={100}>100</MenuItem> }
                                    { chipStack >= 200 && <MenuItem value={200}>200</MenuItem> }
                                    { chipStack >= 300 && <MenuItem value={300}>300</MenuItem> }
                                    { chipStack >= 400 && <MenuItem value={400}>400</MenuItem> }
                                    { chipStack >= 500 && <MenuItem value={500}>500</MenuItem> }
                                    { chipStack >= 600 && <MenuItem value={600}>600</MenuItem> }
                                    { chipStack >= 700 && <MenuItem value={700}>700</MenuItem> }
                                    { chipStack >= 800 && <MenuItem value={800}>800</MenuItem> }
                                    { chipStack >= 900 && <MenuItem value={900}>900</MenuItem> }
                                    { chipStack >= 1000 && <MenuItem value={1000}>1000</MenuItem> }
                                    
                                </Select>
                            </FormControl>
                            <div className="grid grid-rows-2 mx-1 flex border border-2 p-1 font-bold text-gray-600 bg-white items-center">
                                <h2 className="border-b-2 flex"> Chip Stack </h2>
                                <p className="flex mx-2 text-xl font-bold text-gray-600">{chipStack}</p>
                            </div>
                        {/* </div> */}
                    </div>
                    <div className="flex my-1 border border-2 p-1 justify-between">
                        <h2 className=" ml-2 p-2 border border-2 font-bold text-gray-600">Deck:</h2>
                        {/* <button className="ml-3 btn bg-blue-500 text-white font-bold py-2 px-4 rounded"
                            onClick={() => shuffleDeck(currentDeck)}
                        >Shuffle</button> */}
                        <button className="ml-3 btn bg-sky-900 text-white font-bold py-1 px-2 w-1/4" 
                            onClick={() => {
                                dealHand(currentDeck); 
                            }}
                        >Deal</button>
                        {/* <div className="flex"> */}
                        <button className="ml-3 btn bg-rose-900 disabled:bg-rose-200 text-white font-bold py-1 px-2 w-1/4" 
                        disabled={playerSticking}
                            onClick={() => 
                                dealCard(currentDeck, "Player", true)
                            }
                        >Hit</button>
                        <button className="ml-3 btn bg-teal-900 disabled:bg-teal-200 text-white font-bold py-1 px-2 w-1/4" 
                            disabled={playerSticking}
                            onClick={() => {
                                setPlayerSticking(true); 
                                playDealerHandAndDetermineWhoWins()
                            }}
                        >Stick</button>
                    {/* </div> */}
                    </div>
                    <CardHand 
                        hand={playerHand} 
                        player="Player" 
                        currentTotal={currentTotal} 
                        dealCard={dealCard} 
                        showCard={showCard} 
                        setHand={setPlayerHand} 
                        currentDeck={currentDeck} 
                        playerSticking={playerSticking}
                        setPlayerSticking={setPlayerSticking} 
                        playDealerHandAndDetermineWhoWins={playDealerHandAndDetermineWhoWins} 
                        zoom={zoom}
                    />
                    <CardHand 
                        hand={dealerHand} 
                        player="Dealer" 
                        currentTotal={currentTotal} 
                        //dealCard={dealCard} 
                        showCard={showCard} 
                        setHand={setDealerHand} 
                        currentDeck={currentDeck} 
                        zoom={zoom}
                    />
                    {/* <div className="my-5">
                        <h2 className="mx-2 my-5">Remaining Deck</h2>
                        <div className="mx-auto flex flex-wrap gap-3 mx-5">
                            {currentDeck?.map((card) => (
                                <div className="p-2 rounded border border-grey-600" key={card.id}>
                                    <p>{card.name} of {card.suit}</p>
                                </div>
                            ))}
                        </div>
                    </div> */}
                    
                </div>}
            {/* </div> */}
        </div>
        
    )
}