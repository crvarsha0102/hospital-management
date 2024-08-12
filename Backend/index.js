import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';

const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb+srv://crvarsha0102:varsha0102@cluster0.fmtde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});


const port = 8000

app.get('/', (req, res) => {
    return res.send("Hello World!");
})

app.use('/auth',authRouter)


app.listen(port, (req, res) => {
    console.log('listening on port ' + port);
})

