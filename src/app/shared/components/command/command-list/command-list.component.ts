import { Component, computed, contentChildren, Signal } from '@angular/core';
import { CommandItemComponent } from '../command-item/command-item.component';

@Component({
  selector: 'app-command-list',
  standalone: false,
  templateUrl: './command-list.component.html',
  styleUrl: './command-list.component.scss',
})
export class CommandListComponent {
  //#region Propriétés
  /**
   * Propriété items
   * @readonly
   *
   * Récupère la liste des éléments
   * de commandes
   *
   * @access public
   * @memberof CommandListComponent
   * @since 1.0.0
   *
   * @type {Signal<readonly CommandItemComponent[]>} items
   */
  private readonly items: Signal<readonly CommandItemComponent[]> =
    contentChildren<CommandItemComponent>(CommandItemComponent, { descendants: true });

  /**
   * Propriété empty
   * @readonly
   *
   * Détermine si la liste de commandes
   * est vide
   *
   * @access public
   * @memberof CommandListComponent
   * @since 1.0.0
   *
   * @type {Signal<boolean>} empty
   */
  public readonly empty: Signal<boolean> = computed(() => {
    const items: readonly CommandItemComponent[] = this.items();

    if (items.length === 0) return true;

    return items.every((item) => item.match() === false);
  });
  //#endregion
}
