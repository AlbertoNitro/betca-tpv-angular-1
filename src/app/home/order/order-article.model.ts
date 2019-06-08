export class OrderArticle {
  discount: number;
  total: number;
  committed: boolean;

  constructor(public code: string, public description: string, public amount: number, public retailPrice: number, public provider: String) {
    this.amount = this.updateAmount(this.amount);
    this.discount = 0;
    this.total = this.retailPrice * this.amount * (1 - this.discount / 100);
    this.committed = true;
  }

  updateTotal(): void {
    this.total = this.round(this.retailPrice * this.amount * (1 - this.discount / 100));
  }

  updateDiscount(): void {
    this.discount = this.round(100 * (1 - (this.total / (this.amount * this.retailPrice))));
  }

  toString(): string {
    return 'code:' + this.code + ',delivered:' + this.committed;
  }

  private round(value: number) {
    return Math.round(value * 100) / 100;
  }

  private updateAmount(value: number) {
    if (isNaN(value)) {
      return 1;
    }
    return value;
  }
}
