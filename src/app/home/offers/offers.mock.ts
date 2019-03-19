import { Offer } from './offer.model';

export const OFFERSMOCK: Offer[] = [
  {
    id: '1',
    offername: 'Prueba1',
    endDate: '03-07-2019',
    articleLine: [
      {
        id: '1',
        percentage: 12
      },
      {
        id: '2',
        percentage: 34
      },
      {
        id: '3',
        percentage: 2
      }
    ]
  },
  {
    id: '2',
    offername: 'Prueba2',
    endDate: '03-12-2019',
    articleLine: [
      {
        id: '1',
        percentage: 12
      },
      {
        id: '3',
        percentage: 2
      }
    ]
  },
  {
    id: '3',
    offername: 'Prueba3',
    endDate: '12-07-2020',
    articleLine: [
      {
        id: '5',
        percentage: 2
      },
      {
        id: '2',
        percentage: 34
      },
      {
        id: '3',
        percentage: 26
      }
    ]
  },
  {
    id: '4',
    offername: 'Prueba4',
    endDate: '30-11-2019',
    articleLine: [
      {
        id: '5',
        percentage: 2
      }
    ]
  },
  {
    id: '5',
    offername: 'Prueba5',
    endDate: '29-04-2019',
    articleLine: [
      {
        id: '5',
        percentage: 2
      },
      {
        id: '2',
        percentage: 34
      },
      {
        id: '3',
        percentage: 26
      },
      {
        id: '15',
        percentage: 4
      },
      {
        id: '1',
        percentage: 12
      }
    ]
  },
];
