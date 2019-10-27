// Imports
import express from 'express';
import morgan from 'morgan';
import indexRoutes from './Routes/Routes';
import path from 'path';
import { mongo } from 'mongoose';
import cors from 'cors';

// Initializations
const app = express();

//Settings
app.set('port', process.env.Port || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

//Routes
app.use('/api', indexRoutes);

//This folder for this application will be used to store public files
app.use('/Uploads', express.static(path.resolve('Uploads')));

export default app; 