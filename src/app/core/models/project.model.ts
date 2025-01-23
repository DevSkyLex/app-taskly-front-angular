import { Entity } from "@core/models/entity.model";
import { SoftDeleteable } from "@core/models/softdeleteable.model";
import { Timestampable } from "@core/models/timestampable.model";
import { Task } from "@core/models/task.model";

/**
 * Interface Project
 * @interface Project
 * 
 * Définit les propriétés communes à tous
 * les projets
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface Project extends Entity, Timestampable, SoftDeleteable {
  //#region Propriétés
  /**
   * Propriété name
   * 
   * Nom du projet
   * 
   * @memberof Project
   * @since 1.0.0
   * 
   * @type {string} name
   */
  name: string;

  /**
   * Propriété description
   * 
   * Description du projet
   * 
   * @memberof Project
   * @since 1.0.0
   * 
   * @type {string} description
   */
  description: string;

  /**
   * Propriété tasks
   * 
   * Liste des tâches du projet
   * 
   * @memberof Project
   * @since 1.0.0
   * 
   * @type {Task[]} tasks
   */
  tasks: Task[];
  //#endregion
}

/**
 * Type NewProject
 * @type NewProject
 * 
 * Type de données pour l'ajout d'un projet
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type NewProject = Omit<Project, 
  | "id"
  | "createdAt" 
  | "updatedAt" 
  | "deletedAt"
>;

/**
 * Type UpdateProject
 * @type UpdateProject
 * 
 * Type de données pour la mise à jour d'un projet
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type UpdateProject = Partial<Omit<Project, 
  | "id"
  | "createdAt" 
  | "updatedAt" 
  | "deletedAt"
>>;