
import { Router }from 'express';
import  { createPhoto, getPhoto, getPhotos, deletePhoto, updatePhoto, getByTitle } from '../Controller/Photo.Controller';
import multer from '../Libs/Multer';

const router = Router();

router.route('/photos')
.get(getPhotos)
.post(multer.single('image'), createPhoto);

router.route('/photos/:id')
.get(getPhoto)
.put(multer.single('image') ,updatePhoto)
.delete(deletePhoto);

router.route('/photos/:title')
.get(getByTitle);

export default router;