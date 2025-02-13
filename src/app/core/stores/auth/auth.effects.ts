import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@app/core/services/api/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { catchError, map, Observable, of, switchMap, tap } from "rxjs";
import * as AuthActions from "./auth.actions";
import * as AuthSelectors from "./auth.selectors";

@Injectable()
export class AuthEffects {
  //#region Propriétés
  /**
   * Propriété router
   * @readonly
   * 
   * Service de gestion des routes
   * 
   * @access private
   * @memberof AuthEffects
   * @since 1.0.0
   * 
   * @type {Router} router
   */
  private readonly router: Router =
    inject<Router>(Router);

  /**
   * Propriété authService
   * @readonly
   * 
   * Service de gestion de l'authentification
   * 
   * @access private
   * @memberof AuthEffects
   * @since 1.0.0
   * 
   * @type {AuthService} authService
   */
  private readonly authService: AuthService =
    inject<AuthService>(AuthService);

  /**
   * Propriété actions$
   * @readonly
   * 
   * Observables des actions
   * 
   * @access private
   * @memberof AuthEffects
   * @since 1.0.0
   * 
   * @type {Actions} actions$
   */
  private readonly actions$: Actions = 
    inject<Actions>(Actions);
  //#endregion

  //#region Effects
  /**
   * Effet login$
   * 
   * Permet de gérer l'authentification 
   * de l'utilisateur grâce au service 
   * AuthService
   * 
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} login$
   */
  public login$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    switchMap((action) => this.authService.login(action.payload).pipe(
      map((data) => AuthActions.loginSuccess({ 
        data: data, 
        success: "The login was successful"
      })),
      catchError((error) => of(AuthActions.loginFailure({ 
        error: error 
      }))
    )))
  ));

  /**
   * Effet loginSuccess$
   * 
   * Permet de gérer le succès de 
   * l'authentification de l'utilisateur
   * 
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} loginSuccess$
   */
  public loginSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    map((action) => AuthActions.loadAccount()),
    tap(() => this.router.navigate(["/"]))
  ));

  /**
   * Effet loginFailure$
   * 
   * Permet de gérer l'échec de 
   * l'authentification de l'utilisateur
   * 
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} loginFailure$
   */
  public loginFailure$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginFailure),
    tap(() => this.router.navigate(["/auth/login"]))
  ), { dispatch: false });

  /**
   * Effet loadAccount$
   * 
   * Permet de charger le compte
   * de l'utilisateur grâce au service
   * AuthService
   * 
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} loadAccount$
   */
  public loadAccount$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loadAccount),
    switchMap(() => this.authService.account().pipe(
      map((data) => AuthActions.loadAccountSuccess({ 
        data: data,
        success: "The account was loaded"
      })),
      catchError((error) => of(AuthActions.loadAccountFailure({ 
        error: "The account could not be loaded"
      }))
    )))
  ));

  /**
   * Effet loadAccountSuccess$
   * 
   * Permet de gérer le succès du 
   * chargement du compte de l'utilisateur
   * 
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} loadAccountSuccess$
   */
  public loadAccountSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loadAccountSuccess)
  ), { dispatch: false });

  /**
   * Effet loadAccountFailure$
   * 
   * Permet de gérer l'échec du 
   * chargement du compte de l'utilisateur
   * 
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} loadAccountFailure$
   */
  public loadAccountFailure$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loadAccountFailure)
  ), { dispatch: false });

  /**
   * Effet register$
   * 
   * Permet de gérer l'inscription 
   * de l'utilisateur grâce au service 
   * AuthService
   * 
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} register$
   */
  public register$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.register),
    switchMap((action) => this.authService.register(action.payload).pipe(
      map((data) => AuthActions.registerSuccess({ 
        data: data, 
        success: "The registration was successful"
      })),
      catchError((error) => of(AuthActions.registerFailure({ 
        error: error 
      }))
    )))
  ));

  /**
   * Effet registerSuccess$
   * 
   * Permet de gérer le succès de 
   * l'inscription de l'utilisateur
   * 
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} registerSuccess$
   */
  public registerSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.registerSuccess),
    tap(() => this.router.navigate(["/auth/login"]))
  ), { dispatch: false });

  /**
   * Effet registerFailure$
   * 
   * Permet de gérer l'échec de 
   * l'inscription de l'utilisateur
   * 
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} registerFailure$
   */
  public registerFailure$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.registerFailure),
    tap(() => this.router.navigate(["/auth/register"]))
  ), { dispatch: false });

  /**
   * Effet logout$
   * 
   * Permet de gérer la déconnexion 
   * de l'utilisateur
   * 
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} logout$
   */
  public logout$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => this.router.navigate(["/auth/login"]))
  ), { dispatch: false });

  /**
   * Effet refresh$
   * 
   * Permet de rafraîchir le token 
   * de l'utilisateur
   * 
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} refresh$
   */
  public refresh$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.refresh),
    switchMap(() => this.authService.refresh().pipe(
      map((data) => AuthActions.refreshSuccess({ 
        data: data, 
        success: "The token was refreshed"
      })),
      catchError((error) => of(AuthActions.refreshFailure({ 
        error: error 
      }))
    )))
  ));

  /**
   * Effet refreshSuccess$
   * 
   * Permet de gérer le succès du 
   * rafraîchissement du token de 
   * l'utilisateur
   * 
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} refreshSuccess$
   */
  public refreshSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.refreshSuccess)
  ), { dispatch: false });

  /**
   * Effet refreshFailure$
   * 
   * Permet de gérer l'échec du 
   * rafraîchissement du token de 
   * l'utilisateur
   * 
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} refreshFailure$
   */
  public refreshFailure$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.refreshFailure)
  ), { dispatch: false });
  //#endregion
}