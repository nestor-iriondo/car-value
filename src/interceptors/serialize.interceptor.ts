import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ClassConstructor {
  new (...args: any[]): object;
}

/**
 * Serialize is a custom decorator that applies the SerializeInterceptor to
 * the route handler. It allows you to specify a Data Transfer Object (DTO)
 * class that defines how the response should be serialized.
 *
 */

export const Serialize = (dto: ClassConstructor) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};

/**
 * SerializeInterceptor is a NestJS interceptor that transforms the response
 * data into a specific class instance, allowing for controlled serialization.
 * Serialization is the process of converting an object into a format that can
 * be easily sent over the network or stored.
 */

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {
    // The constructor accepts a DTO class to define how the response should be serialized.
    // This allows for flexibility in defining different serialization formats.
  }
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before the request is handled by the route handler
    console.log('Before the request is handled', context);

    return handler.handle().pipe(
      map((data: unknown) => {
        // Run something before the response is sent out
        console.log('Before the response is sent', data);
        return plainToClass(this.dto, data, {
          // Exclude properties not defined in UserDto. This is the key part of serialization.
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
