export interface Article {
  code: string;
  reference?: string;
  description?: string;
  retailPrice?: number;
  stock?: number;
  provider?: string;
  tax?: string,
  discontinued?: boolean;
  registrationDate?: Date;
}
