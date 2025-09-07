import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export type User = {
  id: string;
  username: string;
  password: string;
};

@Injectable()
export class AuthService {
  // In-memory user store
  private users: User[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async register(username: string, password: string): Promise<User> {
    const user = { id: Date.now().toString(), username, password };
    this.users.push(user);
    return user;
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    return (
      this.users.find(
        (u) => u.username === username && u.password === password,
      ) || null
    );
  }

  async login(user: User) {
    const payload = { sub: user.id, username: user.username };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '5m' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user: { id: user.id, username: user.username },
    };
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }
}
