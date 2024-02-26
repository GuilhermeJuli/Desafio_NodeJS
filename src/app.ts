import express, { Application, Request, Response } from 'express';
import mongoose, { Document, Schema } from 'mongoose';
import bodyParser from 'body-parser';
import { DateTime } from 'luxon';
import * as controllers from './controllers/controller';

const app: Application = express();
const port: number = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  'mongodb+srv://guilhermemoraesjulio90:920598@users.ymdo1lp.mongodb.net/?retryWrites=true&w=majority&appName=Users',
);

interface IClient extends Document {
  name: string;
  date: Date;
}

const Client = mongoose.model<IClient>('User', new Schema({
  name: String,
  date: {
    type: Date,
    default: () => DateTime.now().setZone('America/Sao_Paulo').toJSDate(),
  },
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Hey! This is my API.');
});

app.post('/register', (req: Request, res: Response) => {
  const client = new Client({
    name: req.body.name,
    date: req.body.date,
  });
  client.save();
  res.send('Client registered successfully');
});

app.get('/clients', async (req: Request, res: Response) => {
  const users = await Client.find();
  res.send(users);
});

app.get('/bet/:id/:risc/:bet/:lines', async (req: Request, res: Response) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).send('Client not found');
    }
    const result = controllers.CalculateMultiplier(req.params.risc, parseInt(req.params.bet), parseInt(req.params.lines));
    res.send({
      name: client.name,
      result: result,
    });
    console.log(`name: ${client.name}, result: ${result}, lines: ${req.params.risc}, bet: ${req.params.bet}, risc: ${req.params.lines}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/clients/:id', async (req: Request, res: Response) => {
  const client = await Client.findByIdAndDelete(req.params.id);
  res.send(client);
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default server;
