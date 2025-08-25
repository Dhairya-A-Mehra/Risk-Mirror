// Deprecated: Use lib/jwt.ts directly for JWT auth.
import { verifyJwt } from './jwt';

export function verifyAuth(token: string) {
  return verifyJwt(token);
}