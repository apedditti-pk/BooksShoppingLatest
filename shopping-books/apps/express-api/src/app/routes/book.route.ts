import * as express from 'express';
import * as book from '../book.controller';

export const router = express.Router();

router.get('/:searchItem',book.getbooks);
router.get('/', book.getbooks);
