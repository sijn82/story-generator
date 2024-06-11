export const shuffleDeck = (deck, setCurrentDeck) => {
    for (let i = deck.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [deck[i], deck[j]] = [deck[j], deck[i]]; 
      }

    setCurrentDeck([...deck]);

    return deck;
};

export const dealCard = (deck, player, setDealerHand, setPlayerHand, setCurrentDeck) => {
    const card = deck.pop();
    setCurrentDeck([...deck]);
    if (player === 'dealer') {
        setDealerHand(currentHand => [...currentHand, card]);
    } else {
        setPlayerHand(currentHand => [...currentHand, card]);
    }
};

export const dealHand = (deck, setDealerHand, setPlayerHand) => {

    // reset the dealer and player hands
    setDealerHand([]);
    setPlayerHand([]);

    // deal the intitial 2 cards to the player and dealer
    dealCard(deck, "player");
    dealCard(deck, "dealer");
    dealCard(deck, "player");
    dealCard(deck, "dealer");

};