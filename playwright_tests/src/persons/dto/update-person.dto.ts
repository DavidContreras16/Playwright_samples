export class UpdatePersonDto {
  name?: string;
  email?: string;
  age?: number;
  role?: 'admin' | 'user';
  active?: boolean;
}
