import * as SQLite from 'expo-sqlite';

export const readLogs = async (db: SQLite.SQLiteDatabase, loggingTable: string, setFunction: React.Dispatch<React.SetStateAction<any[] | undefined>>) => {
    //reads the content of the table and assigns to the function setFunction
    console.log('reading db');
    db.transactionAsync(
        async (tx) => {
            const result = await tx.executeSqlAsync(`SELECT * FROM ${loggingTable};`, []);
            setFunction(result.rows);
        }
    );
};
