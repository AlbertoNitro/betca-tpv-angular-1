export interface User {
  mobile: number;
  username: string;
  name?: string;
  lastName?: string;
  email?: string;
  dni?: string;
  discount?: number ;
  address?: string;
  registrationDate?: string;
  active?: boolean;
  roles?: string[];
}
