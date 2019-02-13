import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Card } from '../../interface/card';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'], 
  animations: [
    trigger('isHovering', [

      state('isHoveringLeft', style({
        transform: 'rotate(-3deg)', 
        transformOrigin: 'bottom right'
      })),

      state('isHoveringRight', style({
        transform: 'rotate(3deg)',
        transformOrigin: 'bottom left'
      })),

      state('default', style({
        transform: 'rotate(0)',
        transformOrigin: 'bottom'
      })),
  
      transition('isHoveringRight => isHoveringLeft', [
        animate('0.5s 0s ease-out')
      ]),

      transition('isHoveringRight => default', [
        animate('0.5s 0s ease-out')
      ]),

      transition('default => isHoveringLeft', [
        animate('0.5s 0s ease-out')
      ]),

      transition('default => isHoveringRight', [
        animate('0.5s 0s ease-out')
      ]),

      transition('isHoveringLeft => isHoveringRight', [
        animate('0.5s 0s ease-out')
      ]),

      transition('isHoveringLeft => default', [
        animate('0.5s 0s ease-out')
      ]),
    ])
  ]
})
export class GameComponent implements OnInit {
  
  // Les différents score du joueur (budget, réputation, motivation)
  moneyScore: number = 50
  fameScore: number = 100
  moraleScore: number = 0

  // Boolean indiquant dans quelle direction se trouve la carte
  isHoveringLeft: boolean = false
  isHoveringRight: boolean = false

  // La liste des cartes du jeu
  cardList: any[] = []

  // Les decks dans lesquels le joueur peut tirer une carte
  availableDecks: string[] = ['base']

  // La carte par défaut / courrante
  currentCard: Card = {
    name: "A l'aventure !", 
    title: "Maison", 
    description: [
      "Le grand jour est arrivé.",
    ], 
    choice1: {
      name: "Partir", 
      moneyScore: 0,
      fameScore: 0,
      moraleScore: 0, 
      addDeck: '', 
      removeDeck: ''
    },
    choice2: {
      name: "Partir", 
      moneyScore: 0,
      fameScore: 0,
      moraleScore: 0, 
      addDeck: '', 
      removeDeck: ''
    }
  }

  currentDay: number = 1

  // Boolean qui détermine si toutes les cartes ont été chargées avant d'afficher le jeu
  cardLoaded = false

  constructor() { 
    // On récupère les cartes du jeu
    this.cardList['base'] = require('../../../assets/decks/base.json').cards
    this.cardList['leather'] = require('../../../assets/decks/leather.json').cards

    this.cardLoaded = true
  }

  ngOnInit() {
  }

  // Lorsque le joueur clique, on prends en compte son choix et on change la carte courrante
  @HostListener('click', ['$event.target'])
  userClicked(btn) {
    // Si la carte n'est pas penchée, on ingore le click
    if(this.getCardState() === 'default') return;

    // On récupère le choix du joueur
    let choice = this.isHoveringLeft ? this.currentCard.choice1 : this.currentCard.choice2

    // On modifie les scores du joueur
    this.updateScore(choice)

    // On regarde s'il a perdu
    this.checkLoseCondition()

    // On applique les effets de la carte
    this.applyCardEffect(choice)

    // On met à jour la carte courante
    this.updateCurrentCard(choice)
  }

  // Retourne l'état actuel de la carte 
  getCardState() {
    if(this.isHoveringLeft) return 'isHoveringLeft'
    if(this.isHoveringRight) return 'isHoveringRight'

    return 'default'
  }

  // Met à jour les scores du joueur
  updateScore(choice) {
    this.moneyScore += choice.moneyScore
    this.fameScore += choice.fameScore
    this.moraleScore += choice.moraleScore
    this.currentDay++
  }

  // Applique les effets de la carte courante
  applyCardEffect(choice) {
    if(choice.addDeck !== '')
      this.availableDecks.push(choice.addDeck)

    if(choice.removeDeck !== '') 
      this.availableDecks = this.availableDecks.filter(elem => elem !== choice.removeDeck)
  }

  // Met à jour la carte courrante
  updateCurrentCard(choice) {
    // On choisit un deck au hasard
    let randomDeck = Math.round(Math.random() * (this.availableDecks.length-1))
    let deckName = this.availableDecks[ randomDeck ]

    // On choisit une carte au hasard
    let randomCard = Math.round(Math.random() * (this.cardList[ deckName ].length-1))

    this.currentCard = this.cardList[ deckName ][ randomCard ]
  }

  // Si le joueur hover à gauche, modifie les booleans
  hoverLeft() {
    this.isHoveringLeft = true
    this.isHoveringRight = false
  }

  // Si le joueur hover à droite, modifie les booleans
  hoverRight() {
    this.isHoveringLeft = false  
    this.isHoveringRight = true  
  }

  // Si le joueur hover au centre, modifie les booleans
  hoverCenter() {
    this.isHoveringLeft = false  
    this.isHoveringRight = false  
  }

  // Vérifie si le joueur a perdu
  checkLoseCondition() {

    let hasLost = this.moneyScore <= 0 || this.fameScore <= 0 || this.fameScore >= 100 || this.moraleScore <= 0 ||this.moraleScore >= 100

    console.log('has player lost: ' + hasLost)
  }
}
