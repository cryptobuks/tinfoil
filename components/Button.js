import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'

export default (params) => (
  <View style={styles.btn_wrapper}>
    <Button
      large raised
      style={styles.btn}
      borderRadius={200}
      backgroundColor="#397af8"
      {...params} />
  </View>
);

const styles = StyleSheet.create({
  btn_wrapper: {
    marginVertical: 10,
  },
});
