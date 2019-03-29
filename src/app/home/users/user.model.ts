export interface User {
  mobile: number;
  username: string;
  email?: string;
  dni?: string;
  address?: string;
  registrationDate?: string;
  active?: boolean;
  roles?: string[];
}
