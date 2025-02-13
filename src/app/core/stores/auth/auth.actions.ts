import { UpdateUserAvatarPayload, UpdateUserPayload, User } from "@app/core/models/user.model";
import { ActionCreator, createAction, props } from "@ngrx/store";
import { AuthCredentialsPayload, AuthRegisterPayload, AuthResponse } from "@app/core/models/auth.model";

/**
 * Action login
 * 
 * Connexion de l'utilisateur
 * 
 * @type {ActionCreator} login
 */
export const login = createAction(
  '[Auth] Login',
  props<{ payload: AuthCredentialsPayload }>()
);

/**
 * Action loginSuccess
 * 
 * Connexion de l'utilisateur avec succès
 * 
 * @type {ActionCreator} loginSuccess
 */
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ data: AuthResponse, success: string }>()
);

/**
 * Action loginFailure
 * 
 * Echec de la connexion de l'utilisateur
 * 
 * @type {ActionCreator} loginFailure
 */
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

/**
 * Action register
 * 
 * Inscription de l'utilisateur
 * 
 * @type {ActionCreator} register
 */
export const register = createAction(
  '[Auth] Register',
  props<{ payload: AuthRegisterPayload }>()
);

/**
 * Action registerSuccess
 * 
 * Inscription de l'utilisateur avec succès
 * 
 * @type {ActionCreator} registerSuccess
 */
export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ data: User, success: string }>()
);

/**
 * Action registerFailure
 * 
 * Echec de l'inscription de l'utilisateur
 * 
 * @type {ActionCreator} registerFailure
 */
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

/**
 * Action logout
 * 
 * Déconnexion de l'utilisateur
 * 
 * @type {ActionCreator} logout
 */
export const logout = createAction(
  '[Auth] Logout'
);

/**
 * Action logoutSuccess
 * 
 * Déconnexion de l'utilisateur avec succès
 * 
 * @type {ActionCreator} logoutSuccess
 */
export const logoutSuccess = createAction(
  '[Auth] Logout Success',
  props<{ success: string }>()
);

/**
 * Action logoutFailure
 * 
 * Echec de la déconnexion de l'utilisateur
 * 
 * @type {ActionCreator} logoutFailure
 */
export const logoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: string }>()
);

/**
 * Action refresh
 * 
 * Rafraîchissement du token
 * 
 * @type {ActionCreator} refresh
 */
export const refresh = createAction(
  '[Auth] Refresh'
);

/**
 * Action refreshSuccess
 * 
 * Rafraîchissement du token avec succès
 * 
 * @type {ActionCreator} refreshSuccess
 */
export const refreshSuccess = createAction(
  '[Auth] Refresh Success',
  props<{ data: AuthResponse, success: string }>()
);

/**
 * Action refreshFailure
 * 
 * Echec du rafraîchissement du token
 * 
 * @type {ActionCreator} refreshFailure
 */
export const refreshFailure = createAction(
  '[Auth] Refresh Failure',
  props<{ error: string }>()
);

/**
 * Action loadAccount
 * 
 * Chargement du compte de l'utilisateur
 * 
 * @type {ActionCreator} loadAccount
 */
export const loadAccount = createAction(
  '[Auth] Load Account'
);

/**
 * Action loadAccountSuccess
 * 
 * Chargement du compte de l'utilisateur avec succès
 * 
 * @type {ActionCreator} loadAccountSuccess
 */
export const loadAccountSuccess = createAction(
  '[Auth] Load Account Success',
  props<{ data: User, success: string }>()
);

/**
 * Action loadAccountFailure
 * 
 * Echec du chargement du compte de l'utilisateur
 * 
 * @type {ActionCreator} loadAccountFailure
 */
export const loadAccountFailure = createAction(
  '[Auth] Load Account Failure',
  props<{ error: string }>()
);

/**
 * Action updateAccountAvatar
 * 
 * Mise à jour de l'avatar de l'utilisateur
 * 
 * @type {ActionCreator} updateAccountAvatar
 */
export const updateAccount = createAction(
  '[Auth] Update Account',
  props<{ payload: UpdateUserPayload }>()
);

/**
 * Action updateAccountSuccess
 * 
 * Mise à jour de l'avatar de l'utilisateur
 * 
 * @type {ActionCreator} updateAccountSuccess
 */
export const updateAccountSuccess = createAction(
  '[Auth] Update Account Success',
  props<{ data: User, success: string }>()
);

/**
 * Action updateAccountFailure
 * 
 * Echec de la mise à jour de l'avatar de l'utilisateur
 * 
 * @type {ActionCreator} updateAccountFailure
 */
export const updateAccountFailure = createAction(
  '[Auth] Update Account Failure',
  props<{ error: string }>()
);

/**
 * Action updateAccountAvatar
 * 
 * Mise à jour de l'avatar de l'utilisateur
 * 
 * @type {ActionCreator} updateAccountAvatar
 */
export const updateAccountAvatar = createAction(
  '[Auth] Update Account Avatar',
  props<{ payload: UpdateUserAvatarPayload }>()
);

/**
 * Action updateAccountAvatarSuccess
 * 
 * Mise à jour de l'avatar de l'utilisateur avec succès
 * 
 * @type {ActionCreator} updateAccountAvatarSuccess
 */
export const updateAccountAvatarSuccess = createAction(
  '[Auth] Update Account Avatar Success',
  props<{ data: User, success: string }>()
);

/**
 * Action updateAccountAvatarFailure
 * 
 * Echec de la mise à jour de l'avatar de l'utilisateur
 * 
 * @type {ActionCreator} updateAccountAvatarFailure
 */
export const updateAccountAvatarFailure = createAction(
  '[Auth] Update Account Avatar Failure',
  props<{ error: string }>()
);
