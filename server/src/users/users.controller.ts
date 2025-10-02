import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { GetUser } from "../utils/decorators/get-user.decorator";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("me")
  getMe(@GetUser() user: any) {
    return { id: user.id, email: user.email, isAdmin: user.isAdmin };
  }

  @Get()
  getusers(@GetUser() user: any) {
    return this.usersService.findAll();
  }
}
