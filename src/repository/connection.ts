import { MongoClient } from "mongodb";


export const connection = new MongoClient(process.env.DATABASE_URL!);

function cleanUp() {
    connection.close();
    process.exit();
}

process.on('SIGINT', cleanUp);
process.on('SIGTERM', cleanUp);