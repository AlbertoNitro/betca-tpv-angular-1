export class ApiEndpoint {
  public static BUDGETS = '/budgets';
  public static CASHIER_CLOSURES = '/cashier-closures';
  public static CASHIER_CLOSURES_LAST = ApiEndpoint.CASHIER_CLOSURES + '/last';
  public static STATISTICS = '/statistics';
  public static CASH_MOVEMENTS = '/cash-movements';
  public static DEPOSIT = ApiEndpoint.CASH_MOVEMENTS + '/deposit';
  public static WITHDRAWAL = ApiEndpoint.CASH_MOVEMENTS + '/withdrawal';

  public static USERS = '/users';

  public static ARTICLES = '/articles';
  public static ARTICLES_MINIMUM = ApiEndpoint.ARTICLES + '/minimum';
  public static ARTICLES_FAMILY = '/articles-family';


  public static TICKETS = '/tickets';
  public static FAMILY_SIZES = '/family-sizes';

  public static PROVIDERS = '/providers';
  public static ACTIVES = '/actives';

  public static OFFERS = '/offers';
  public static ORDERS = '/orders';

  public static VOUCHERS = '/vouchers';
}
