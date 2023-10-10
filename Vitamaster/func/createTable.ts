import * as SQLite from 'expo-sqlite';

export const createTable = (db: SQLite.SQLiteDatabase, loggingTable: string): void => {
    // creates the table if it does not exist
    db.transaction(
        (tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS ${loggingTable} (id INTEGER PRIMARY KEY NOT NULL, date TEXT, done INT);`
            );
        },
        () => { console.log(' table creation failed'); },
        () => { console.log('table created'); }
    );
};
