import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { MemoizedSelector } from '@ngrx/store';
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatMenuModule,
  MatButtonModule,
  MatListModule,
} from '@angular/material';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { EllipsisModule } from 'ngx-ellipsis';

import { BooksFacade } from '../../state/books.facade';
import { BookDetailComponent } from './book-detail.component';
import * as fromBook from '../../state/books.reducer';
import { Router } from '@angular/router';
import { Book, BookItem } from '../../state/book';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let mockStore: MockStore;
  let mockCollectionBooksSelector: MemoizedSelector<fromBook.State, any>;
  let router;
  const books: BookItem[] = 
    [{
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
    }];
  const initialState: BookItem = 
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
  
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BookDetailComponent,
      ],
      providers: [BooksFacade, provideMockStore({})],
      imports: [
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatMenuModule,
        MatButtonModule,
        FormsModule,
        EllipsisModule,
        MatListModule,
        RouterTestingModule.withRoutes([
          {path: 'billingDetails', component: BookDetailComponent}
        ])
      ],
    }).compileComponents();
    router = TestBed.get(Router);
    mockStore = TestBed.get(MockStore);
    //  const getBookFeatureStaste = createFeatureSelector<fromBook.BooksState>('books');
    mockCollectionBooksSelector = mockStore.overrideSelector(
      fromBook.getBooks,
      books
    );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBook() method when component is resolved ', async(() => {
    spyOn(component, 'ngOnInit').and.callThrough();
    spyOn(component, 'getBook').and.callThrough();

    fixture.detectChanges();
    component.ngOnInit();

    expect(component.getBook).toHaveBeenCalled();
    component.bookId = '6JVCAwAAQBAJ';
    fixture.detectChanges();
    //expect(component.book.id).toEqual(component.bookId);
  }));

  it('should call addToCart() method ', inject(
    [BooksFacade],
    (facade : BooksFacade) => {
    spyOn(component, 'addToCart').and.callThrough();
    const spy = spyOn(facade, 'addToCart');

    component.addToCart(initialState);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  }));

  it('should call buyNow() method ', inject(
    [BooksFacade],
    (facade : BooksFacade) => {
    spyOn(component, 'buyNow').and.callThrough();
    const navigateSpy = spyOn(router, 'navigate');
    const spy = spyOn(facade, 'purchaseListItems');

    component.buyNow(initialState);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith(['billingDetails']);
  }));
});
