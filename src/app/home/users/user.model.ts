export interface User {
  mobile: number;
  username: string;
  name?: string;
  lastName?: string;
  email?: string;
  dni?: string;
  address?: string;
  registrationDate?: string;
  active?: boolean;
  roles?: string[];
}
