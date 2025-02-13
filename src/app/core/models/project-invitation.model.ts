import { Entity } from "./entity.model";
import { Project } from "./project.model";
import { User } from "./user.model";

/**
 * Interface ProjectInvitation
 * @interface ProjectInvitation
 * 
 * Définit les propriétés d'une invitation de projet
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <ontact@valentin-fortin.pro>
 */
export interface ProjectInvitation extends Entity {
  //#region Propriétés
  /**
   * Propriété invited
   * 
   * Utilisateur invité
   * 
   * @memberof ProjectInvitation
   * @since 1.0.0
   * 
   * @type {Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>} invited
   */
  invited: Pick<User, 
    | 'id' 
    | 'firstName' 
    | 'lastName' 
    | 'email'
  >;

  /**
   * Propriété sender
   * 
   * Utilisateur envoyant l'invitation
   * 
   * @memberof ProjectInvitation
   * @since 1.0.0
   * 
   * @type {Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>} sender
   */
  sender: Pick<User,
    | 'id'
    | 'firstName'
    | 'lastName'
    | 'email'
  >;

  /**
   * Propriété project
   * 
   * Projet auquel l'utilisateur est invité
   * 
   * @memberof ProjectInvitation
   * @since 1.0.0
   * 
   * @type {Pick<Project, 'id' | 'name' | 'description'>} project
   */
  project: Pick<Project,
    | 'id'
    | 'name'
    | 'description'
  >;

  /**
   * Propriété status
   * 
   * Statut de l'invitation
   * 
   * @memberof ProjectInvitation
   * @since 1.0.0
   * 
   * @type {ProjectInvitationStatus} status
   */
  status: ProjectInvitationStatus;

  /**
   * Propriété expiresAt
   * 
   * Date d'expiration de l'invitation
   * 
   * @memberof ProjectInvitation
   * @since 1.0.0
   * 
   * @type {Date} expiresAt
   */
  expiresAt: Date;
  //#endregion
}

/**
 * Enum ProjectInvitationStatus
 * @enum ProjectInvitationStatus
 * 
 * Définit les statuts d'une invitation de projet
 * 
 * @version 1.0.0
 * @since 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export enum ProjectInvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REFUSED = 'REFUSED'
}