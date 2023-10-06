import * as SQLite from 'expo-sqlite'
import { Dispatch, FunctionComponent, SetStateAction } from 'react'

//this module provides the functions to 
// connect to teh db,
//log the data and 
// access teh data
// using expo sqlite to provide data permanence to the app


const openDB = (name: string) : SQLite.SQLiteDatabase => {
    //opens connection to the db with the given name, in case it doesn't exists, it is created
    console.log('connecting')
    return SQLite.openDatabase(`${name}.db`)
}

const closeDB = (db:SQLite.SQLiteDatabase) => {
    db.closeAsync();
    console.log('connection closed')
}

const deleteTable = (db:SQLite.SQLiteDatabase) => {
    db.transaction(
        tx => {
            tx.executeSql('DELETE FROM logs;')
        }
    )
} 

const createTable = (db: SQLite.SQLiteDatabase): void => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY NOT NULL, date TEXT, done INT);' 
                )
        },
        () => { console.log(' table creation failed')},
        () => {console.log('table created')}
      )
}


const logDay = (date: Date, db: SQLite.SQLiteDatabase ): void => {
    //logs the provided date to the database
    const dateString: string = date.toString()
    
    console.log('logging date')
    
    db.transaction(
        (tx) => {
            tx.executeSql('INSERT INTO logs (date, done) values (?, 1);', [dateString]);
            tx.executeSql('SELECT * FROM logs;', [], (_, rows) => {
                console.log(JSON.stringify(rows))
            })

        }, 
        ()=> { console.log('logging error')},
        () => {  console.log('date logged')}
    )          
}

const readLogs = async (db: SQLite.SQLiteDatabase, setFunction) => {
    //reads the content of a file 

    console.log('reading db')
    db.transactionAsync(
        async (tx) => {
            const result = await tx.executeSqlAsync('SELECT * FROM logs;', [])
            setFunction(result.rows)
        }   
    )
}

export {openDB, logDay, readLogs, createTable, closeDB, deleteTable}