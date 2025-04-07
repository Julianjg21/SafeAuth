
export interface Token { // JWT token
  token: string
}

export interface Roles { // User roles
  id: number;
  name: string;
}

export interface TokenPayload { // JWT payload
  id: string;
  email: string;
  roles: Roles[];
  iat?: number;
  exp?: number;
}
