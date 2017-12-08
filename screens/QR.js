import {
  AsyncStorage,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import _ from 'lodash';
import { Button, Component } from '../components/*.js';
import QRCode from 'react-native-qrcode-image';


const styles = StyleSheet.create({
  qr: {
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  }

});

export default class QR extends Component {

  close() {
    this.props.navigation.goBack();
  }

  render() {
    const { hexTx } = this.props.navigation.state.params;
    const rawTx = Buffer.from(hexTx, 'hex').toString('base64');
    const { width, height } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <Text>
          This QR code contains the signed transaction.
          Scan it with an online-connected device to boardcast it to
          the internet.
        </Text>
        <View flex={1} />
        <View style={styles.qr}>
          <QRCode size={width - 20} value={rawTx} />
        </View>
        <View flex={1} />
        <Button onPress={this.close} title="CLOSE" />
      </View>
    );
  }

}


