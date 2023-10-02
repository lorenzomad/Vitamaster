import { StyleSheet, Text, View, Button } from 'react-native';
import { Props } from '../types/types';

 const ProfileScreen = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <Text> This is the profile page</Text>
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