
import { model, Schema, Document } from 'mongoose';

 const photoSchema = new Schema({
     Title: {type: String, required: true, min: 6, max: 256}, 
     Description: {type: String, required: true, min: 6, max: 256}, 
     ImagePath: {type: String, required: true, min: 6, max: 256},
     Date: {type: Date, default: Date.now}
 });

 interface IPhoto extends Document{
    Title: string;
    Description: string;
    ImagePath: string;
    Date: Date
 }

 export default model<IPhoto>('Photo', photoSchema);

