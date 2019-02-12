import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
  
  isHoveringLeft: boolean = false

  constructor() { }

  ngOnInit() {
  }

  hoverLeft() {
    this.isHoveringLeft = true
  }

  hoverRight() {
    this.isHoveringLeft = false  
  }
}
