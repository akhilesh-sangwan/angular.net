import { Injectable } from '@angular/core';
import * as http from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusyService } from '../_services/busy.service';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements http.HttpInterceptor {

  constructor( private busyService: BusyService) {}

  intercept(request: http.HttpRequest<unknown>, next: http.HttpHandler): Observable<http.HttpEvent<unknown>> {
    this.busyService.busy();
    return next.handle(request).pipe(
      // delay(1000),
      finalize(()=>{
        this.busyService.idle();
      })
    )
  }
}
