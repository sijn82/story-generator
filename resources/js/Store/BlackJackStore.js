import { create } from 'zustand';

const useBlackJackStore = create((set, get) => ({
    chipStack: 5000,
    playerSticking: true,
    roundComplete: true,
    gameOver: false,
    bet: 100,
    gameStatus: "Ready",
    playerHand: [],
    dealerHand: [],
    // currentDeck: [],
    updateChipStack: (newChipStackValue) => set(() => ({
        chipStack: newChipStackValue
    })),
    setPlayerSticking: (newPlayerStickingStatus) => set(() => ({
        playerSticking: newPlayerStickingStatus
    })),
    setRoundComplete: (newRoundStatus) => set(() => ({
        roundComplete: newRoundStatus
    })),
    setGameOver: (endGame) => set(() => ({
        gameOver: endGame
    })),
    setBet: (newBetValue) => set(() => ({
        bet: newBetValue
    })),
    setGameStatus: (newGameStatus) => set(() => ({
        gameStatus: newGameStatus
    })),
    // addCardToHand: (isPlayer, newCard) => set((state) => {
    //     if (isPlayer) {
    //         () => ({playerHand: [...state.playerHand, newCard]})
    //     } else {
    //         () => ({dealerHand: [...state.dealerHand, newCard]})
    //     }
    // }),
    addCardToPlayerHand: (newCard) => set((state) => ({
        playerHand: [...state.playerHand, newCard]
    })),
    addCardToDealerHand: (newCard) => set((state) => ({
        dealerHand: [...state.dealerHand, newCard]
    })),
    // setCurrentDeck: (deck) => set(() => ({
    //     currentDeck: deck
    // })),
    // shuffleDeck: (deck) => () => {

    //     for (let i = deck.length - 1; i > 0; i--) { 
    //         const j = Math.floor(Math.random() * (i + 1)); 
    //         [deck[i], deck[j]] = [deck[j], deck[i]]; 
    //     }

    //     get().setCurrentDeck([...deck]);

    // },
    resetHands: () => set(() => ({
        playerHand: [],
        dealerHand: []
    })),
    resetState: () => set(() => ({
        chipStack: 5000,
        playerSticking: true,
        roundComplete: true,
        gameOver: false,
        bet: 100,
        gameStatus: "Ready",
        playerHand: [],
        dealerHand: [],
    }))


}))

export default useBlackJackStore;