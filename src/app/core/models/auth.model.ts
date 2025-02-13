import { User } from "./user.model";

/**
 * Interface AuthResponse
 * @interface AuthResponse
 * 
 * Définit la réponse de connexion
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface AuthResponse {
  //#region Propriétés
  /**
   * Propriété token
   * 
   * Token JWT
   * 
   * @memberof AuthResponse
   * @since 1.0.0
   * 
   * @type {AuthJWTToken} token
   */
  token: AuthJWTToken;

  /**
   * Propriété refreshToken
   * 
   * Token de rafraîchissement
   * 
   * @memberof AuthResponse
   * @since 1.0.0
   * 
   * @type {AuthRefreshToken} refreshToken
   */
  refreshToken: AuthRefreshToken;
  //#endregion
}

/**
 * Type AuthJWTToken
 * @type AuthJWTToken
 * 
 * Définit un token JWT
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type AuthJWTToken = string;

/**
 * Type AuthRefreshToken
 * @type AuthRefreshToken
 * 
 * Définit un token de rafraîchissement
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type AuthRefreshToken = string;

/**
 * Type AuthCredentialsPayload
 * @type AuthCredentialsPayload
 * 
 * Définit les informations de connexion
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type AuthCredentialsPayload = Pick<User,
  | "email"
> & { password: string };

/**
 * Type AuthRegisterPayload
 * @type AuthRegisterPayload
 * 
 * Définit les informations d'inscription
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type AuthRegisterPayload = Pick<User,
  | "email"
  | "firstName"
  | "lastName"
> & { password: string };