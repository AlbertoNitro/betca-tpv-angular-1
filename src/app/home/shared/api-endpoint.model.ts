export class ApiEndpoint {
  public static CASHIER_CLOSURES = '/cashier-closures';
  public static CASHIER_CLOSURES_LAST = ApiEndpoint.CASHIER_CLOSURES + '/last';

  public static DEPOSIT = ApiEndpoint.CASHIER_CLOSURES + '/deposit';
  public static WITHDRAWAL = ApiEndpoint.CASHIER_CLOSURES + '/withdrawal';

  public static USERS = '/users';

  public static ARTICLES = '/articles';
  public static ARTICLES_FAMILY = '/articles-family';

  public static TICKETS = '/tickets';
  public static FAMILY_SIZES = '/family-sizes';

  public static PROVIDERS = '/providers';
  public static ACTIVES = '/actives';

  public static ORDERS = '/orders';
}
