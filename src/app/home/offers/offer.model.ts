export interface Offer {
  id: string;
  offername: string;
  endDate: string;
  articleLine: ArticleLine[];
}

export interface ArticleLine {
  idArticle: string;
  percentage: number;
}
