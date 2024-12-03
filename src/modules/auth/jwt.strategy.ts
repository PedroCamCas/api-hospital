import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';  // Necesario para Passport
import { ExtractJwt, Strategy } from 'passport-jwt';  // Extraemos y validamos el JWT

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'E7cUH1LTObgbE8D+EgduvA==',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}