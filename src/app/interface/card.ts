export interface Card {
    title: string, 
    description: string[], 
    choice1: {
        name: string, 
        moneyScore: number,
        fameScore: number,
        moraleScore: number, 
        addDeck: string, 
        removeDeck: string, 
    },
    choice2: {
        name: string, 
        moneyScore: number,
        fameScore: number,
        moraleScore: number,
        addDeck: string, 
        removeDeck: string, 
    }
}