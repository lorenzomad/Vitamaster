import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={{
        uri:"https://i0.wp.com/www.additudemag.com/wp-content/uploads/2017/04/vitamins-26622_1280.jpg",}}
        style={{width:200, height:200}}
        />
      <Text> This will change your life I swear</Text>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
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
