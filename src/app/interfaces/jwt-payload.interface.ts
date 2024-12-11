export interface JwtPayload {
  userId: string; // userid claim
  sub: string; // subject(email)
  iat: number; // issued at
  exp: number; // expiration
}
