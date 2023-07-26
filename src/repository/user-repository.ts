import { MongoClient } from "mongodb";
import { User } from "../entities";
import { connection } from "./connection";



const collection = connection.db('Partage-express').collection<User>('user');


export const userRepository = {
    findAll() {
        return collection.find().toArray();
    },
    async persist(user: User) {
        const result = await collection.insertOne(user);
        user._id = result.insertedId;
        return user;
    }
}