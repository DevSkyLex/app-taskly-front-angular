import { Entity } from "@core/models/entity.model";
import { Timestampable } from "@core/models/timestampable.model";

/**
 * Enum UserRole
 * @enum UserRole
 * 
 * Définit les rôles d'un utilisateur
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export enum UserRole {
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER'
}

/**
 * Interface User
 * @interface User
 * 
 * Définit les propriétés d'un utilisateur
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface User extends Entity, Timestampable {
  //#region Propriétés
  /**
   * Propriété email
   * 
   * Adresse email de l'utilisateur
   * 
   * @memberof User
   * @since 1.0.0
   * 
   * @type {string} email
   */
  email: string;

  /**
   * Propriété firstName
   * 
   * Prénom de l'utilisateur
   * 
   * @memberof User
   * @since 1.0.0
   * 
   * @type {string | undefined} firstName
   */
  firstName?: string;

  /**
   * Propriété lastName
   * 
   * Nom de l'utilisateur
   * 
   * @memberof User
   * @since 1.0.0
   * 
   * @type {string | undefined} lastName
   */
  lastName?: string;

  /**
   * Propriété phone
   * 
   * Numéro de téléphone de l'utilisateur
   * 
   * @memberof User
   * @since 1.0.0
   * 
   * @type {string | undefined} phone
   */
  phone?: string;

  /**
   * Propriété roles
   * 
   * Rôles de l'utilisateur
   * 
   * @memberof User
   * @since 1.0.0
   * 
   * @type {UserRole[]} roles
   */
  roles: UserRole[];
  //#endregion
}

/**
 * Type NewUserPayload
 * @type NewUserPayload
 * 
 * Définit les propriétés d'un nouvel utilisateur
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type NewUserPayload = Omit<User, 
  | 'id' 
  | 'createdAt' 
  | 'updatedAt'
  | 'roles'
>;

/**
 * Type UpdateUserPayload
 * @type UpdateUserPayload
 * 
 * Définit les propriétés d'un utilisateur à mettre à jour
 * 
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type UpdateUserPayload = Partial<Omit<User, 
  | 'id' 
  | 'createdAt' 
  | 'updatedAt'
  | 'email'
  | 'roles'
>>;



