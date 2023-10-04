import * as SQLite from 'expo-sqlite'
import { FileRead } from '../types/types'
import { exists } from 'react-native-fs'

//this module provides the functions to 
// connect to teh db,
//log the data and 
// access teh data
// using expo sqlite to provide data permanence to the app


const openDB = (name: string) : SQLite.SQLiteDatabase => {
    //opens connection to the db with the given name, in case it doesn't exists, it is created
    return  SQLite.openDatabase(`${name}.db`)
}



const logDay = (date: Date, db: SQLite.Database ): void => {
    //logs the provided date to the database
    const dateString: string = date.toString()
    
    console.log('logging date')
    
    db.transaction(
        (tx) => {
            tx.executeSql('INSERT INTO logs (date, done) values (?, 1);', [dateString]);
            
            console.log('date logged')
            tx.executeSql('SELECT * FROM logs;', [], (_, rows) => {
                console.log(JSON.stringify(rows))
            })
        }
    )
           
}



const readLogs = (db: SQLite.Database): string[] | null => {
    //reads the content of a file 

    console.log('reading db')

    let logs: string[] | null = null;
    db.transaction(
        tx => {
            tx.executeSql('SELECT * FROM logs;', [], (_, {rows : {_array}}) => {
                //assign the result of the read to the logs variable
                logs = _array;
            })
        }
    )
    console.log(logs)
    return logs; // returns the value or null depending on the transaction

}

export {openDB, logDay, readLogs}