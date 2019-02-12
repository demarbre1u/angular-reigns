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
        transform: 'rotate(-5deg) translate(-50%, -50%)', 
        transformOrigin: 'top'
      })),

      state('isHoveringRight', style({
        transform: 'rotate(5deg) translate(-50%, -50%)',
        transformOrigin: 'left'
      })),
  
      transition('isHoveringRight => isHoveringLeft', [
        animate('0.5s 0s ease-out')
      ]),

      transition('isHoveringLeft => isHoveringRight', [
        animate('0.5s 0s ease-out')
      ]),
    ])
  ]
})
export class GameComponent implements OnInit {
  
  // Les différents score du joueur (argent, santé, karma)
  moneyScore: number = 50
  healthScore: number = 80
  karmaScore: number = 0

  // Boolean indiquant dans quelle direction se trouve la carte
  isHoveringLeft: boolean = false

  // La liste des cartes du jeu
  cardList: Card[]

  // La carte courrante
  currentCard: Card = {
    title: "Carte 1", 
    description: "La première carte de l'aventure :)", 
    choice1: {
      name: "Partir", 
      moneyScore: 10,
      healthScore: 10,
      karmaScore: -10
    },
    choice2: {
      name: "Rester", 
      moneyScore: 5,
      healthScore: 5,
      karmaScore: -5
    }
  }

  // Boolean qui détermine si toutes les cartes ont été chargées avant d'afficher le jeu
  cardLoaded = false

  constructor() { 
    // On récupère les cartes du jeu
    this.cardList = require('../../../assets/cards.json').cards

    this.cardLoaded = true
  }

  ngOnInit() {
  }

  // Lorsque le joueur clique, on prends en compte son choix et on change la carte courrante
  @HostListener('mousedown', ['$event'])
  userClicked(event) {
  
    let choice = this.isHoveringLeft ? this.currentCard.choice1 : this.currentCard.choice2

    this.moneyScore += choice.moneyScore
    this.healthScore += choice.healthScore
    this.karmaScore += choice.karmaScore

    let randomIndex = Math.round(Math.random() * (this.cardList.length-1))

    this.currentCard = this.cardList[ randomIndex ]
  }

  // Si le joueur hover à gauche, modifie le boolean
  hoverLeft() {
    this.isHoveringLeft = true
  }

  // Si le joueur hover à droite, modifie le boolean
  hoverRight() {
    this.isHoveringLeft = false  
  }
}
