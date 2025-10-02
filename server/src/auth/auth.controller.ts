import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post("register")
  async register(@Body() body: RegisterDto) {
    return this.auth.register(body.email, body.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(@Body() body: LoginDto) {
    return this.auth.login(body.email, body.password);
  }
}
