import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  btn_wrapper: {
    marginVertical: 10,
  },
});

export default ({ wrapperStyle, borderRadius = 200, ...params }) => (
  <View style={[styles.btn_wrapper, wrapperStyle]}>
    <Button
      large
      raised
      backgroundColor="#397af8"
      borderRadius={borderRadius}
      {...params}
    />
  </View>
);
