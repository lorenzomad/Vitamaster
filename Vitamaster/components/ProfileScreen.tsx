import { StyleSheet, Text, View, Button, FlatList, SafeAreaView} from 'react-native';
import { Props } from '../types/types';
import { logDay, readLogs, openDB, createTable, deleteTable } from '../func/logging';
import React, { useState , useEffect} from 'react';
import { SQLiteDatabase } from 'expo-sqlite';


const tableName: string = 'logs'
const dbName: string = 'logging'

let db: SQLiteDatabase 

const ProfileScreen = ({navigation}: Props) => {
  // logging screen of the app
  const [dates, setDates] = useState <any[]> ()


  useEffect (() => {

    const  startDb = async () => {
      db = openDB(dbName)
      createTable(db, tableName);    
    }

    startDb()
    
    // return () => {closeDB(db)}
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
      <Text> This is the profile page</Text>
      <Button title='log date' onPress={() => logDay(new Date(), db, tableName)}/>
      <Button title='read logs' onPress={ async () => {
        await readLogs(db, tableName, setDates)
        console.log(dates)
      }}/>
      <Button title='delete logs' onPress={() => deleteTable(db, tableName)}/>
      {dates != null ? 
        <FlatList key={0}
          data={dates}
          renderItem={({item}) => <Text>{JSON.stringify(item.date)}</Text>}
          keyExtractor={(item) => item.id}
        /> 
      : 
        <Text>no logs</Text>
      }
      <Button title='Go home' onPress={
        () => {
          navigation.navigate("Home")
        }
      }/>
    </SafeAreaView>
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