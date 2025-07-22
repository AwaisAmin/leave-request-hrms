import express from 'express';
import cors from 'cors';
import leaveRouter from '../routes/leave';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/', leaveRouter);

app.get('/', (req, res) => {
  res.send('Leave Request Backend API');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 