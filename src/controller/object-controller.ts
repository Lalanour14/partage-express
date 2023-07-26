import { Router } from "express";
import Joi from 'joi';
import { objectRepository } from "../repository/object-repository";
import { ObjectId } from "mongodb";

export const objectController = Router();

objectController.get('/',async (req, res) => {
    res.json(await objectRepository.findAll());
});
/*objectController.get('/:id',async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).end('Invalid Id');
        return;
    }
    const object = await objectRepository.findById(req.params.id);
    if(!object) {
        res.status(404).end('Object Not Found');
        return;
    }
    res.json(object);

});*/

objectController.post('/', async (req,res) => {
    const object = req.body;
    const {error} = objectValidation.validate(object);
    if(error) {
        res.status(400).json(error);
        return;
    }
    await objectRepository.persist(object);
    res.status(201).json(object);
});




const objectValidation = Joi.object({
    label: Joi.string().required(),
    description: Joi.string().required(),
    user: Joi.object({
        name: Joi.string().required(),
        firstName: Joi.string().required(),
      address: Joi.string().required(),
      _id:Joi.string().required()
       
    }).required(),
    photo: Joi.array().items(Joi.string())
})