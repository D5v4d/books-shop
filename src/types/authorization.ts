export interface Token {
  email: string;
  password: string;
  token: string;
  expiresAt: number; // Unix timestamp
  name: string;
}

export interface AuthState {
  active: boolean;
  tokenProfile: string;
  tokens: Token[];
}