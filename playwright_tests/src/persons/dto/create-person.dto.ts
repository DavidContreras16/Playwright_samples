export class CreatePersonDto {
  name: string;
  email: string;
  age: number;
  role: 'admin' | 'user';
  active?: boolean;
}
