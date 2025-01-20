/**
 * Interface Timestampable
 * @interface Timestampable
 * 
 * Définit les propriétés communes à toutes
 * les entités timestampable
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface Timestampable {
  //#region Propriétés
  /**
   * Propriété createdAt
   * 
   * Date de création de l'entité
   * 
   * @memberof Timestampable
   * @since 1.0.0
   * 
   * @type {Date} createdAt
   */
  createdAt: Date;

  /**
   * Propriété updatedAt
   * 
   * Date de mise à jour de l'entité
   * 
   * @memberof Timestampable
   * @since 1.0.0
   * 
   * @type {Date} updatedAt
   */
  updatedAt: Date;
  //#endregion
}