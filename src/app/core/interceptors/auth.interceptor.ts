import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject, PLATFORM_ID } from "@angular/core";
import { environment } from "@env/environment";
import { Store } from "@ngrx/store";
import { refresh, refreshFailure, refreshSuccess } from "../stores/auth/auth.actions";
import { selectToken } from "../stores/auth/auth.selectors";
import { Actions, ofType } from "@ngrx/effects";
import { catchError, filter, first, switchMap, take, throwError } from "rxjs";
import { isPlatformServer } from "@angular/common";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const api: string = environment.api.taskly.url;
  const store: Store = inject<Store>(Store);
  const actions$ = inject(Actions);
  let isRefreshing = false;

  const platformId = inject(PLATFORM_ID);
  
  if (isPlatformServer(platformId)) {
    return next(req);
  }

  if (!req.url.startsWith(api)) {
    return next(req);
  }

  function addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  function handle401Error(request: HttpRequest<any>, next: HttpHandlerFn) {
    if (!isRefreshing) {
      isRefreshing = true; // Bloque d'autres refresh pendant le traitement
      store.dispatch(refresh());

      return actions$.pipe(
        ofType(refreshSuccess), // Attend que refreshSuccess soit dispatché
        first(),
        switchMap(({ data }) => {
          isRefreshing = false;
          return next(addTokenHeader(request, data.token));
        }),
        catchError(err => {
          isRefreshing = false;
          store.dispatch(refreshFailure({ error: err }));
          return throwError(() => err);
        })
      );
    } else {
      return store.select(selectToken).pipe(
        filter(token => token !== null),
        first(),
        switchMap(token => {
          return next(addTokenHeader(request, token!));
        })
      );
    }
  }

  return store.select(selectToken).pipe(
    take(1),
    switchMap((token) => {
      let authReq = req;
      if (token) {
        authReq = addTokenHeader(req, token);
      }
      return next(authReq).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 401 && !authReq.url.includes('/auth/refresh')) {
            return handle401Error(authReq, next);
          }
          return throwError(() => error);
        })
      );
    })
  );
};
