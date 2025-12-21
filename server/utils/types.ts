export type AuthGodparent = {
  id: number;
  name: string;
  unique_id: string;
  pronouns: number;
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
