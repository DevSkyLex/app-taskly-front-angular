import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { selectIsAuthenticated } from "../stores/auth/auth.selectors";
import { map } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  //#region Propriétés
  /**
   * Propriété router
   * @readonly
   * 
   * Routeur de l'application
   * 
   * @access private
   * @memberof AuthGuard
   * @since 1.0.0
   * 
   * @type {Router} router - Routeur de l'application
   */
  private readonly router: Router = 
    inject<Router>(Router);

  /**
   * Propriété store
   * @readonly
   * 
   * Store de l'application
   * 
   * @access private
   * @memberof AuthGuard
   * @since 1.0.0
   * 
   * @type {Store} store - Store de l'application
   */
  private readonly store: Store =
    inject<Store>(Store);
  //#endregion

  //#region Méthodes
  /**
   * Méthode canActivate
   * 
   * Vérifie si l'utilisateur est connecté
   * 
   * @access public
   * @memberof AuthGuard
   * @since 1.0.0
   * 
   * @param {ActivatedRouteSnapshot} route - Snapshot de la route
   * @param {RouterStateSnapshot} state - Snapshot de l'état de la route
   * 
   * @returns {MaybeAsync<GuardResult>} - Résultat de la vérification
   */
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.store.select(selectIsAuthenticated).pipe(
      map((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.router.navigate(["/"]);
          return false;
        }
        return true;
      })
    );
  }
  //#endregion
}
