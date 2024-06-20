import { HttpInterceptorFn } from '@angular/common/http';

export const tokenHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken') ?? '';

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
};
