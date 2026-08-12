import { Injectable, NestInterceptor, CallHandler } from "@nestjs/common";
import { map, Observable } from "rxjs";

interface Data<T>{
    data:T
}

@Injectable()
export class respInterceptor<T> implements NestInterceptor {
    intercept (context, next: CallHandler) :Observable<Data<T>>{
        return next.handle().pipe(map(data=>{
            return {
                data,
                status: 0,
                success: true,
                time: new Date().getTime(),
            }
        }))
    }
}