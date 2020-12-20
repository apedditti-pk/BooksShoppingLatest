const express = require('express');
const request = require('request');
import { IBook, BookItem } from '../../../shopping-books/src/app/books/state/book';

export const getbooks = (req, res, next) => {
    try{
        if(!req.params.searchItem){
            throw { status : 401 ,message : 'Bad request made'};
        }
        const searchItem = req.params.searchItem;
          request.get("https://www.googleapis.com/books/v1/volumes?q='+searchItem", (err, body) => {
            if (err) {
                return next(err);
            }
           // console.log(filterBooks(JSON.parse(body).items));
            res.send(filterBooks(JSON.parse(body).items));
        });

    }catch(err){
        res.status(err.status).send(err.message);
    }
};

export const filterBooks = (books: BookItem[]) => {
    const requiredDataOfBooks: IBook[] = [];
    books.forEach((book) => {
      requiredDataOfBooks.push({
        kind: book.kind,
        id: book.id,
        etag: book.etag,
        selfLink: book.selfLink,
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        smallThumbnail: book.volumeInfo?.imageLinks.smallThumbnail,
        thumbnail: book.volumeInfo?.imageLinks.thumbnail,
        publisher: book.volumeInfo.publisher,
        publishedDate: book.volumeInfo?.publishedDate,
        pageCount: book.volumeInfo?.pageCount,
        printType: book.volumeInfo?.printType,
        averageRating: book.volumeInfo?.averageRating,
        ratingsCount: book.volumeInfo?.ratingsCount,
        maturityRating: book.volumeInfo?.maturityRating,
        allowAnonLogging: book.volumeInfo?.allowAnonLogging,
        contentVersion: book.volumeInfo?.contentVersion,
        language: book.volumeInfo?.language,
        previewLink: book.volumeInfo?.previewLink,
        infoLink: book.volumeInfo?.infoLink,
        canonicalVolumeLink: book.volumeInfo?.canonicalVolumeLink,
        saleInfo: book?.saleInfo,
        accessInfo: book.accessInfo,
        searchInfo: book.searchInfo,
        purchaseInfo: book?.purchaseInfo
      });
    });
    return requiredDataOfBooks;
  };



