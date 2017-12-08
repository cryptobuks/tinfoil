import React from 'react';
import { bool, func } from 'prop-types';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import Component from '../components/Component';

const { Constants: { isDevice } } = Expo; // eslint-disable-line

class QRReader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: false,
    };
  }

  async componentWillMount(nextProps) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  onBarCodeRead({ data }) {
    this.props.navigation.state.params.onQR(data);
    this.props.navigation.goBack();
  }

  render() {
    const { onClose } = this.props;
    const { hasCameraPermission } = this.state;

    return (
      <View style={styles.QRReader}>
        { isDevice && hasCameraPermission &&
          <BarCodeScanner
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            onBarCodeRead={this.onBarCodeRead}
            style={StyleSheet.absoluteFill}
          /> }
        <View style={styles.border}>
          { hasCameraPermission
              ? <Text style={styles.hint}>Place the code inside the frame</Text>
              : <Text style={styles.hint}>Give the app camera permissions in order to read QR codes</Text>
          }
        </View>
        <View style={styles.content} >
          <View style={styles.border} />
          <View style={styles.area} />
          <View style={styles.border} />
        </View>
        <View style={styles.border} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  QRReader: {
    zIndex: 10000,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },

  hint: {
    color: '#fff',
  },

  content: {
    flexDirection: 'row',
  },

  border: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  area: {
    height: 320,
    maxHeight: 320,
    width: 320,
    maxWidth: 320,
  },

  button: {
    alignSelf: 'center',
  },
});
export default QRReader;
