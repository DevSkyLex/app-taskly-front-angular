/**
 * Type JsonLdRequestOptions
 * @type JsonLdRequestOptions
 * 
 * Définit des options de requête JSON-LD
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type JsonLdRequestOptions = {
  filters?: JsonLdFilters;
  pagination?: JsonLdPagination;
};

/**
 * Type JsonLdPagination
 * @type JsonLdPagination
 * 
 * Définit une pagination JSON-LD
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type JsonLdPagination = {
  page: number;
  itemsPerPage: number;
};

/**
 * Type JsonLdFilters
 * @type JsonLdFilters
 * 
 * Définit des filtres JSON-LD
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type JsonLdFilters = {
  [key: string]: 
    | string 
    | number 
    | boolean 
    | (
      | string 
      | number 
      | boolean
    )[];
  [key: `order[${string}]`]: 'asc' | 'desc';
};

/**
 * Type JsonLdView
 * @type JsonLdView
 * 
 * Définit une vue JSON-LD
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type JsonLdView = {
  //#region Propriétés
  /**
   * Propriété first
   * 
   * Lien vers la première page
   * 
   * @memberof JsonLdView
   * @since 1.0.0
   * 
   * @type {string} first
   */
  first?: string;

  /**
   * Propriété last
   * 
   * Lien vers la dernière page
   * 
   * @memberof JsonLdView
   * @since 1.0.0
   * 
   * @type {string} last
   */
  last?: string;

  /**
   * Propriété next
   * 
   * Lien vers la page suivante
   * 
   * @memberof JsonLdView
   * @since 1.0.0
   * 
   * @type {string} next
   */
  next?: string;

  /**
   * Propriété previous
   * 
   * Lien vers la page précédente
   * 
   * @memberof JsonLdView
   * @since 1.0.0
   * 
   * @type {string} previous
   */
  previous?: string;
  //#endregion
}

/**
 * Type JsonLdSearch
 * @type JsonLdSearch
 * 
 * Définit une recherche JSON-LD
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type JsonLdSearch = {
  //#region Propriétés
  /**
   * Propriété template
   * 
   * Modèle de la recherche
   * 
   * @memberof JsonLdSearch
   * @since 1.0.0
   * 
   * @type {string} template
   */
  template: string;

  /**
   * Propriété variableRepresentation
   * 
   * Représentation des variables
   * 
   * @memberof JsonLdSearch
   * @since 1.0.0
   * 
   * @type {string} variableRepresentation
   */
  variableRepresentation: string;

  /**
   * Propriété mapping
   * 
   * Mappages de la recherche
   * 
   * @memberof JsonLdSearch
   * @since 1.0.0
   * 
   * @type {JsonLdSearchMapping[]} mapping
   */
  mapping: JsonLdSearchMapping[];
  //#endregion
}

/**
 * Type JsonLdSearchMapping
 * @type JsonLdSearchMapping
 * 
 * Définit un mappage de recherche JSON-LD
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type JsonLdSearchMapping = {
  //#region Propriétés
  /**
   * Propriété variable
   * 
   * Variable de la recherche
   * 
   * @memberof JsonLdSearchMapping
   * @since 1.0.0
   * 
   * @type {string} variable
   */
  variable: string;

  /**
   * Propriété property
   * 
   * Propriété de la recherche
   * 
   * @memberof JsonLdSearchMapping
   * @since 1.0.0
   * 
   * @type {string} property
   */
  property?: string;

  /**
   * Propriété required
   * 
   * Indique si la propriété est requise
   * 
   * @memberof JsonLdSearchMapping
   * @since 1.0.0
   * 
   * @type {boolean} required
   */
  required: boolean;
  //#endregion
}

/**
 * Interface JsonLdResponse
 * @interface JsonLdResponse
 * 
 * Définit une réponse JSON-LD
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface JsonLdResponse<T> {
  //#region Propriétés
  /**
   * Propriété totalItems
   * 
   * Nombre total d'éléments
   * 
   * @memberof JsonLdResponse
   * @since 1.0.0
   * 
   * @type {number} totalItems
   */
  totalItems: number;

  /**
   * Propriété view
   * 
   * Vue de la réponse
   * 
   * @memberof JsonLdResponse
   * @since 1.0.0
   * 
   * @type {JsonLdView} view
   */
  view?: JsonLdView;

  /**
   * Propriété search
   * 
   * Recherche de la réponse
   * 
   * @memberof JsonLdResponse
   * @since 1.0.0
   * 
   * @type {JsonLdSearch} search
   */
  search?: JsonLdSearch;

  /**
   * Propriété member
   * 
   * Liste des éléments
   * 
   * @memberof JsonLdResponse
   * @since 1.0.0
   * 
   * @type {T[]} member
   */
  member: T[];
  //#endregion
}