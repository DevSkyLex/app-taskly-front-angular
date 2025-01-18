import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Classe TranslocoHttpLoader (Loader)
 * @class TranslocoHttpLoader
 * 
 * Cette classe permet de charger les fichiers de 
 * traduction de JSVERSE Transloco à partir d'une
 * requête HTTP.
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
@Injectable({ 
  providedIn: 'root' 
})
export class TranslocoHttpLoader implements TranslocoLoader {
  //#region Propriétés
  /**
   * Propriété folder
   * 
   * Dossier des fichiers de traduction
   * 
   * @access private
   * @memberof TranslocoHttpLoader
   * @since 1.0.0
   * 
   * @type {string} folder
   */
  private static readonly folder: string = 'assets/translations';

  /**
   * Propriété extension
   * 
   * Extension des fichiers de traduction
   * 
   * @access private
   * @memberof TranslocoHttpLoader
   * @since 1.0.0
   * 
   * @type {string} extension
   */
  private static readonly extension: string = 'json';

  /**
   * Propriété http
   * 
   * Service HTTP
   * 
   * @access private
   * @memberof TranslocoHttpLoader
   * @since 1.0.0
   * 
   * @type {HttpClient} http
   */
  private readonly http: HttpClient = inject<HttpClient>(HttpClient);
  //#endregion

  //#region Méthodes
  /**
   * Méthode getTranslation
   * 
   * Cette méthode permet de récupérer les traductions
   * 
   * @access public
   * @memberof TranslocoHttpLoader
   * @since 1.0.0
   * 
   * @param {string} lang - Langue
   * 
   * @return {Observable<Translation>} - Traductions
   */
  public getTranslation(lang: string): Observable<Translation> {
    return this.http.get<Translation>(
      `/${TranslocoHttpLoader.folder}/${lang}.${TranslocoHttpLoader.extension}`
    );
  }
  //#endregion
}