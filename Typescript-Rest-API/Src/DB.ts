
import mongoose from 'mongoose';

export async function startConnection() {
    await mongoose.connect('mongodb://localhost/ts-photo-gallery', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
    console.log('Db Is connected!');
}
