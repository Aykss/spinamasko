export type AuthGodparent = {
  id: number;
  email: string;
  name: string;
  unique_id: string;
};

export type AuthResponse = {
  success: boolean;
  godparent?: AuthGodparent;
  message?: string;
};

export type AuthError = {
  statusCode: number;
  statusMessage: string;
};
