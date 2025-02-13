import { Entity } from "@core/models/entity.model";
import { Timestampable } from "@core/models/timestampable.model";
import { Project } from "@core/models/project.model";

/**
 * Enum TaskStatus
 * @enum TaskStatus
 * 
 * Définit les statuts d'une tâche
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

/**
 * Enum TaskPriority
 * @enum TaskPriority
 * 
 * Définit les priorités d'une tâche
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

/**
 * Interface Task
 * @interface Task
 * 
 * Définit les propriétés d'une tâche
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface Task extends Entity, Timestampable {
  //#region Propriétés
  /**
   * Propriété title
   * 
   * Titre de la tâche
   * 
   * @memberof Task
   * @since 1.0.0
   * 
   * @type {string} title
   */
  title: string;

  /**
   * Propriété description
   * 
   * Description de la tâche
   * 
   * @memberof Task
   * @since 1.0.0
   * 
   * @type {string} description
   */
  description: string;

  /**
   * Propriété assignedTo
   * 
   * Utilisateur assigné à la tâche
   * 
   * @memberof Task
   * @since 1.0.0
   * 
   * @type {string} assignedTo
   */

  /**
   * Propriété status
   * 
   * Statut de la tâche
   * 
   * @memberof Task
   * @since 1.0.0
   * 
   * @type {TaskStatus} status
   */
  status: TaskStatus;

  /**
   * Propriété priority
   * 
   * Priorité de la tâche
   * 
   * @memberof Task
   * @since 1.0.0
   * 
   * @type {TaskPriority} priority
   */
  priority: TaskPriority;

  /**
   * Propriété parent
   * 
   * Tâche parente
   * 
   * @memberof Task
   * @since 1.0.0
   * 
   * @type {Partial<Task>} parent
   */
  parent: Partial<Task>;

  /**
   * Propriété project
   * 
   * Projet de la tâche
   * 
   * @memberof Task
   * @since 1.0.0
   * 
   * @type {Partial<Project>} project
   */
  project: Partial<Project>;

  /**
   * Propriété dueDate
   * 
   * Date d'échéance de la tâche
   * 
   * @memberof Task
   * @since 1.0.0
   * 
   * @type {Date} dueDate
   */
  dueDate: Date;

  /**
   * Propriété children
   * 
   * Liste des tâches enfants
   * 
   * @memberof Task
   * @since 1.0.0
   * 
   * @type {Task[]} children
   */
  children: Task[];
  //#endregion
}

/**
 * Type NewTaskPayload
 * @type NewTaskPayload
 * 
 * Type de données pour ajouter une tâche
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type NewTaskPayload = Omit<Task, 
  | 'id' 
  | 'createdAt' 
  | 'updatedAt'
>;

/**
 * Type UpdateTaskPayload
 * @type UpdateTaskPayload
 * 
 * Type de données pour mettre à jour une tâche
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type UpdateTaskPayload = Partial<Omit<Task, 
  | 'id' 
  | 'createdAt' 
  | 'updatedAt'
>>;