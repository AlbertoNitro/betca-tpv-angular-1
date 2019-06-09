export class ApiEndpoint {
  public static INVOICE = '/invoice';
  public static INVOICEUPDATEDATES = '/invoice-update/dates';
  public static INVOICEUPDATEMOBILE = '/invoice-update/mobile';
  public static INVOICEUPDATEMOBILEDATES = '/invoice-update/mobiledates';
  public static INVOICEUPDATEPDF = '/invoice-update/pdf';
  public static INVOICEUPDATENEGATIVEMAX = '/invoice-update/maxnegative';
  public static INVOICECREATENEGATIVE = '/invoice-update/negative';
  public static BUDGETS = '/budgets';
  public static CASHIER_CLOSURES = '/cashier-closures';
  public static CASHIER_CLOSURES_LAST = ApiEndpoint.CASHIER_CLOSURES + '/last';
  public static STATISTICS = '/statistics';
  public static CASH_MOVEMENTS = '/cash-movements';
  public static DEPOSIT = ApiEndpoint.CASH_MOVEMENTS + '/deposit';
  public static WITHDRAWAL = ApiEndpoint.CASH_MOVEMENTS + '/withdrawal';

  public static USERS = '/users';
  public static ROLES = '/roles';
  public static QUERY = '/query';
  public static PROFILES = '/profiles';
  public static VALIDATORS = '/validators';

  public static RGPD_AGREEMENT = '/rgpd/agreement';
  public static RGPD_USER_AGREEMENT = '/rgpd/useragreement';

  public static ALARMS = '/alarms';
  public static ARTICLES = '/articles';
  public static ARTICLES_MINIMUM = ApiEndpoint.ARTICLES + '/minimum';
  public static ARTICLES_RESERVATION = ApiEndpoint.ARTICLES + '/reservation';
  public static ARTICLES_FAMILY = '/articles-family';
  public static ARTICLE_FAMILY_CREATE = ApiEndpoint.ARTICLES_FAMILY + '/create';
  public static ARTICLES_FAMILY_COMPOSITE = '/familydescription';

  public static TICKETS = '/tickets';
  public static ARTICLES_DATE_SOLD = ApiEndpoint.TICKETS + '/datesold';
  public static GIFT_TICKETS = '/tickets/gift';

  public static FAMILY_SIZES = '/family-sizes';
  public static PROVIDERS = '/providers';
  public static ACTIVES = '/actives';
  public static SEARCH = '/search';

  public static OFFERS = '/offers';
  public static ORDERS = '/orders';
  public static CLOSE = '/close';
  public static OPERATOR_MANAGER = '/timeclocks';

  public static STOCK_PREDICTION = '/stock-prediction';

  public static VOUCHERS = '/vouchers';

  public static PARTIALLY_DEFINED = '/partially-defined';

  public static ARTICLES_SEARCH = ApiEndpoint.ARTICLES + ApiEndpoint.SEARCH;
}
