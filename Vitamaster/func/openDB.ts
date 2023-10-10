import * as SQLite from 'expo-sqlite';

export const openDB = (name: string): SQLite.SQLiteDatabase => {
    //opens connection to the db with the given name, in case it doesn't exists, it is created
    console.log('connecting');
    return SQLite.openDatabase(`${name}.db`);
};
