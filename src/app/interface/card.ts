export interface Card {
    name: string,
    title: string, 
    description: string[], 
    choice1: Choice,
    choice2: Choice
}

export interface Choice {
    name: string, 
    moneyScore: number,
    fameScore: number,
    moraleScore: number, 
    addDeck: string, 
    removeDeck: string, 
}