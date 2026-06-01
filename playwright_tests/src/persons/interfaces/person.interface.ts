export interface Person {
  id: number;
  name: string;
  email: string;
  age: number;
  role: 'admin' | 'user';
  active: boolean;
}
