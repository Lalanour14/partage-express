import { Router } from "express";
import Joi from 'joi';
import { userRepository } from "../repository/user-repository";
import { ObjectId } from "mongodb";

export const userController = Router();

userController.get('/',async (req, res) => {
    res.json(await userRepository.findAll());
});
/*userController.get('/:id',async (req, res) => {
    if(!userId.isValid(req.params.id)) {
        res.status(400).end('Invalid Id');
        return;
    }
    const user = await userRepository.findById(req.params.id);
    if(!user) {
        res.status(404).end('user Not Found');
        return;
    }
    res.json(user);

});*/

userController.post('/', async (req,res) => {
    const user = req.body;
    const {error} = userValidation.validate(user);
    if(error) {
        res.status(400).json(error);
        return;
    }
    await userRepository.persist(user);
    res.status(201).json(user);
});




const userValidation = Joi.object({
    name: Joi.string().required(),
    firstName: Joi.string().required(),
    address: Joi.string().required(),
    
    
})