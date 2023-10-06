import * as SQLite from 'expo-sqlite'

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
    // closes connection to given db
    db.closeAsync();
    console.log('connection closed')
}

const deleteTable = (db:SQLite.SQLiteDatabase, tableName: string) => {
    // deletes ALL ITEMS from teh table
    db.transaction(
        tx => {
            tx.executeSql(`DELETE FROM ${tableName};`)
        }
    )
} 

const createTable = (db: SQLite.SQLiteDatabase, tableName: string): void => {
    // creates the table if it does not exist
    db.transaction(
        (tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY NOT NULL, date TEXT, done INT);`
                )
        },
        () => { console.log(' table creation failed')},
        () => {console.log('table created')}
      )
}


const logDay = (date: Date, db: SQLite.SQLiteDatabase, tableName: string): void => {
    //logs the provided date to the database
    const dateString: string = date.toString()
    
    console.log('logging date')
    
    db.transaction(
        (tx) => {
            tx.executeSql(`INSERT INTO ${tableName} (date, done) values (?, 1);`, [dateString]);
            tx.executeSql(`SELECT * FROM ${tableName};`, [], (_, rows) => {
                console.log(JSON.stringify(rows))
            })

        }, 
        ()=> { console.log('logging error')},
        () => {  console.log('date logged')}
    )          
}

const readLogs = async (db: SQLite.SQLiteDatabase, tableName: string, setFunction: React.Dispatch<React.SetStateAction<any[] | undefined>>) => {
    //reads the content of the table and assigns to the function setFunction

    console.log('reading db')
    db.transactionAsync(
        async (tx) => {
            const result = await tx.executeSqlAsync(`SELECT * FROM ${tableName};`, [])
            setFunction(result.rows)
        }   
    )
}

export {openDB, logDay, readLogs, createTable, closeDB, deleteTable}