import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatMenuModule,
  MatButtonModule,
  MatInputModule,
} from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';

import { BookItem } from '../state/book';
import * as fromBook from '../state/books.reducer';
import { BooksFacade } from '../state/books.facade';
import { SearchComponent } from './search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { EllipsisModule } from 'ngx-ellipsis';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListModule } from '../shared/book-list/book-list.module';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockStore: MockStore;
  let mockCollectionBooksSelector: MemoizedSelector<fromBook.State, any>;
  let router;

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
        language: 'en',

      type: '[Cart] Add To Cart',
      purchaseInfo: {
        address:
          'flat no - 312, block a,\nsvs avaasa apartments, annapurna enclave, chandanagar',
        name: 'arthireddy pedditti',
        email: 'a@test.com',
        phoneNumber: '8019133370',
      },
    },
    {
      id: '6JVCAwAAQBAJ',
        publisher: 'Microsoft Press',
        description:
          'In OBJECT THINKING, esteemed object technologist David West contends that the mindset makes the programmer—not the tools and techniques. Delving into the history, philosophy, and even politics of object-oriented programming, West reveals how the best programmers rely on analysis and conceptualization—on thinking—rather than formal process and methods. Both provocative and pragmatic, this book gives form to what’s primarily been an oral tradition among the field’s revolutionary thinkers—and it illustrates specific object-behavior practices that you can adopt for true object design and superior results. Gain an in-depth understanding of: Prerequisites and principles of object thinking. Object knowledge implicit in eXtreme Programming (XP) and Agile software development. Object conceptualization and modeling. Metaphors, vocabulary, and design for object development. Learn viable techniques for: Decomposing complex domains in terms of objects. Identifying object relationships, interactions, and constraints. Relating object behavior to internal structure and implementation design. Incorporating object thinking into XP and Agile practice.',
          smallThumbnail:
            'http://books.google.com/books/content?id=6JVCAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=6JVCAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        language: 'en',
      type: '[Cart] Add To Cart',
      purchaseInfo: {
        address:
          'flat no - 312, block a,\nsvs avaasa apartments, annapurna enclave, chandanagar',
        name: 'arthireddy pedditti',
        email: 'a@test.com',
        phoneNumber: '8019133370',
      },
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent, BookDetailComponent],
      imports: [
        BrowserAnimationsModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatInputModule,
        FormsModule,
        EllipsisModule,
        BookListModule,
        RouterTestingModule.withRoutes([
          { path: 'search/bookDetail/:id', component: BookDetailComponent },
        ]),
      ],
      providers: [
        BooksFacade,
        provideMockStore({
          initialState,
        }),
      ],
    }).compileComponents();

    mockStore = TestBed.get(MockStore);
    mockCollectionBooksSelector = mockStore.overrideSelector(
      fromBook.getBooks,
      initialState
    );
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign books$ when component is resolved', async(() => {
    fixture.detectChanges();
    component.books$.forEach((element) => {
      expect(element[0].id).toEqual('6JVCAwAAQBAJ');
    });
  }));

  it('should call clearCart() in Facade when clearCartClicked() in component is executed', inject(
    [BooksFacade],
    (facade: BooksFacade) => {
      const serachBtnClickedSpy = spyOn(
        component,
        'searchBtnClicked'
      ).and.callThrough();
      const loadAllFacadeSpy = spyOn(facade, 'loadAll');

      component.searchBtnClicked();
      fixture.detectChanges();

      expect(serachBtnClickedSpy).toHaveBeenCalled();
      expect(loadAllFacadeSpy).toHaveBeenCalled();
    }
  ));

  it('should call clearCart() in Facade when clearCartClicked() in component is executed', async(() => {
    const bookSelectedSpy = spyOn(component, 'bookSelected').and.callThrough();
    const navigateSpy = spyOn(router, 'navigate');

    component.bookSelected('2dOq4BHuASwC');
    fixture.detectChanges();

    expect(bookSelectedSpy).toHaveBeenCalledWith('2dOq4BHuASwC');
    expect(navigateSpy).toHaveBeenCalled();
  }));
});
