import { StackNavigator } from 'react-navigation';
import React from 'react';
import { Button, View } from 'react-native';
import styles from '../styles';
import * as ScreenModules from '../screens/*.js';

const btn = (title, callback, ...params) => (
  <View style={styles.headerButton}>
    <Button title={title} onPress={() => callback(...params)} />
  </View>
);

const SCREENS = {
  Main: { hideHeader: true },
  QRReader: { title: 'QR Reader' },
};

Object.entries(ScreenModules).forEach(([name, Module]) => {
  (SCREENS[name] || (SCREENS[name] = {})).screen = Module;
});
// SCREENS.Main.screen = ScreenModules.Backup;

const OPTIONS = {
  navigationOptions: ({ navigation }) => {
    const { params, routeName } = navigation.state;
    const screenInfo = SCREENS[routeName];
    const title = screenInfo.title || routeName;
    const header = screenInfo.hideHeader ? null : undefined;
    const headerRight = screenInfo.screen.headerRightLabel
      ? btn(screenInfo.screen.headerRightLabel(params), () => params.onHeaderRight())
      : undefined;

    return { title, header, headerRight };
  },
};

export default StackNavigator(SCREENS, OPTIONS);
