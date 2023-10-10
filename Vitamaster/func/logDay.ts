import * as SQLite from 'expo-sqlite';

export const logDay = async (date: Date, db: SQLite.SQLiteDatabase, loggingTable: string): Promise<void> => {
    //logs the provided date to the database
    const day: number = date.getDate();
    const month: number = date.getMonth();
    const year: number = date.getFullYear();

    const dateString: string = `${day}/${month}/${year}`;

    console.log('logging date');

    let result: any[] = [];

    await db.transactionAsync(
        async (tx) => {
            result = (await tx.executeSqlAsync(`SELECT * FROM ${loggingTable};`, [])).rows;
        }
    );

    if (result != null) {
        console.log(`result is ${result}`);

    } else {
        db.transaction(
            (tx) => {
                tx.executeSql(`INSERT INTO ${loggingTable} (date, done) values (?, 1);`, [dateString]);

                tx.executeSql(`SELECT * FROM ${loggingTable};`, [], (_, rows) => {
                    console.log(JSON.stringify(rows));
                });

            },
            () => { console.log('logging error'); },
            () => { console.log('date logged'); }

        );
        return;
    }

    let loggedDates: string[] = [];
    result.forEach(element => {
        loggedDates.push(element.date);
    });
    console.log(`logged dates is ${loggedDates}`);


    if (!loggedDates.includes(dateString)) {
        db.transaction(
            (tx) => {
                tx.executeSql(`INSERT INTO ${loggingTable} (date, done) values (?, 1);`, [dateString]);

                tx.executeSql(`SELECT * FROM ${loggingTable};`, [], (_, rows) => {
                    console.log(JSON.stringify(rows));
                });

            },
            () => { console.log('logging error'); },
            () => { console.log('date logged'); }
        );
    }


};
