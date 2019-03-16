import { Offer } from './offer.model';

export const OFFERS: Offer[] = [
  {
    id: '1',
    name: 'Prueba1',
    endDate: '03-07-2019',
    articleLine: [
      {
        idArticle: '1',
        percentage: 12
      },
      {
        idArticle: '2',
        percentage: 34
      },
      {
        idArticle: '3',
        percentage: 2
      }
    ]
  },
  {
    id: '2',
    name: 'Prueba2',
    endDate: '03-12-2019',
    articleLine: [
      {
        idArticle: '1',
        percentage: 12
      },
      {
        idArticle: '3',
        percentage: 2
      }
    ]
  },
  {
    id: '3',
    name: 'Prueba3',
    endDate: '12-07-2020',
    articleLine: [
      {
        idArticle: '5',
        percentage: 2
      },
      {
        idArticle: '2',
        percentage: 34
      },
      {
        idArticle: '3',
        percentage: 26
      }
    ]
  },
  {
    id: '4',
    name: 'Prueba4',
    endDate: '30-11-2019',
    articleLine: [
      {
        idArticle: '5',
        percentage: 2
      }
    ]
  },
  {
    id: '4',
    name: 'Prueba4',
    endDate: '29-04-2019',
    articleLine: [
      {
        idArticle: '5',
        percentage: 2
      },
      {
        idArticle: '2',
        percentage: 34
      },
      {
        idArticle: '3',
        percentage: 26
      },
      {
        idArticle: '15',
        percentage: 4
      },
      {
        idArticle: '1',
        percentage: 12
      }
    ]
  },
];
