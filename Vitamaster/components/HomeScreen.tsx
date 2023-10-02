import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { Props } from '../types/types';

 const HomeScreen = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
        <Text> This is the home page</Text>
        <Button title='Profile' onPress={
            () => {
                navigation.navigate("Profile")
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


export default HomeScreen;