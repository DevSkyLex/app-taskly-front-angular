import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { JsonLdRequestOptions, JsonLdResponse } from "@app/core/models/json-ld.model";
import { Project } from "@app/core/models/project.model";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { JsonldService } from "./jsonld.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  //#region Propriétés
  /**
   * Propriété API_URL
   * @readonly
   * @static
   * 
   * URL de l'API de gestion des projets
   * 
   * @access private
   * @memberof ProjectService
   * @since 1.0.0
   * 
   * @type {string} API_URL
   */
  private static readonly API_URL: string = environment.api.taskly.url;

  /**
   * Propriété httpClient
   * @readonly
   * 
   * Service de gestion des requêtes HTTP
   * 
   * @access private
   * @memberof ProjectService
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
   * @memberof ProjectService
   * @since 1.0.0
   * 
   * @type {JsonldService} jsonldService
   */
  private readonly jsonldService: JsonldService =
    inject<JsonldService>(JsonldService);
  //#endregion
  
  //#region Méthodes
  /**
   * Méthode getProjects
   * 
   * Permet de récupérer la liste des projets
   * 
   * @access public
   * @memberof ProjectService
   * @since 1.0.0
   * 
   * @param {JsonLdRequestOptions} options de la requête
   * 
   * @returns {Observable<JsonLdResponse<Project>>} Liste des projets
   */
  public getProjects(options?: JsonLdRequestOptions): Observable<JsonLdResponse<Project>> {
    /**
     * Génération des paramètres de la 
     * requête HTTP grâce au service JSON-LD
     * 
     * @type {HttpParams} params
     * 
     * @see JsonldService#httpParams
     */
    let params: HttpParams = this.jsonldService.httpParams(options);

    /**
     * URL de la requête HTTP
     * 
     * @type {string} url
     */
    const url: string = `${ProjectService.API_URL}/projects`;

    return this.httpClient.get<JsonLdResponse<Project>>(url, { params });
  }

  /**
   * Méthode getProject
   * 
   * Permet de récupérer un projet
   * 
   * @access public
   * @memberof ProjectService
   * @since 1.0.0
   * 
   * @param {string} id Identifiant du projet
   * 
   * @returns {Observable<Project>} Projet
   */
  public getProject(id: string): Observable<Project> {
    /**
     * URL de la requête HTTP
     * 
     * @type {string} url
     */
    const url: string = `${ProjectService.API_URL}/projects/${id}`;

    return this.httpClient.get<Project>(url);
  }

  /**
   * Méthode createProject
   * 
   * Permet de créer un projet
   * 
   * @access public
   * @memberof ProjectService
   * @since 1.0.0
   * 
   * @param {Partial<Project>} project Projet à créer
   * 
   * @returns {Observable<Project>} Projet créé
   */
  public createProject(project: Partial<Project>): Observable<Project> {
    /**
     * URL de la requête HTTP
     * 
     * @type {string} url
     */
    const url: string = `${ProjectService.API_URL}/projects`;

    return this.httpClient.post<Project>(url, project);
  }

  /**
   * Méthode updateProject
   * 
   * Permet de mettre à jour un projet
   * 
   * @access public
   * @memberof ProjectService
   * @since 1.0.0
   * 
   * @param {string} id Identifiant du projet
   * @param {Partial<Project>} project Projet à mettre à jour
   * 
   * @returns {Observable<Project>} Projet mis à jour
   */
  public updateProject(id: string, project: Partial<Project>): Observable<Project> {
    /**
     * URL de la requête HTTP
     * 
     * @type {string} url
     */
    const url: string = `${ProjectService.API_URL}/projects/${id}`;

    return this.httpClient.put<Project>(url, project);
  }

  /**
   * Méthode deleteProject
   * 
   * Permet de supprimer un projet
   * 
   * @access public
   * @memberof ProjectService
   * @since 1.0.0
   * 
   * @param {string} id Identifiant du projet
   * 
   * @returns {Observable<void>} Aucune donnée
   */
  public deleteProject(id: string): Observable<void> {
    /**
     * URL de la requête HTTP
     * 
     * @type {string} url
     */
    const url: string = `${ProjectService.API_URL}/projects/${id}`;

    return this.httpClient.delete<void>(url);
  }
  //#endregion
}