import { createReducer, on } from "@ngrx/store";
import { initialState } from "@core/stores/project/project.state";
import * as ProjectActions from "@core/stores/project/project.actions";
import { projectAdapter } from "@core/stores/project/project.state";

export const projectReducer = createReducer(
  initialState,
  on(ProjectActions.loadProjects, (state) => ({
    ...state,
    operation: {
      loading: true,
      error: null,
      success: null
    }
  })),

  on(ProjectActions.loadProjectsSuccess, (state, { data, total }) => {
    return projectAdapter.setAll(data, {
      ...state,
      total: total,
      operation: {
        loading: false,
        error: null,
        success: null
      }
    });
  }),

  on(ProjectActions.loadProjectsFailure, (state, { error }) => ({
    ...state,
    operation: {
      loading: false,
      error: error,
      success: null
    }
  })),

  on(ProjectActions.loadProject, (state) => ({
    ...state,
    operation: {
      loading: true,
      error: null,
      success: null
    }
  })),

  on(ProjectActions.loadProjectSuccess, (state, { data }) => {
    return projectAdapter.upsertOne(data, {
      ...state,
      operation: {
        loading: false,
        error: null,
        success: null
      }
    });
  }),

  on(ProjectActions.loadProjectFailure, (state, { error }) => ({
    ...state,
    operation: {
      loading: false,
      error: error,
      success: null
    }
  })),

  on(ProjectActions.addProject, (state) => ({
    ...state,
    operation: {
      loading: true,
      error: null,
      success: null
    }
  })),

  on(ProjectActions.addProjectSuccess, (state, { data }) => {
    return projectAdapter.addOne(data, {
      ...state,
      operation: {
        loading: false,
        error: null,
        success: null
      }
    });
  }),

  on(ProjectActions.addProjectFailure, (state, { error }) => ({
    ...state,
    operation: {
      loading: false,
      error: error,
      success: null
    }
  })),

  on(ProjectActions.updateProject, (state) => ({
    ...state,
    operation: {
      loading: true,
      error: null,
      success: null
    }
  })),

  on(ProjectActions.updateProjectSuccess, (state, { data }) => {
    return projectAdapter.updateOne(data, {
      ...state,
      operation: {
        loading: false,
        error: null,
        success: null
      }
    });
  }),

  on(ProjectActions.updateProjectFailure, (state, { error }) => ({
    ...state,
    operation: {
      loading: false,
      error: error,
      success: null
    }
  })),

  on(ProjectActions.deleteProject, (state) => ({
    ...state,
    operation: {
      loading: true,
      error: null,
      success: null
    }
  })),

  on(ProjectActions.deleteProjectSuccess, (state, { id }) => {
    return projectAdapter.removeOne(id, {
      ...state,
      operation: {
        loading: false,
        error: null,
        success: null
      }
    });
  }),

  on(ProjectActions.deleteProjectFailure, (state, { error }) => ({
    ...state,
    operation: {
      loading: false,
      error: error,
      success: null
    }
  })),
  
  on(ProjectActions.clearProject, (state) => initialState)

);