export interface Article {
  code: string;
  reference?: string;
  description?: string;
  amount?: number;
  retailPrice?: number;
  stock?: number;
  provider?: string;
  tax?: string;
  discontinued?: boolean;
  registrationDate?: Date;
}
