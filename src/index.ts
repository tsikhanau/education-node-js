import {app} from './app'
import {SETTINGS} from './settings'
import {connectToDB} from "./db/mongo-db";

const start = async () => {
    if(!await connectToDB()) {
        return
    }
    app.listen(SETTINGS.PORT, () => {
        console.log('...server started')
    })
}

start();