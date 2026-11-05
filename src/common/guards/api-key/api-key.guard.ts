import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService, private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPulbic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    
    if (isPulbic) return true;

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const authHeader = request.header('Authorization');

    const apiKey = this.configService.get('API_KEY');
    return authHeader === apiKey;
  }
}
