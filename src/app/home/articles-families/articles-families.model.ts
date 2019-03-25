import {ArticleMinimum} from '../shared/article-minimum.model';
import {ArticleFamilyMinimum} from './articles-families-minimum.model';

export class ArticleFamily {
  familyType: string;
  reference: string;
  description: string;

  setArticleMinimum(articleMinimum: ArticleMinimum): ArticleFamily {
    this.familyType = 'ARTICLE';
    this.reference = articleMinimum.code;
    this.description = articleMinimum.description;
    return this;
  }

  setArticleFamilyMinimum(articleFamilyMinimum: ArticleFamilyMinimum): ArticleFamily {
    this.familyType = articleFamilyMinimum.familyType;
    this.reference = null;
    this.description = articleFamilyMinimum.description;
    return this;
  }
}
