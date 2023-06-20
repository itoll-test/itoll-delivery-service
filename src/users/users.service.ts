import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/enums/role.enum';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  // This users added only for test perpuse, don't be worry about plain password
  private readonly users = [
    {
      userId: 'fb8edac0-0688-4cc7-8228-b3f405af3d0a',
      username: 'business',
      password: 'itoll',
      webhook: 'https://webhook.site/d5779899-4662-4f55-bf1a-bf95cc565d90',
      roles: [Role.Business],
    },
    {
      userId: '7f94b87a-3268-4f42-83f2-e6796804d3e9',
      username: 'courier',
      password: 'itoll',
      roles: [Role.Courier],
    },
  ];
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
