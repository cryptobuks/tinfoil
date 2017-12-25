import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import RootNavigation from './navigation/RootNavigation';
import styles from './styles';

export default class App extends React.Component {
  state = {};

  render() {
    return (
      <View flex={1}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        <RootNavigation />
      </View>
    );
  }
}
