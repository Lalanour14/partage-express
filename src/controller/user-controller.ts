import { Router } from "express";
import Joi from 'joi';
import { userRepository } from "../repository/user-repository";
import { ObjectId } from "mongodb";
import { checkId } from "../../middleware";

export const userController = Router();

userController.get('/', async (req, res) => {
    res.json(await userRepository.findAll());
});
userController.get('/:id', async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).end('Invalid Id');
        return;
    }
    const user = await userRepository.findById(req.params.id);
    if (!user) {
        res.status(404).end('user Not Found');
        return;
    }
    res.json(user);

});

userController.post('/', async (req, res) => {
    const user = req.body;
    const { error } = userValidation.validate(user);
    if (error) {
        res.status(400).json(error);
        return;
    }
    await userRepository.persist(user);
    res.status(201).json(user);
});
userController.delete('/:id', checkId, async (req, res) => {
    await userRepository.remove(req.params.id);
    res.status(204).end();
});

userController.patch('/:id', checkId, async (req, res) => {
    const validation = userPacthValidation.validate(req.body, { abortEarly: false });
    if (validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    await userRepository.update(req.params.id, req.body);
    res.json(req.body);
});




const userValidation = Joi.object({
    name: Joi.string().required(),
    firstName: Joi.string().required(),
    address: Joi.string().required(),
});
const userPacthValidation = Joi.object({
    name: Joi.string(),
    firstName: Joi.string(),
    address: Joi.string(),


});

