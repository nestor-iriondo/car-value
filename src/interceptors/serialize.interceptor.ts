import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * SerializeInterceptor is a NestJS interceptor that transforms the response
 * data into a specific class instance, allowing for controlled serialization.
 */

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before the request is handled by the route handler
    console.log('Before the request is handled', context);

    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        console.log('Before the response is sent', data);
      }),
    );
  }
}
