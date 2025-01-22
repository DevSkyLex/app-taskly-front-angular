import { Component, computed, contentChildren, input, InputSignal, Signal, signal } from '@angular/core';
import { CommandItemComponent } from '../command-item/command-item.component';

@Component({
  selector: 'app-command-group',
  standalone: false,
  
  templateUrl: './command-group.component.html',
  styleUrl: './command-group.component.scss'
})
export class CommandGroupComponent {
  //#region Propriétés
  /**
   * Propriété heading
   * @readonly
   * 
   * Définit le titre du groupe 
   * de commandes
   * 
   * @access public
   * @memberof CommandGroupComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string | null>} heading
   */
  public readonly heading: InputSignal<string | null> = 
    input<string | null>(null);

  /**
   * Propriété items
   * @readonly
   * 
   * Récupère la liste des éléments
   * de commandes
   * 
   * @access public
   * @memberof CommandGroupComponent
   * @since 1.0.0
   * 
   * @type {Signal<readonly CommandItemComponent[]>} items
   */
  private readonly items: Signal<readonly CommandItemComponent[]> = 
    contentChildren<CommandItemComponent>(CommandItemComponent);

  /**
   * Propriété empty
   * @readonly
   * 
   * Détermine si le groupe de commandes
   * est vide
   * 
   * @access public
   * @memberof CommandGroupComponent
   * @since 1.0.0
   * 
   * @type {Signal<boolean>} empty
   */
  public readonly empty: Signal<boolean> = computed(() => {
    const items: readonly CommandItemComponent[] = this.items();

    if (items.length === 0) 
      return true;

    return items.every(item => item.match() === false);
  });
  //#endregion
}
