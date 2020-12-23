const express = require('express');
const request = require('request');
import { IBook, BookItem } from '../../../../libs/book';

export const getbooks = (req, res, next) => {
    try{
        if (!req.params.searchItem){
            throw { status : 401 ,message : 'Bad request made'};
        }
        const searchItem = req.params.searchItem;
          request.get("https://www.googleapis.com/books/v1/volumes?q="+searchItem, (err, response, body) => {
            if (err) {
                return next(err);
            }
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
        id: book.id,
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        smallThumbnail: book.volumeInfo?.imageLinks.smallThumbnail,
        thumbnail: book.volumeInfo?.imageLinks.thumbnail,
        publisher: book.volumeInfo.publisher,
        pageCount: book.volumeInfo?.pageCount,
        averageRating: book.volumeInfo?.averageRating,
        language: book.volumeInfo?.language,
        previewLink: book.volumeInfo?.previewLink,
        purchaseInfo: book?.purchaseInfo
      });
    });
    return requiredDataOfBooks;
  };



