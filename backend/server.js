import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js'


connectDB();
const app = express();

app.use((req, res, next) => {
    res.set("Cache-Control", "no-store, no-cache");
     next();
    });
  

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
app.use('/api/users',userRoutes);
app.use('/api/users/admin',adminRoutes);

app.get('/', (req, res) => res.send('Server is Ready'));
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));