import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService
  ) {}

  async register(email: string, password: string) {
    try {
      const existing = await this.users.findByEmail(email);
      if (existing) throw new ConflictException("Email exists");
      const user = await this.users.create({ email, password });
      const payload = {
        sub: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      };
      return { accessToken: this.jwt.sign(payload), id: user.id };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.users.findByEmail(email);
      if (!user) throw new UnauthorizedException("Invalid credentials");
      const ok = await user.comparePassword(password);
      if (!ok) throw new UnauthorizedException("Invalid credentials");
      const payload = {
        sub: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      };
      return { accessToken: this.jwt.sign(payload) };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
