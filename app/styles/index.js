import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  tight_container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#4f9deb',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 30,
  },
  amountText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addr: {
    fontFamily: 'monospace',
    fontSize: 12,
    textAlign: 'center',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  logo: {
    width: 371,
    height: 37,
  },
  separator: {
    marginTop: 10,
  },
  helptext: {
    color: '#666',
    textAlign: 'center',
  },
  hbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButton: {
    marginRight: 10,
  },
  pincode: {
    fontFamily: 'monospace',
    fontSize: 20,
    marginVertical: 15,
    textAlign: 'center',
  },
  pincode_btn: {
    width: 50,
  },
  seed: {
    paddingLeft: 20,
    paddingTop: 20,
  },
  seedWord: {
    fontSize: 20,
    fontFamily: 'monospace',
  },
});
