import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonLdRequestOptions } from '@app/core/models/json-ld.model';

@Injectable({
  providedIn: 'root',
})
export class JsonldService {
  //#region Méthodes
  /**
   * Méthode httpParams
   * 
   * Permet de générer les paramètres de la 
   * requête HTTP
   * 
   * @access public
   * @memberof JsonldService
   * @since 1.0.0
   * 
   * @param {JsonLdRequestOptions} options Options de la requête
   * 
   * @returns {HttpParams} Paramètres de la requête HTTP
   */
  public httpParams(options?: JsonLdRequestOptions): HttpParams {
    /**
     * Paramètres de la requête HTTP
     *
     * @type {HttpParams} params
     */
    let params: HttpParams = new HttpParams();

    if (options?.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((v) => (params = params.append(key, v.toString())));
          } else {
            params = params.append(key, value.toString());
          }
        }
      });
    }

    if (options?.pagination?.page) {
      params = params.append('page', options.pagination.page.toString());
    }

    if (options?.pagination?.itemsPerPage) {
      params = params.append(
        'itemsPerPage',
        options.pagination.itemsPerPage.toString()
      );
    }

    return params;
  }
  //#endregion
}
