import { Entity } from "./entity.model";
import { Project } from "./project.model";
import { User } from "./user.model";

/**
 * Interface ProjectMember
 * @interface ProjectMember
 * 
 * Définit les propriétés d'un membre de projet
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface ProjectMember extends Entity {
  //#region Propriétés
  /**
   * Propriété member
   * 
   * Utilisateur membre du projet
   * 
   * @memberof ProjectMember
   * @since 1.0.0
   * 
   * @type {Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>} member
   */
  member: Pick<User,
    | 'id'
    | 'firstName'
    | 'lastName'
    | 'email'
  >;

  /**
   * Propriété project
   * 
   * Projet auquel appartient le membre
   * 
   * @memberof ProjectMember
   * @since 1.0.0
   * 
   * @type {Pick<Project, 'id' | 'name'>} project
   */
  project: Pick<Project,
    | 'id'
    | 'name'
  >;

  /**
   * Propriété role
   * 
   * Rôle du membre dans le projet
   * 
   * @memberof ProjectMember
   * @since 1.0.0
   * 
   * @type {ProjectRole} role
   */
  role: ProjectRole;
  //#endregion
}

/**
 * Enum ProjectRole
 * @enum ProjectRole
 * 
 * Définit les rôles d'un membre de projet
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>$
 */
export enum ProjectRole {
  VIEWER = 'VIEWER',
  MANAGER = 'MANAGER',
  CONTRIBUTOR = 'CONTRIBUTOR'
}