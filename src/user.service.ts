import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { GetUserInfoDTO, UpdateUserInfoDTO } from './user.dto';
import { ClientGrpc } from '@nestjs/microservices';
import {
  ErrorResponse,
  UpdateUserInfoRequest,
  UserInfoResponse,
  UserOrFalse,
} from './types/type';
import { lastValueFrom, Observable } from 'rxjs';

export interface DatabseServiceInterface {
  getUserByLogin(data: { login: string }): Observable<Promise<UserOrFalse>>;
  getUserByPhone(data: { phone: string }): Observable<Promise<UserOrFalse>>;
  getUserInfo(data: { id: number }): Observable<Promise<UserInfoResponse>>;
  updateUserInfo(
    data: UpdateUserInfoRequest,
  ): Observable<Promise<UserInfoResponse>>;
}

@Injectable()
export class UserService {
  private databaseMS: DatabseServiceInterface;

  constructor(@Inject('DATABASE_MS') private client: ClientGrpc) {}

  onModuleInit() {
    this.databaseMS =
      this.client.getService<DatabseServiceInterface>('DatabaseService');
  }

  public async getUserInfo(data: GetUserInfoDTO) {
    const resultInfo = await lastValueFrom(
      this.databaseMS.getUserInfo({ id: data.userId }),
    );
    return resultInfo;
  }

  public async updateUserInfo(data: UpdateUserInfoDTO) {
    const emailExists = await lastValueFrom(
      this.databaseMS.getUserByLogin({ login: data.data.email }),
    );
    if (emailExists.user && emailExists.user.id != data.userId) {
      return {
        error: new ConflictException({
          statusCode: 409,
          message: 'Email already registered',
          error: 'Conflict Exception',
        }).getResponse() as ErrorResponse,
      };
    }
    const phoneExists = await lastValueFrom(
      this.databaseMS.getUserByPhone({ phone: data.data.phone }),
    );

    if (phoneExists.user && phoneExists.user.id != data.userId) {
      return {
        error: new ConflictException({
          statusCode: 409,
          message: 'Phone number already registered',
          error: 'Conflict Exception',
        }).getResponse() as ErrorResponse,
      };
    }

    const resultUpdateUserInfo = await lastValueFrom(
      this.databaseMS.updateUserInfo({ id: data.userId, data: data.data }),
    );
    return resultUpdateUserInfo;
  }
}
