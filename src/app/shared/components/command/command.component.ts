import { Component, contentChild, contentChildren, Signal } from '@angular/core';
import { CommandInputComponent } from './command-input/command-input.component';
import { CommandItemComponent } from './command-item/command-item.component';

@Component({
  selector: 'app-command',
  standalone: false,
  
  templateUrl: './command.component.html',
  styleUrl: './command.component.scss'
})
export class CommandComponent {
  //#region Propriétés
  /**
   * Propriété search
   * @readonly
   * 
   * Récupère l'élément enfant de type 
   * CommandInputComponent si il existe
   * 
   * @access public
   * @memberof CommandComponent
   * @since 1.0.0
   * 
   * @type {Signal<CommandInputComponent | undefined>} search
   */
  public readonly search: Signal<CommandInputComponent | undefined> = 
    contentChild<CommandInputComponent>(CommandInputComponent);
  //#endregion
}
