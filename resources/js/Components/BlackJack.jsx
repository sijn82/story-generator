import CardHand from "@/Components/CardHand";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import TVDials from "./TVDials";
import GameOver from "./GameOver";


export default function BlackJack({deck, zoom = false, setZoom = null, highScores}) {

    const [currentDeck, setCurrentDeck] = useState(deck);
    const freshDeck = deck; // resets the deck to the original deck
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [bet, setBet] = useState(100);
    const [chipStack, setChipStack] = useState(5000);
    const [playerSticking, setPlayerSticking] = useState(true);
    const [roundComplete, setRoundComplete] = useState(true);
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
                    if (card.name === 'K' || card.name === 'Q' || card.name === 'J') {
                        acc = acc + 10;
                    } else if (card.name === 'A') {
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

    const dealHand = (deck) => {

        // if the player has no chips left, the game is over
        if (chipStack <= 0) {
            setGameOver(true);
            return;
        }
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
        if (bet > chipStack && roundComplete) {
            console.log("bet: " + bet + " greater than chipstack: " + chipStack + " setting bet to chipStack");
            setBet(chipStack);
        }
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
        <div className="h-full flex-col flex text-sm justify-center items-center">

            {zoom && 
                <div className="m-1 flex justify-center text-gray-700">
                    <button className=" border-2 p-1" onClick={() => setZoom(zoom => !zoom)}>Exit Full Screen</button>
                </div>}
            {gameOver ? <GameOver gameStatus={gameStatus} chipStack={chipStack} highScores={highScores} />
                :
            <div className={`mx-3 p-2 grid grid-cols-4 lg:gap-3 gap-2`}>
            
                <div className="flex flex-col  max-h-20 lg:max-h-32 col-span-2  border-gray-200 p-1">
                    <h2 className="mx-1 font-bold text-gray-600">Game Status</h2>
                    <div className="w-full h-full border border-2 p-1 flex justify-center items-center bg-white">
                        <p className="flex mx-1 font-bold text-gray-600">{gameStatus}</p>
                    </div>
                </div>
                <div className="flex justify-center items-center max-h-20 lg:max-h-32">
                    <FormControl size="small">
                        <InputLabel id="bet-select-label">Bet</InputLabel>
                        <Select
                            sx={{backgroundColor: 'white'}}
                            labelId="bet-select-label"
                            id="bet-select"
                            value={bet > chipStack && roundComplete ? chipStack : bet}
                            label="Bet"
                            onChange={selectBetValue}
                            disabled={!roundComplete}
                        >
                            <MenuItem disabled={chipStack < 100} value={100}>100</MenuItem>
                            <MenuItem disabled={chipStack < 200} value={200}>200</MenuItem>
                            <MenuItem disabled={chipStack < 300} value={300}>300</MenuItem>
                            <MenuItem disabled={chipStack < 400} value={400}>400</MenuItem>
                            <MenuItem disabled={chipStack < 500} value={500}>500</MenuItem>
                            <MenuItem disabled={chipStack < 600} value={600}>600</MenuItem>
                            <MenuItem disabled={chipStack < 700} value={700}>700</MenuItem>
                            <MenuItem disabled={chipStack < 800} value={800}>800</MenuItem>
                            <MenuItem disabled={chipStack < 900} value={900}>900</MenuItem>
                            <MenuItem disabled={chipStack < 1000} value={1000}>1000</MenuItem>
                            
                        </Select>
                    </FormControl>
                    <button className="m-3 rounded-full btn border-2 bg-cyan-500 text-white text-xs lg:text-md font-bold py-1 px-2 aspect-square" 
                        onClick={() => {
                            setGameOver(true); 
                        }}
                    >Cash Out</button>
                </div>
                {/* Righthand side chip count and actions column */}
                <div className="flex flex-col items-center row-span-3 my-1 border border-2 p-1 justify-between">
                    <h2 className="text-center text-gray-700 font-bold"> Chip Stack </h2>
                    <div className=" mx-1 flex border border-2 p-2 font-bold text-gray-600 bg-white justify-center items-center">
                        <p className="flex mx-2 lg:text-xl text-sm font-bold text-gray-600">{chipStack}</p>
                    </div>
                    {/* Deck */}
                    {/* <h2 className="m-2 p-2 border border-2 font-bold text-center text-gray-600">Deck</h2> */}
                    {/* Action Buttons */}
                    <button className="m-3 rounded-full btn border-2 bg-cyan-500 disabled:bg-cyan-200 text-white text-xs lg:text-md font-bold py-1 px-2 aspect-square w-1/2 lg:w-1/2" 
                        onClick={() => {
                            dealHand(currentDeck); 
                        }}
                        disabled={!roundComplete}
                    >Deal</button>
                    <button className="m-3 rounded-full btn border-2 bg-cyan-500 disabled:bg-cyan-200 text-white text-xs lg:text-md font-bold py-1 px-2 aspect-square w-1/2 lg:w-1/2" 
                    disabled={playerSticking}
                        onClick={() => 
                            dealCard(currentDeck, "Player", true)
                        }
                    >Hit</button>
                    <button className="m-3 rounded-full btn border-2 bg-cyan-500 disabled:bg-cyan-200 text-white text-xs lg:text-md font-bold py-1 px-2 aspect-square w-1/2 lg:w-1/2" 
                        disabled={playerSticking}
                        onClick={() => {
                            setPlayerSticking(true); 
                            playDealerHandAndDetermineWhoWins()
                        }}
                    >Stick</button>

                </div>
                {/* Player/Dealer cards */}
                <div className={`col-span-3 row-span-2`}>
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
                </div>
            </div>}
        </div>
        
    )
}