
import Model from '../Model/Photo';
import {Request, Response} from 'express';
import path from 'path';
import fs from 'fs-extra';

const Crlt = {};

export async function getPhotos(req: Request, res: Response): Promise<Response> {

    const photos = await Model.find();
    return res.json(photos);
}; 

export async function getPhoto(req: Request, res: Response): Promise<Response> {

    const photo = await Model.findById(req.params.id);
    return res.json(photo);
}; 

export async function getByTitle(req: Request, res: Response): Promise<Response> {

    const { Title } = req.body;

    const photo = await Model.find({Title});
    return res.json(photo);
}; 

export async function createPhoto(req: Request, res: Response): Promise<Response> {

    const { Title, Description } = req.body;

    const photo = new Model({
        Title,
        Description,
        ImagePath: req.file.path
    });

    await photo.save();
    return res.json({status: "Photo Successfull Saved!", photo});
}; 

export async function updatePhoto(req: Request, res: Response): Promise<Response> {

    const { Title, Description } = req.body;
    const { id } = req.params;

    const photoDeleted = await Model.findById(id);

    if(photoDeleted) 
    {
        await fs.unlink(path.resolve(photoDeleted.ImagePath));
    }

    const newPhoto = {
        Title,
        Description,
        ImagePath: req.file.path
    };

    const photoUpdated = await Model.findByIdAndUpdate(id, {$set: newPhoto}, {new: true});

    return res.json({status: "Photo Successfull Updated!", photoUpdated});
}; 

export async function deletePhoto(req: Request, res: Response): Promise<Response> {

    const { id } = req.params;

    const photoDeleted = await Model.findByIdAndRemove(id);

    if(photoDeleted) 
    {
        await fs.unlink(path.resolve(photoDeleted.ImagePath));
    }

    return res.json({status: "Photo Successfull Deleted!", photoDeleted});
}; 