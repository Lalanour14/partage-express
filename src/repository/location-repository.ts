import { MongoClient, ObjectId } from "mongodb";
import { Location } from "../entities";
import { connection } from "./connection";



const collection = connection.db('Partage-express').collection<Location>('location');


export const locationRepository = {
    findAll() {
        return collection.find().toArray();
    },
    findById(_id:string) {
        return collection.findOne(new ObjectId(_id));
    },
    async persist(location: Location) {
        const result = await collection.insertOne(location);
        location._id = result.insertedId;
        return location;
    },
    remove(_id:string) {
        return collection.deleteOne({_id:new ObjectId(_id)});
    },
    update(_id:string, object:Object) {
        return collection.updateOne({_id:new ObjectId(_id)}, {$set:object});
    }
}


