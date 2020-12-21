import { async, inject, TestBed } from '@angular/core/testing';

import { MemoizedSelector, Store } from '@ngrx/store';

import { BooksFacade } from './books.facade';
import { BookItem } from './book';
import * as fromBook from './books.reducer';
import * as BookActions from './books.actions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('Books Facade', () => {
  let mockStore: MockStore;
  let mockBooksSelector: MemoizedSelector<fromBook.State, any>;
  let mockCartBooksSelector: MemoizedSelector<fromBook.State, any>;
  let mockCollectionBooksSelector: MemoizedSelector<fromBook.State, any>;

  const initialState = [
    {
      id: '6JVCAwAAQBAJ',
        title: 'Object Thinking',
        publisher: 'Microsoft Press',
        description:
          'In OBJECT THINKING, esteemed object technologist David West contends that the mindset makes the programmer—not the tools and techniques. Delving into the history, philosophy, and even politics of object-oriented programming, West reveals how the best programmers rely on analysis and conceptualization—on thinking—rather than formal process and methods. Both provocative and pragmatic, this book gives form to what’s primarily been an oral tradition among the field’s revolutionary thinkers—and it illustrates specific object-behavior practices that you can adopt for true object design and superior results. Gain an in-depth understanding of: Prerequisites and principles of object thinking. Object knowledge implicit in eXtreme Programming (XP) and Agile software development. Object conceptualization and modeling. Metaphors, vocabulary, and design for object development. Learn viable techniques for: Decomposing complex domains in terms of objects. Identifying object relationships, interactions, and constraints. Relating object behavior to internal structure and implementation design. Incorporating object thinking into XP and Agile practice.',
          smallThumbnail:
            'http://books.google.com/books/content?id=6JVCAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=6JVCAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    
      type: '[Cart] Add To Cart',
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        Store,
        BooksFacade,
        provideMockStore({
          initialState,
        }),
      ],
    }).compileComponents();
    mockStore = TestBed.get(MockStore);
    //  const getBookFeatureState = createFeatureSelector<fromBook.BooksState>('books');
    mockCollectionBooksSelector = mockStore.overrideSelector(
      fromBook.getCollectionItems,
      initialState
    );
    mockCartBooksSelector = mockStore.overrideSelector(
      fromBook.getCartItems,
      initialState
    );
    mockBooksSelector = mockStore.overrideSelector(
      fromBook.getBooks,
      initialState
    );
    mockCollectionBooksSelector = mockStore.overrideSelector(
      fromBook.getCartItemsCount,
      initialState.length
    );
  }));

  it('should be created', () => {
    const facade: BooksFacade = TestBed.get(BooksFacade);
    expect(facade).toBeTruthy();
  });

  it('should initialize values from store', inject(
    [BooksFacade],
    (facade: BooksFacade) => {
      facade.cartBooks$.forEach((x) => {
        expect(x[0].id).toContain('6JVCAwAAQBAJ');
      });
      facade.collectionBooks$.forEach((x) => {
        expect(x[0].id).toContain('6JVCAwAAQBAJ');
      });
      facade.cartItemsCount$.forEach((x) => {
        expect(x).toEqual(1);
      });
      facade.books$.forEach((x) => {
        expect(x[0].id).toContain('6JVCAwAAQBAJ');
      });
    }
  ));

  it('should call and execute loadAll method in facade', inject(
    [BooksFacade],
    (facade: BooksFacade) => {
      const searchValue = 'Angular';
      const loadAllSpy = spyOn(facade, 'loadAll').and.callThrough();
      const mockStoreSpy = spyOn(mockStore, 'dispatch').and.callThrough();

      facade.loadAll(searchValue);
      
      expect(loadAllSpy).toBeCalledWith(searchValue);
      expect(mockStoreSpy).toBeCalledWith({
        "payload": "Angular",
        "type": "[Book] Load Book",
      });
    }
  ));

  it('should call and execute addToCollections method in facade', inject(
    [BooksFacade],
    (facade: BooksFacade) => {
      const payload = [
        {
        "id": "0BSOg0oHhZ0C",
          "title": "Angular Momentum in Quantum Mechanics",
          "publisher": "Princeton University Press",
          "description": "This book offers a concise introduction to the angular momentum, one of the most fundamental quantities in all of quantum mechanics. Beginning with the quantization of angular momentum, spin angular momentum, and the orbital angular momentum, the author goes on to discuss the Clebsch-Gordan coefficients for a two-component system. After developing the necessary mathematics, specifically spherical tensors and tensor operators, the author then investigates the 3-j, 6-j, and 9-j symbols. Throughout, the author provides practical applications to atomic, molecular, and nuclear physics. These include partial-wave expansions, the emission and absorption of particles, the proton and electron quadrupole moment, matrix element calculation in practice, and the properties of the symmetrical top molecule.",
      
            "smallThumbnail": "http://books.google.com/books/content?id=0BSOg0oHhZ0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            "thumbnail": "http://books.google.com/books/content?id=0BSOg0oHhZ0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      }];
      const purchaseInfo = {
        "purchaseInfo": {
        "address": "flat no - 312, block a,\nsvs avaasa apartments, annapurna enclave, chandanagar",
        "name": "arthireddy pedditti",
        "email": "a@a.com",
        "phoneNumber": "8019133370"
        }
      };
      const x = {payload , purchaseInfo};
      const addToCollectionsSpy = spyOn(facade, 'addToCollections').and.callThrough();
      const mockStoreSpy = spyOn(mockStore, 'dispatch').and.callThrough();

      facade.addToCollections(payload,purchaseInfo);
      
      expect(addToCollectionsSpy).toBeCalledWith(payload,purchaseInfo);
      expect(mockStoreSpy).toBeCalled();
    }
  ));

  it('should call and execute clearCart method in facade', inject(
    [BooksFacade],
    (facade: BooksFacade) => {
      const payload = 
        {
          id: '6JVCAwAAQBAJ',
            title: 'Object Thinking',
            authors: ['David West'],
            publisher: 'Microsoft Press',
            description:
              'In OBJECT THINKING, esteemed object technologist David West contends that the mindset makes the programmer—not the tools and techniques. Delving into the history, philosophy, and even politics of object-oriented programming, West reveals how the best programmers rely on analysis and conceptualization—on thinking—rather than formal process and methods. Both provocative and pragmatic, this book gives form to what’s primarily been an oral tradition among the field’s revolutionary thinkers—and it illustrates specific object-behavior practices that you can adopt for true object design and superior results. Gain an in-depth understanding of: Prerequisites and principles of object thinking. Object knowledge implicit in eXtreme Programming (XP) and Agile software development. Object conceptualization and modeling. Metaphors, vocabulary, and design for object development. Learn viable techniques for: Decomposing complex domains in terms of objects. Identifying object relationships, interactions, and constraints. Relating object behavior to internal structure and implementation design. Incorporating object thinking into XP and Agile practice.',
              smallThumbnail:
                'http://books.google.com/books/content?id=6JVCAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=6JVCAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
          type: '[Cart] Add To Cart',
        };
      const clearCartSpy = spyOn(facade, 'clearCart').and.callThrough();
      const mockStoreSpy = spyOn(mockStore, 'dispatch').and.callThrough();

      facade.clearCart(payload);
      
      expect(clearCartSpy).toBeCalledWith(payload);
      expect(mockStoreSpy).toBeCalled();
    }
  ));

  it('should call and execute addToCart method in facade', inject(
    [BooksFacade],
    (facade: BooksFacade) => {
      const payload = 
      {
        id: '6JVCAwAAQBAJ',
          title: 'Object Thinking',
          publisher: 'Microsoft Press',
          description:
            'In OBJECT THINKING, esteemed object technologist David West contends that the mindset makes the programmer—not the tools and techniques. Delving into the history, philosophy, and even politics of object-oriented programming, West reveals how the best programmers rely on analysis and conceptualization—on thinking—rather than formal process and methods. Both provocative and pragmatic, this book gives form to what’s primarily been an oral tradition among the field’s revolutionary thinkers—and it illustrates specific object-behavior practices that you can adopt for true object design and superior results. Gain an in-depth understanding of: Prerequisites and principles of object thinking. Object knowledge implicit in eXtreme Programming (XP) and Agile software development. Object conceptualization and modeling. Metaphors, vocabulary, and design for object development. Learn viable techniques for: Decomposing complex domains in terms of objects. Identifying object relationships, interactions, and constraints. Relating object behavior to internal structure and implementation design. Incorporating object thinking into XP and Agile practice.',
       
          pageCount: 368,
            smallThumbnail:
              'http://books.google.com/books/content?id=6JVCAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            thumbnail:
              'http://books.google.com/books/content?id=6JVCAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        
      
        type: '[Cart] Add To Cart',
      };
      const addToCartSpy = spyOn(facade, 'addToCart').and.callThrough();
      const mockStoreSpy = spyOn(mockStore, 'dispatch').and.callThrough();

      facade.addToCart(payload);
      
      expect(addToCartSpy).toBeCalledWith(payload);
      expect(mockStoreSpy).toBeCalled();
    }
  ));
});
