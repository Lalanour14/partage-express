import { MongoClient } from "mongodb";
import { Object } from "../entities";
import { connection } from "./connection";



const collection = connection.db('Partage-express').collection<Object>('object');


export const objectRepository = {
    findAll() {
        return collection.find().toArray();
    },
    async persist(object: Object) {
        const result = await collection.insertOne(object);
        object._id = result.insertedId;
        return object;
    }
}