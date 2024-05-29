/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { interval, map, Observable } from 'rxjs';

interface MessageEvent {
  data: string | object;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('notification')
  sendUpdates(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({ data: { hello: 'Good morning' } })),
    );
  }
}
