import { UserService } from './user.service';
import { GetUserInfoDTO, UpdateUserInfoDTO } from './user.dto';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'getUserInfo')
  private async getUserInfo(data: GetUserInfoDTO) {
    return await this.userService.getUserInfo(data);
  }

  @GrpcMethod('UserService', 'updateUserInfo')
  private async putUserData(data: UpdateUserInfoDTO) {
    return await this.userService.updateUserInfo(data);
  }
}
