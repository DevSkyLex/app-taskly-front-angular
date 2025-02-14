import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";

export type JWTPayload = {
  sub: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class JWTService {
  //#region Méthodes
  /**
   * Méthode decode
   * 
   * Permet de décoder un token JWT
   * 
   * @access public
   * @memberof JWTService
   * @since 1.0.0
   * 
   * @param {string} token Token JWT à décoder
   * 
   * @returns {JWTPayload | null} Payload du token JWT
   */
  public decode(token: string): JWTPayload | null {
    try {
      return jwtDecode<JWTPayload>(token);
    }
    catch (error) {
      console.error('An error occurred while decoding the JWT token', error);
      return null;
    }
  }

  /**
   * Méthode isValid
   * 
   * Permet de vérifier la validité d'un token JWT
   * 
   * @access public
   * @memberof JWTService
   * @since 1.0.0
   * 
   * @param {string} token Token JWT à vérifier
   * 
   * @returns {boolean} Validité du token JWT
   */
  public isValid(token: string): boolean {
    const payload: JWTPayload | null = this.decode(token);

    if (!payload) {
      return false;
    }

    const now: number = Date.now() / 1000;

    return payload.exp > now;
  }
  //#endregion
}