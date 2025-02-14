import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadAccount } from './core/stores/auth/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  //#region Propriétés
  /**
   * Propriété store
   * @readonly
   * 
   * Store de l'application
   * 
   * @access private
   * @memberof AuthLoginFormComponent
   * @since 1.0.0
   * 
   * @type {Store} store
   */
  private readonly store: Store = 
    inject<Store>(Store);
  //#endregion

  //#region Méthodes
  public ngOnInit(): void {
    this.store.dispatch(loadAccount());
  }
  //#endregion
}
