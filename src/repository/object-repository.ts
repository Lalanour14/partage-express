import { MongoClient, ObjectId } from "mongodb";
import { Object } from "../entities";
import { connection } from "./connection";



const collection = connection.db('Partage-express').collection<Object>('object');


export const objectRepository = {
    findAll() {
        return collection.find().toArray();
    },
    findById(_id:string) {
        return collection.findOne(new ObjectId(_id));
    },
    async persist(object: Object) {
        const result = await collection.insertOne(object);
        object._id = result.insertedId;
        return object;
    },
    remove(_id:string) {
        return collection.deleteOne({_id:new ObjectId(_id)});
    },
    update(_id:string, object:Object) {
        return collection.updateOne({_id:new ObjectId(_id)}, {$set:object});
    }
}