import { AuthJWTToken } from "@app/core/models/auth.model";
import { StoreOperation } from "@app/core/models/store.model";
import { User } from "@app/core/models/user.model";

/**
 * Interface AuthState
 * @interface AuthState
 * 
 * Définit l'état du store pour l'authentification
 * 
 * @memberof AuthState
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface AuthState {
  //#region Propriétés
  /**
   * Propriété token
   * 
   * Token JWT
   * 
   * @memberof AuthState
   * @since 1.0.0
   * 
   * @type {AuthJWTToken | null} token
   */
  token: AuthJWTToken | null;

  /**
   * Propriété user
   * 
   * Utilisateur connecté
   * 
   * @memberof AuthState
   * @since 1.0.0
   * 
   * @type {User | null} user
   */
  user: User | null;

  /**
   * Propriété isAuthenticated
   * 
   * Indique si l'utilisateur est authentifié
   * 
   * @memberof AuthState
   * @since 1.0.0
   * 
   * @type {boolean} isAuthenticated
   */
  isAuthenticated: boolean;

  /**
   * Propriété operation
   * 
   * Opération en cours
   * 
   * @memberof AuthState
   * @since 1.0.0
   * 
   * @type {StoreOperation} operation
   */
  operation: StoreOperation;
  //#endregion
}

/**
 * InitialState 
 * 
 * Etat initial du store
 * 
 * @type {AuthState} initialState
 */
export const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  operation: {
    loading: false,
    error: null,
    success: null
  }
};