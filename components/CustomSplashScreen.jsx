import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const CustomSplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/smoothieCup.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  }
});

export default CustomSplashScreen;
