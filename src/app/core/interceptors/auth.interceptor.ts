import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { environment } from "@env/environment";
import { Store } from "@ngrx/store";
import { selectToken } from "../stores/auth/auth.selectors";
import { first, switchMap } from "rxjs";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const api: string = environment.api.taskly.url;
  const store: Store = inject<Store>(Store);

  if (!req.url.startsWith(api)) {
    return next(req);
  }

  return store.select(selectToken).pipe(
    first(),
    switchMap(token => {
      if (!token) {
        return next(req);
      }

      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next(clonedReq);
    })
  );
};