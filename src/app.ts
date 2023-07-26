import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { objectController } from './controller/object-controller';
import { userController } from './controller/user-controller';
const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/object', objectController);
app.use('/api/user', userController);
app.listen(port, () => {
    console.log('Server is listening on http://localhost:'+port);
})