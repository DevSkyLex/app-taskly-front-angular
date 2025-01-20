/**
 * Interface SoftDeleteable
 * @interface SoftDeleteable
 * 
 * Définit les propriétés communes à toutes
 * les entités soft deleteable
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface SoftDeleteable {
  //#region Propriétés
  /**
   * Propriété deleted
   * 
   * Indique si l'entité a été supprimée
   * 
   * @memberof SoftDeleteable
   * @since 1.0.0
   * 
   * @type {boolean} deleted
   */
  deleted: boolean;
  //#endregion
}