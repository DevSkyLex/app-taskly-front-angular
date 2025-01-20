/**
 * Interface StoreOperation
 * @interface StoreOperation
 * 
 * Définit les propriétés communes à toutes
 * les opérations de store
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface StoreOperation {
  //#region Propriétés
  /**
   * Propriété loading
   * 
   * Indique si une opération est en cours
   * 
   * @memberof StoreOperation
   * @since 1.0.0
   * 
   * @type {boolean} loading
   */
  loading: boolean;

  /**
   * Propriété error
   * 
   * Message d'erreur
   * 
   * @memberof StoreOperation
   * @since 1.0.0
   * 
   * @type {string | null} error
   */
  error: string | null;

  /**
   * Propriété success
   * 
   * Message de succès
   * 
   * @memberof StoreOperation
   * @since 1.0.0
   * 
   * @type {string | null} success
   */
  success: string | null;
  //#endregion
}