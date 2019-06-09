export interface User {
  mobile: number;
  username: string;
  name?: string;
  lastname?: string;
  email?: string;
  dni?: string;
  discount?: number ;
  address?: string;
  registrationDate?: string;
  active?: boolean;
  roles?: string[];
}
