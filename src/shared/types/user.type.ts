export type UserType = 'pro' | 'default';

export type User = {
  name: string;
  email: string;
  avatarUrl: string | null;
  password: string;
  type: UserType;
}
