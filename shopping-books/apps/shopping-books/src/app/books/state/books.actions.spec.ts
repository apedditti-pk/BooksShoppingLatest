import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideMockStore } from '@ngrx/store/testing';

import { SearchService } from '../search/search.service';
import * as BookActions from './books.actions';
import { Load } from './books.actions';
import { Book , BookItem } from './book';

describe('Books Actions', () => {
  const initialState : BookItem[] =  [
      {
      id: '0BSOg0oHhZ0C',
        title: 'Angular Momentum in Quantum Mechanics',
        publisher: 'Princeton University Press',
        description: 'This book offers a concise introduction to the angular momentum, one of the most fundamental quantities in all of quantum mechanics. Beginning with the quantization of angular momentum, spin angular momentum, and the orbital angular momentum, the author goes on to discuss the Clebsch-Gordan coefficients for a two-component system. After developing the necessary mathematics, specifically spherical tensors and tensor operators, the author then investigates the 3-j, 6-j, and 9-j symbols. Throughout, the author provides practical applications to atomic, molecular, and nuclear physics. These include partial-wave expansions, the emission and absorption of particles, the proton and electron quadrupole moment, matrix element calculation in practice, and the properties of the symmetrical top molecule.',
        pageCount: 146,
        averageRating: 4,
          smallThumbnail: 'http://books.google.com/books/content?id=0BSOg0oHhZ0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          thumbnail: 'http://books.google.com/books/content?id=0BSOg0oHhZ0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
      }
    ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService, provideMockStore({})],
    }).compileComponents();
  }));

  it('should create action for Load with passed data', () => {
    const payload = { payload: 'angular' };
    expect(Load(payload)).toEqual({
      type: '[Book] Load Book',
      payload: 'angular',
    });
  });

  it('should create action for LoadSuccess with passed data', () => {
   
    const payload = { payload: initialState };
    expect(BookActions.LoadSuccess(payload)).toEqual({
      type: '[Book] Load Book Success',
      payload: initialState,
    });
  });

  it('should create action for LoadFail', () => {
    const payload = { payload: 'error' };
    expect(BookActions.LoadFail(payload)).toEqual({
      type: '[Book] Load Book Failure',
      payload: 'error',
    });
  });

  // it('should create action for AddToCart with passed data', () => {
  //   const payload = { payload: initialState };
  //   expect(BookActions.AddToCart(payload)).toEqual({
  //     type: '[Cart] Add To Cart',
  //     payload: initialState,
  //   });
  // });

  it('should create action for AddToCollections with passed data', () => {
    const purchaseInfo = [
      {
        address: 'flat no - 312, block a,\nsvs avaasa apartments, annapurna enclave, chandanagar',
        name: 'arthireddy pedditti',
        email: 'a@a.com',
        phoneNumber: '8019133370'
      }
    ];
    const collectionMock = [
      {
        id: '0BSOg0oHhZ0C',
          title: 'Angular Momentum in Quantum Mechanics',
         
          publisher: 'Princeton University Press',
          description: 'This book offers a concise introduction to the angular momentum, one of the most fundamental quantities in all of quantum mechanics. Beginning with the quantization of angular momentum, spin angular momentum, and the orbital angular momentum, the author goes on to discuss the Clebsch-Gordan coefficients for a two-component system. After developing the necessary mathematics, specifically spherical tensors and tensor operators, the author then investigates the 3-j, 6-j, and 9-j symbols. Throughout, the author provides practical applications to atomic, molecular, and nuclear physics. These include partial-wave expansions, the emission and absorption of particles, the proton and electron quadrupole moment, matrix element calculation in practice, and the properties of the symmetrical top molecule.',
        
      
            smallThumbnail: 'http://books.google.com/books/content?id=0BSOg0oHhZ0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            thumbnail: 'http://books.google.com/books/content?id=0BSOg0oHhZ0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
      
      }
    ];
    const payload = { payload: collectionMock, purchaseInfo};
    expect(BookActions.AddToCollections(payload)).toEqual({
      type: '[Collections] Add To Collections',
      payload: collectionMock,
      purchaseInfo
    });
  });

});
