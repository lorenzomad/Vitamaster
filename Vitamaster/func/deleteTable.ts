import * as SQLite from 'expo-sqlite';

export const deleteTable = (db: SQLite.SQLiteDatabase, loggingTable: string) => {
    // deletes ALL ITEMS from teh table
    db.transaction(
        tx => {
            tx.executeSql(`DELETE FROM ${loggingTable};`);
        }
    );
};
