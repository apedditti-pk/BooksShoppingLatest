import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';

import {
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
} from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { EllipsisModule } from 'ngx-ellipsis';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';

import { BooksFacade } from '../state/books.facade';
import * as fromBook from '../state/books.reducer';
import { CartComponent } from './cart.component';

import { Router } from '@angular/router';
import { BookListModule } from '../shared/book-list/book-list.module';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockStore: MockStore;
  let router;

  const initialState = [
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
    },
  ];
  let mockCartBooksSelector: MemoizedSelector<fromBook.State, any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        BooksFacade,
        provideMockStore({
          initialState,
        }),
      ],
      imports: [
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatListModule,
        MatInputModule,
        FormsModule,
        EllipsisModule,
        BookListModule,
        RouterTestingModule.withRoutes([
          { path: 'billingDetails', component: CartComponent },
        ]),
      ],
    }).compileComponents();

    mockStore = TestBed.get(MockStore);
    const getBookFeatureState = createFeatureSelector<fromBook.BooksState>(
      'books'
    );
    mockCartBooksSelector = mockStore.overrideSelector(
      fromBook.getCartItems,
      initialState
    );
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign cartBooks$ when component is resolved', async(() => {
    component.cartBooks$.forEach((element) => {
      expect(element[0].id).toEqual('6JVCAwAAQBAJ');
    });
  }));

  it('should call clearCartClicked() method', async(() => {
    const clearCartClickedSpy = spyOn(component, 'clearCartClicked');
    component.clearCartClicked({
      id: '0BSOg0oHhZ0C',
        title: 'Angular Momentum in Quantum Mechanics',
        publisher: 'Princeton University Press',
        description:
          'This book offers a concise introduction to the angular momentum, one of the most fundamental quantities in all of quantum mechanics. Beginning with the quantization of angular momentum, spin angular momentum, and the orbital angular momentum, the author goes on to discuss the Clebsch-Gordan coefficients for a two-component system. After developing the necessary mathematics, specifically spherical tensors and tensor operators, the author then investigates the 3-j, 6-j, and 9-j symbols. Throughout, the author provides practical applications to atomic, molecular, and nuclear physics. These include partial-wave expansions, the emission and absorption of particles, the proton and electron quadrupole moment, matrix element calculation in practice, and the properties of the symmetrical top molecule.',
        pageCount: 146,
          smallThumbnail:
            'http://books.google.com/books/content?id=0BSOg0oHhZ0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=0BSOg0oHhZ0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        language: 'en',
        previewLink:
          'http://books.google.co.in/books?id=0BSOg0oHhZ0C&pg=PA12&dq=angular&hl=&cd=1&source=gbs_api',
  
    });

    expect(clearCartClickedSpy).toHaveBeenCalledWith({
      id: '0BSOg0oHhZ0C',
        title: 'Angular Momentum in Quantum Mechanics',
        publisher: 'Princeton University Press',
        description:
          'This book offers a concise introduction to the angular momentum, one of the most fundamental quantities in all of quantum mechanics. Beginning with the quantization of angular momentum, spin angular momentum, and the orbital angular momentum, the author goes on to discuss the Clebsch-Gordan coefficients for a two-component system. After developing the necessary mathematics, specifically spherical tensors and tensor operators, the author then investigates the 3-j, 6-j, and 9-j symbols. Throughout, the author provides practical applications to atomic, molecular, and nuclear physics. These include partial-wave expansions, the emission and absorption of particles, the proton and electron quadrupole moment, matrix element calculation in practice, and the properties of the symmetrical top molecule.',
          smallThumbnail:
            'http://books.google.com/books/content?id=0BSOg0oHhZ0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=0BSOg0oHhZ0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    });
  }));

  it('should call purchaseClicked() method and navigate to billingDetails page', inject(
    [BooksFacade],
    (facade: BooksFacade) => {
      const purchaseClickedSpy = spyOn(
        component,
        'purchaseClicked'
      ).and.callThrough();
      const setPurchaseListItemsSpy = spyOn(facade, 'purchaseListItems');

      component.purchaseClicked([
        {
          id: '6JVCAwAAQBAJ',
            title: 'Object Thinking',
            publisher: 'Microsoft Press',
            description:
              'In OBJECT THINKING, esteemed object technologist David West contends that the mindset makes the programmer—not the tools and techniques. Delving into the history, philosophy, and even politics of object-oriented programming, West reveals how the best programmers rely on analysis and conceptualization—on thinking—rather than formal process and methods. Both provocative and pragmatic, this book gives form to what’s primarily been an oral tradition among the field’s revolutionary thinkers—and it illustrates specific object-behavior practices that you can adopt for true object design and superior results. Gain an in-depth understanding of: Prerequisites and principles of object thinking. Object knowledge implicit in eXtreme Programming (XP) and Agile software development. Object conceptualization and modeling. Metaphors, vocabulary, and design for object development. Learn viable techniques for: Decomposing complex domains in terms of objects. Identifying object relationships, interactions, and constraints. Relating object behavior to internal structure and implementation design. Incorporating object thinking into XP and Agile practice.',
            pageCount: 368,
            averageRating: 4,
              smallThumbnail:
                'http://books.google.com/books/content?id=6JVCAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=6JVCAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            language: 'en',
            previewLink:
              'http://books.google.co.in/books?id=6JVCAwAAQBAJ&pg=PA268&dq=%5Bobject+Object%5D&hl=&cd=1&source=gbs_api',
            
           
       
        
        
        },
      ]);

      expect(purchaseClickedSpy).toHaveBeenCalled();
      expect(setPurchaseListItemsSpy).toHaveBeenCalled();
    }
  ));

  it('should call navigate method in  purchaseClicked() method and navigate to billingDetails page', async(() => {
    const navigateSpy = spyOn(router, 'navigate');

    component.purchaseClicked([
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
          language: 'en',
          previewLink:
            'http://books.google.co.in/books?id=6JVCAwAAQBAJ&pg=PA268&dq=%5Bobject+Object%5D&hl=&cd=1&source=gbs_api',
      },
    ]);
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith(['billingDetails']);
  }));

  it('should call clearCart() in Facade when clearCartClicked() in component is executed', inject(
    [BooksFacade],
    (facade: BooksFacade) => {
      const clearCartClickedSpy = spyOn(
        component,
        'clearCartClicked'
      ).and.callThrough();
      const clearCartFacadeSpy = spyOn(facade, 'clearCart');

      component.clearCartClicked({
        id: '0BSOg0oHhZ0C',
          title: 'Angular Momentum in Quantum Mechanics',
          publisher: 'Princeton University Press',
          description:
            'This book offers a concise introduction to the angular momentum, one of the most fundamental quantities in all of quantum mechanics. Beginning with the quantization of angular momentum, spin angular momentum, and the orbital angular momentum, the author goes on to discuss the Clebsch-Gordan coefficients for a two-component system. After developing the necessary mathematics, specifically spherical tensors and tensor operators, the author then investigates the 3-j, 6-j, and 9-j symbols. Throughout, the author provides practical applications to atomic, molecular, and nuclear physics. These include partial-wave expansions, the emission and absorption of particles, the proton and electron quadrupole moment, matrix element calculation in practice, and the properties of the symmetrical top molecule.',
          pageCount: 146,
          averageRating: 4,
            smallThumbnail:
              'http://books.google.com/books/content?id=0BSOg0oHhZ0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            thumbnail:
              'http://books.google.com/books/content?id=0BSOg0oHhZ0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
          language: 'en',
          previewLink:
            'http://books.google.co.in/books?id=0BSOg0oHhZ0C&pg=PA12&dq=angular&hl=&cd=1&source=gbs_api',
    
      });
      fixture.detectChanges();

      expect(clearCartClickedSpy).toHaveBeenCalled();
      expect(clearCartFacadeSpy).toHaveBeenCalled();
    }
  ));
});
