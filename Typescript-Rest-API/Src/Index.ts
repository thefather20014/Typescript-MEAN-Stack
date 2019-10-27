
import app from './app';
import {startConnection} from './DB';

async function main() {

    // Connect Database
    startConnection();
    
    //Listening the server
    await app.listen(app.get('port'));
    console.log(`Server on port ${app.get('port')}`);
}

main();
