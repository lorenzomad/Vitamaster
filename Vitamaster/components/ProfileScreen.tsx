import { StyleSheet, Text, View, Button} from 'react-native';
import { Props } from '../types/types';
import { logDay, readLogs, openDB } from '../func/logging';
import React, { useState , useEffect} from 'react';
import { Database } from 'expo-sqlite';
import { Logs } from 'expo';
  

const dbName: string = 'logging'

const db: Database = openDB(dbName)

const ProfileScreen = ({navigation}: Props) => {
  // logging screen of the app
  const [log, setLog] = useState <string [] | null>()


  useEffect (() => {
    db.transaction(
      (tx) => {
          tx.executeSql(
              'CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY NOT NULL, date TEXT, done INT);', 
              [], 
              () => {console.log('table created')}
              )
      }
    )

    setLog(readLogs(db))
    console.log(log)

  }, [])

  let logList: React.JSX.Element[] | undefined = undefined


  if (log != null){
    logList = log.map(date => {
      return <li><Text>{date}</Text></li>
    })
  }

  return (
    <View style={styles.container}>
      <Text> This is the profile page</Text>
      <Button title='log date' onPress={() => logDay(new Date(), db)}/>
      {logList ? <ul>{logList}</ul> : <Text>no logs</Text>}
      <Button title='Go home' onPress={
        () => {
          navigation.navigate("Home")
        }
      }/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default ProfileScreen;