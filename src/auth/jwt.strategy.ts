import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { config } from "src/config/config";



@Injectable()
export class JwtStragegy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.jwtsecret,
        })
    }
    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username }
    }


}