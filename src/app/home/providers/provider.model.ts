export interface Provider {
  id: string;
  company: string;
  nif: string;
  email?: string;
  address?: string;
  phone?: string;
  note?: string;
  active?: boolean;
}
