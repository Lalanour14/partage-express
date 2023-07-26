import { Router } from "express";
import Joi from 'joi';
import { locationRepository } from "../repository/location-repository";
import { ObjectId } from "mongodb";
import { checkId } from "../../middleware";

export const locationController = Router();

locationController.get('/',async (req, res) => {
    res.json(await locationRepository.findAll());
});
locationController.get('/:id',async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).end('Invalid Id');
        return;
    }
    const location = await locationRepository.findById(req.params.id);
    if(!location) {
        res.status(404).end('location Not Found');
        return;
    }
    res.json(location);

});

locationController.post('/', async (req,res) => {
    const location = req.body;
    const {error} = locationValidation.validate(location);
    if(error) {
        res.status(400).json(error);
        return;
    }
    await locationRepository.persist(location);
    res.status(201).json(location);
});



const locationValidation = Joi.object({
    startLoc: Joi.date().required(),
    endLoc: Joi.date().required(),
    reserObject: Joi.string().required(),
    statusObject: Joi.string().required(),
    user: Joi.object({
        name: Joi.string().required(),
        firstName: Joi.string().required(),
      address: Joi.string().required(),
      _id:Joi.string().required()
       
    }).required(),
    object:Joi.object({
        _id:Joi.string().required(),
        label:Joi.string().required(),
        description :Joi.string().required(),
        photo: Joi.array().items(Joi.string())
    }).required()
});

locationController.delete('/:id', checkId, async (req, res) => {
    await locationRepository.remove(req.params.id);
    res.status(204).end();
});

locationController.patch('/:id', checkId, async (req, res) => {
    const validation = locationPatchValidation.validate(req.body, { abortEarly: false });
    if (validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    await locationRepository.update(req.params.id, req.body);
    res.json(req.body);
});

const locationPatchValidation = Joi.object({
    startLoc: Joi.date(),
    endLoc: Joi.date(),
    reserObject: Joi.string(),
    statusObject: Joi.string(),
    user: Joi.object({
        name: Joi.string(),
        firstName: Joi.string(),
      address: Joi.string(),
      _id:Joi.string()
       
    }),
    object:Joi.object({
        _id:Joi.string(),
        label:Joi.string(),
        description :Joi.string(),
        photo: Joi.array().items(Joi.string())
    })
});