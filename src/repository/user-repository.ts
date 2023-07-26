import { MongoClient, ObjectId } from "mongodb";
import { User } from "../entities";
import { connection } from "./connection";



const collection = connection.db('Partage-express').collection<User>('user');


export const userRepository = {
    findAll() {
        return collection.find().toArray();
    },
    findById(_id:string) {
        return collection.findOne(new ObjectId(_id));
    },
    async persist(user: User) {
        const result = await collection.insertOne(user);
        user._id = result.insertedId;
        return user;
    },
    remove(_id:string) {
        return collection.deleteOne({_id:new ObjectId(_id)});
    },
    update(_id:string, object:Object) {
        return collection.updateOne({_id:new ObjectId(_id)}, {$set:object});
    }
}