export interface Card {
    title: string, 
    description: string, 
    choice1: {
        name: string, 
        moneyScore: number,
        healthScore: number,
        karmaScore: number
    },
    choice2: {
        name: string, 
        moneyScore: number,
        healthScore: number,
        karmaScore: number
    }
}