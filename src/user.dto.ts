export class GetUserInfoDTO {
  userId: number;
}

export class UpdateUserInfoDTO {
  userId: number;
  data: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
}
