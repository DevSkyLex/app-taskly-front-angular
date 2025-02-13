import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";
import * as AuthActions from "./auth.actions";

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    operation: {
      loading: true,
      error: null,
      success: null
    }
  })),
  on(AuthActions.loginSuccess, (state, { data, success }) => ({
    ...state,
    token: data.token,
    isAuthenticated: true,
    operation: {
      loading: false,
      error: null,
      success: success
    }
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    operation: {
      loading: false,
      error: error,
      success: null
    }
  })),
  on(AuthActions.register, (state) => ({
    ...state,
    operation: {
      loading: true,
      error: null,
      success: null
    }
  })),
  on(AuthActions.registerSuccess, (state, { data, success }) => ({
    ...state,
    user: data,
    operation: {
      loading: false,
      error: null,
      success: success
    }
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    operation: {
      loading: false,
      error: error,
      success: null
    }
  })),
  on(AuthActions.refresh, (state) => ({
    ...state,
    operation: {
      loading: true,
      error: null,
      success: null
    }
  })),
  on(AuthActions.refreshSuccess, (state, { data }) => ({
    ...state,
    token: data.token,
    isAuthenticated: true,
    operation: {
      loading: false,
      error: null,
      success: null
    }
  })),
  on(AuthActions.refreshFailure, (state, { error }) => ({
    ...state,
    operation: {
      loading: false,
      error: error,
      success: null
    }
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    token: null,
    user: null,
    isAuthenticated: false
  })),
  on(AuthActions.logoutSuccess, (state, { success }) => ({
    ...state,
    token: null,
    user: null,
    isAuthenticated: false,
    operation: {
      loading: false,
      error: null,
      success: success
    }
  })),
  on(AuthActions.logoutFailure, (state, { error }) => ({
    ...state,
    operation: {
      loading: false,
      error: error,
      success: null
    }
  })),
  on(AuthActions.loadAccount, (state) => ({
    ...state,
    operation: {
      loading: true,
      error: null,
      success: null
    }
  })),
  on(AuthActions.loadAccountSuccess, (state, { data }) => ({
    ...state,
    user: data,
    operation: {
      loading: false,
      error: null,
      success: null
    }
  })),
  on(AuthActions.loadAccountFailure, (state, { error }) => ({
    ...state,
    operation: {
      loading: false,
      error: error,
      success: null
    }
  })),
  on(AuthActions.updateAccount, (state) => ({
    ...state,
    operation: {
      loading: true,
      error: null,
      success: null
    }
  })),
  on(AuthActions.updateAccountSuccess, (state, { data, success }) => ({
    ...state,
    user: data,
    operation: {
      loading: false,
      error: null,
      success: success
    }
  })),
  on(AuthActions.updateAccountFailure, (state, { error }) => ({
    ...state,
    operation: {
      loading: false,
      error: error,
      success: null
    }
  })),
  on(AuthActions.updateAccountAvatar, (state) => ({
    ...state,
    operation: {
      loading: true,
      error: null,
      success: null
    }
  })),
  on(AuthActions.updateAccountAvatarSuccess, (state, { data, success }) => ({
    ...state,
    user: data,
    operation: {
      loading: false,
      error: null,
      success: success
    }
  })),
  on(AuthActions.updateAccountAvatarFailure, (state, { error }) => ({
    ...state,
    operation: {
      loading: false,
      error: error,
      success: null
    }
  }))
);