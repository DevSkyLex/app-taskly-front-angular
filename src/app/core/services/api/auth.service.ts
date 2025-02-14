import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { JsonldService } from "./jsonld.service";
import { AuthCredentialsPayload, AuthRegisterPayload, AuthResponse } from "@app/core/models/auth.model";
import { Observable } from "rxjs";
import { JsonLdResponse } from "@app/core/models/json-ld.model";
import { UpdateUserAvatarPayload, UpdateUserPayload, User } from "@app/core/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //#region Propriétés
  /**
   * Propriété API_URL
   * @readonly
   * @static
   * 
   * URL de l'API de gestion de l'authentification
   * 
   * @access private
   * @memberof AuthService
   * @since 1.0.0
   * 
   * @type {string} API_URL
   */
  private static readonly API_URL: string = 
    environment.api.taskly.url;

  /**
   * Propriété httpClient
   * @readonly
   * 
   * Service de gestion des requêtes HTTP
   * 
   * @access private
   * @memberof AuthService
   * @since 1.0.0
   * 
   * @type {HttpClient} httpClient
   */
  private readonly httpClient: HttpClient =
    inject<HttpClient>(HttpClient);

  /**
   * Propriété jsonldService
   * @readonly
   * 
   * Service de gestion des requêtes JSON-LD
   * 
   * @access private
   * @memberof AuthService
   * @since 1.0.0
   * 
   * @type {JsonldService} jsonldService
   */
  private readonly jsonldService: JsonldService =
    inject<JsonldService>(JsonldService);
  //#endregion

  //#region Méthodes
  /**
   * Méthode login
   * 
   * Permet de se connecter à l'application
   * 
   * @access public
   * @memberof AuthService
   * @since 1.0.0
   * 
   * @param {AuthCredentialsPayload} payload Informations de connexion
   * 
   * @returns {Observable<AuthResponse>} Réponse de la requête
   */
  public login(payload: AuthCredentialsPayload): Observable<AuthResponse> {
    const url: string = `${AuthService.API_URL}/auth/login`;
    return this.httpClient.post<AuthResponse>(url, payload, {
      withCredentials: true,
    });
  }

  /**
   * Méthode refresh
   * 
   * Permet de rafraîchir le token
   * 
   * @access public
   * @memberof AuthService
   * @since 1.0.0
   * 
   * @returns {Observable<AuthResponse>} Réponse de la requête
   */
  public refresh(): Observable<AuthResponse> {
    const url: string = `${AuthService.API_URL}/auth/refresh`;
    return this.httpClient.post<AuthResponse>(url, null, {
      withCredentials: true,
    });
  }

  /**
   * Méthode logout
   * 
   * Permet de se déconnecter de l'application
   * 
   * @access public
   * @memberof AuthService
   * @since 1.0.0
   * 
   * @returns {Observable<void>} Réponse de la requête
   */
  public logout(): Observable<void> {
    const url: string = `${AuthService.API_URL}/auth/logout`;
    return this.httpClient.post<void>(url, {});
  }

  /**
   * Méthode register
   * 
   * Permet de s'inscrire à l'application
   * 
   * @access public
   * @memberof AuthService
   * @since 1.0.0
   * 
   * @param {AuthRegisterPayload} payload Informations d'inscription
   * 
   * @returns {Observable<AuthResponse>} Réponse de la requête
   */
  public register(payload: AuthRegisterPayload): Observable<User> {
    const url: string = `${AuthService.API_URL}/auth/register`;
    return this.httpClient.post<User>(url, payload);
  }

  /**
   * Méthode account
   * 
   * Permet de récupérer les informations 
   * de l'utilisateur
   * 
   * @access public
   * @memberof AuthService
   * @since 1.0.0
   * 
   * @returns {Observable<User>} Utilisateur
   */
  public account(): Observable<User> {
    const url: string = `${AuthService.API_URL}/account/me`;
    return this.httpClient.get<User>(url);
  }

  /**
   * Méthode updateAccount
   * 
   * Permet de mettre à jour les informations
   * de l'utilisateur
   * 
   * @access public
   * @memberof AuthService
   * @since 1.0.0
   * 
   * @param {UpdateUserPayload} payload Informations à mettre à jour
   * 
   * @returns {Observable<User>} Utilisateur
   */
  public updateAccount(payload: UpdateUserPayload): Observable<User> {
    const url: string = `${AuthService.API_URL}/account/me`;
    return this.httpClient.patch<User>(url, payload);
  }

  /**
   * Méthode updateAccountAvatar
   * 
   * Permet de mettre à jour l'avatar de 
   * l'utilisateur en utilisant "multipart/form-data"
   * 
   * @access public
   * @memberof AuthService
   * @since 1.0.0
   * 
   * @param {UpdateUserAvatarPayload} payload Informations à mettre à jour
   * 
   * @returns {Observable<User>} Utilisateur
   */
  public updateAccountAvatar(payload: UpdateUserAvatarPayload): Observable<User> {
    const url: string = `${AuthService.API_URL}/account/me/avatar`;
    const formData: FormData = new FormData();

    if (payload.avatar) {
      formData.append('avatar', payload.avatar);
    }
    
    return this.httpClient.post<User>(url, formData);
  }
  //#endregion
}