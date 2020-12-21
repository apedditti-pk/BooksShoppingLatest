import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatMenuModule,
  MatButtonModule,
} from '@angular/material';
import { MatListModule } from '@angular/material/list';

import { BooksFacade } from '../state/books.facade';
import { MyCollectionComponent } from './my-collection.component';
import * as fromBook from '../state/books.reducer';
import { FormsModule } from '@angular/forms';
import { EllipsisModule } from 'ngx-ellipsis';
import { BookListModule } from '../shared/book-list/book-list.module';

describe('MyCollectionComponent', () => {
  let component: MyCollectionComponent;
  let fixture: ComponentFixture<MyCollectionComponent>;
  let mockStore: MockStore;
  let mockCollectionBooksSelector: MemoizedSelector<fromBook.State, any>;

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
      declarations: [MyCollectionComponent],
      providers: [
        BooksFacade,
        provideMockStore({
          initialState,
        }),
      ],
      imports: [
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatMenuModule,
        MatButtonModule,
        FormsModule,
        EllipsisModule,
        MatListModule,
        BookListModule,
        RouterTestingModule,
      ],
    }).compileComponents();
    mockStore = TestBed.get(MockStore);
    //  const getBookFeatureState = createFeatureSelector<fromBook.BooksState>('books');
    mockCollectionBooksSelector = mockStore.overrideSelector(
      fromBook.getCollectionItems,
      initialState
    );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign collectionBooks$ when component is resolved', async(() => {
    component.collectionBooks$.forEach((element) => {
      expect(element[0].id).toEqual('6JVCAwAAQBAJ');
    });
  }));
});
