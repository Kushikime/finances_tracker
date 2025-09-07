import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { query } from '../../db/query';
import { userSchema, User as DbUser } from '@shared/contracts/db.zod';
import * as bcrypt from 'bcryptjs';

export type User = DbUser;

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async register(
    email: string,
    password: string,
    name: string,
    surname: string,
  ): Promise<User> {
    const password_hash = await bcrypt.hash(password, 10);
    const result = await query<DbUser>(
      `INSERT INTO users (email, password_hash, name, surname, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       RETURNING *`,
      [email, password_hash, name, surname],
    );
    return userSchema.parse(result.rows[0]);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const result = await query<DbUser>(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    const user = result.rows[0];
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password_hash);
    return valid ? userSchema.parse(user) : null;
  }

  async login(user: User) {
    const payload = { sub: user.id.toString(), email: user.email };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '5m' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      },
    };
  }

  async findById(id: string): Promise<User | undefined> {
    const result = await query<DbUser>(`SELECT * FROM users WHERE id = $1`, [
      id,
    ]);
    const user = result.rows[0];
    return user ? userSchema.parse(user) : undefined;
  }
}
