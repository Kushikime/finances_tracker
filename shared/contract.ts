import { initContract } from '@ts-rest/core';
import { LoginInput, LoginOutput, UserPublic, ErrorEnvelope } from './schemas';

const c = initContract();

export const authContract = c.router({
  register: {
    method: 'POST',
    path: '/auth/register',
    responses: {
      200: UserPublic,
      400: ErrorEnvelope,
    },
    body: LoginInput,
  },
  login: {
    method: 'POST',
    path: '/auth/login',
    responses: {
      200: LoginOutput,
      400: ErrorEnvelope,
    },
    body: LoginInput,
  },
  me: {
    method: 'GET',
    path: '/auth/me',
    responses: {
      200: UserPublic,
      401: ErrorEnvelope,
    },
  },
});
