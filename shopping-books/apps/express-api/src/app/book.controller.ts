const express = require('express');
const request = require('request');
const router = express.Router();
const app = express();


export const getbooks = (req, res) => {
    try{
        if(!req.params.searchItem){
            throw { status : 401 ,message : 'Bad request made'};
        }
        const searchItem = req.params.searchItem;
        request({
            uri: 'https://www.googleapis.com/books/v1/volumes?q='+searchItem,
            function(error, response, body) {
              if (!error && response.statusCode === 200) {
                console.log(body);
                res.send(body);
              } else {
                res.send(error);
              }
            }
          });

    }catch(err){
        res.status(err.status).send(err.message);
    }
};



