export interface Offer {
  id: string;
  name: string;
  endDate: string;
  articleLine: ArticleLine[];
}

export interface ArticleLine {
  idArticle: string;
  percentage: number;
}
