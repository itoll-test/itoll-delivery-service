import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(protected readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('passport')().secret,
    });
  }

  async validate(payload: any) {
    if (payload.roles.includes('business')) {
      return {
        userId: payload.sub,
        username: payload.username,
        webhook: payload.webhook,
        roles: payload.roles,
      };
    }
    return {
      userId: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
}
