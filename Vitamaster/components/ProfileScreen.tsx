import { StyleSheet, Text, View, Button } from 'react-native';
import { Props } from '../types/types';
import { logDay } from '../func/logging';

 const ProfileScreen = ({navigation}: Props) => {
  const today = new Date()

  return (
    <View style={styles.container}>
      <Text> This is the profile page</Text>
      <Button title='log date' onPress={() => logDay(today)}/>
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