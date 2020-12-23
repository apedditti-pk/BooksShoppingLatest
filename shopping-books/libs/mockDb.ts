import { Book, IBook } from './book';

export const MockBookForTesting: Book = {
  kind: 'books#volumes',
  totalItems: 1272,
  items: [
    {
      kind: 'books#volume',
      id: '0BSOg0oHhZ0C',
      etag: 'WU9xL8JZUAc',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/0BSOg0oHhZ0C',
      volumeInfo: {
        title: 'Angular Momentum in Quantum Mechanics',
        publisher: 'Princeton University Press',
        publishedDate: '2011-02-16',
        description:
          'This book offers a concise introduction to the angular momentum, one of the most fundamental quantities in all of quantum mechanics. Beginning with the quantization of angular momentum, spin angular momentum, and the orbital angular momentum, the author goes on to discuss the Clebsch-Gordan coefficients for a two-component system. After developing the necessary mathematics, specifically spherical tensors and tensor operators, the author then investigates the 3-j, 6-j, and 9-j symbols. Throughout, the author provides practical applications to atomic, molecular, and nuclear physics. These include partial-wave expansions, the emission and absorption of particles, the proton and electron quadrupole moment, matrix element calculation in practice, and the properties of the symmetrical top molecule.',
        pageCount: 146,
        printType: 'BOOK',
        maturityRating: 'NOT_MATURE',
        averageRating: 4,
        allowAnonLogging: false,
        contentVersion: '0.4.3.0.preview.3',
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=0BSOg0oHhZ0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=0BSOg0oHhZ0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        },
        language: 'en',
        previewLink:
          'http://books.google.co.in/books?id=0BSOg0oHhZ0C&pg=PA12&dq=angular&hl=&cd=1&source=gbs_api',
        infoLink:
          'http://books.google.co.in/books?id=BR-4M3teGJkC&dq=%27+searchItem&hl=&source=gbs_api',
        canonicalVolumeLink:
          'https://books.google.com/books/about/Professional_DotNetNuke_Module_Programmi.html?hl=&id=BR-4M3teGJkC',
      },
      saleInfo: { country: 'IN', saleability: 'NOT_FOR_SALE', isEbook: false },
      accessInfo: {
        country: 'IN',
        viewability: 'PARTIAL',
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: 'ALLOWED',
        epub: {
          isAvailable: true,
          acsTokenLink:
            'http://books.google.co.in/books/download/Professional_DotNetNuke_Module_Programmi-sample-epub.acsm?id=BR-4M3teGJkC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
        },
        pdf: {
          isAvailable: true,
          acsTokenLink:
            'http://books.google.co.in/books/download/Professional_DotNetNuke_Module_Programmi-sample-pdf.acsm?id=BR-4M3teGJkC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
        },
        webReaderLink:
          'http://play.google.com/books/reader?id=BR-4M3teGJkC&hl=&printsec=frontcover&source=gbs_api',
        accessViewStatus: 'SAMPLE',
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          'ModuleID); foreach (GuestbookEntryInfo item in items) { SearchItemInfo <br>\n<b>searchItem</b> = new SearchItemInfo(); <b>searchItem</b>.Author = 2; //Default to admin <br>\n<b>searchItem</b>.Content = item.SubmitterComment; <b>searchItem</b>.Description = item.',
      }
    }
  ]
};

export const formattedBookMock: IBook[] = [
  {
    id: '0BSOg0oHhZ0C',
    title: 'Angular Momentum in Quantum Mechanics',
    description:
      'This book offers a concise introduction to the angular momentum, one of the most fundamental quantities in all of quantum mechanics. Beginning with the quantization of angular momentum, spin angular momentum, and the orbital angular momentum, the author goes on to discuss the Clebsch-Gordan coefficients for a two-component system. After developing the necessary mathematics, specifically spherical tensors and tensor operators, the author then investigates the 3-j, 6-j, and 9-j symbols. Throughout, the author provides practical applications to atomic, molecular, and nuclear physics. These include partial-wave expansions, the emission and absorption of particles, the proton and electron quadrupole moment, matrix element calculation in practice, and the properties of the symmetrical top molecule.',
    smallThumbnail:
      'http://books.google.com/books/content?id=0BSOg0oHhZ0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    thumbnail:
      'http://books.google.com/books/content?id=0BSOg0oHhZ0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    publisher: 'Princeton University Press',
    pageCount: 146,
    averageRating: 4,
    language: 'en',
    previewLink:
      'http://books.google.co.in/books?id=0BSOg0oHhZ0C&pg=PA12&dq=angular&hl=&cd=1&source=gbs_api',
  },
];
