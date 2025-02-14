import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

/**
 * Sélecteur selectAuthState
 * 
 * Sélectionne l'état du store de l'authentification
 * 
 * @type {MemoizedSelector<object, AuthState, DefaultProjectorFn<AuthState>>} selectAuthState
 */
export const selectAuthState: MemoizedSelector<
  object,
  AuthState,
  DefaultProjectorFn<AuthState>
> = createFeatureSelector<AuthState>("auth");

/**
 * Sélecteur selectToken
 * 
 * Sélectionne le token
 * 
 * @type {MemoizedSelector<object, string, (s1: AuthState) => string>} selectToken
 */
export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);

/**
 * Sélecteur selectUser
 * 
 * Sélectionne l'utilisateur
 * 
 * @type {MemoizedSelector<object, User, (s1: AuthState) => User>} selectUser
 */
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

/**
 * Sélecteur selectOperation
 * 
 * Sélectionne l'opération
 * 
 * @type {MemoizedSelector<object, Operation, (s1: AuthState) => Operation>} selectOperation
 */
export const selectOperation = createSelector(
  selectAuthState,
  (state) => state.operation
);

/**
 * Sélecteur selectLoading
 * 
 * Sélectionne l'état de chargement
 * 
 * @type {MemoizedSelector<object, boolean, (s1: Operation) => boolean>} selectLoading
 */
export const selectLoading = createSelector(
  selectOperation,
  (operation) => operation.loading
);

/**
 * Sélecteur selectError
 * 
 * Sélectionne l'erreur
 * 
 * @type {MemoizedSelector<object, string | null, (s1: Operation) => string | null>} selectError
 */
export const selectError = createSelector(
  selectOperation,
  (operation) => operation.error
);

/**
 * Sélecteur selectSuccess
 * 
 * Sélectionne le succès
 * 
 * @type {MemoizedSelector<object, string | null, (s1: Operation) => string | null>} selectSuccess
 */
export const selectSuccess = createSelector(
  selectOperation,
  (operation) => operation.success
);

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);
