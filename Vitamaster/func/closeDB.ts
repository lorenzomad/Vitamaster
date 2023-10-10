import * as SQLite from 'expo-sqlite';

export const closeDB = (db: SQLite.SQLiteDatabase) => {
    // closes connection to given db
    db.closeAsync();
    console.log('connection closed');
};
