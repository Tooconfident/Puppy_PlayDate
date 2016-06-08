const _background = '#FFF';
const _opacity = .4;
const _inputBackground = '#666';

var Dimensions = require('Dimensions')
var {width, height} = Dimensions.get('window');

module.exports = require('react-native').StyleSheet.create({
  center: {
    justifyContent: 'center'
  },
  bImage: {
    flex: 1,
    //resizeMode: 'stretch',
    //borderWidth: 2,
    margin: 0,
    width: null,
    height: null,
  },
  blur: {
    flex: 1,
    backgroundColor: _background,
    opacity: _opacity,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'column',
    // borderWidth: 3,
    // margin: 0,
    // padding: 0,
    backgroundColor: '#ffb272',
  },
  innerContainer: {
    flex: 1,
    //borderWidth: 1,
    borderColor: 'red',
    // make things inside inner container centered
    justifyContent: 'center',
    marginTop: 64, // need this because of the navigation bar
  },
  topMargin:{
      height:20,
  },
  input:{
    height: 40,
    marginBottom:0,
    borderRadius:5,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: _inputBackground,
    color: '#FFF',
    alignItems: 'center',
  },
  button:{
    borderRadius: 4,
    borderColor:'#bbb',
    backgroundColor: '#333',
    borderWidth: 1,
    padding: 5,
    flex: 1,
  },
  outterMargin:{
    flex: 1,
  },
  mainContent: {
    flex: 0.8,
    //borderWidth: 1,
    // make things inside inner container centered
    justifyContent: 'center',
  },
  pageHeading: {
    alignSelf: 'center',
    fontSize: 18,
    marginBottom: 48,
    backgroundColor: 'transparent',
    color: '#ffb272',
    fontWeight: 'bold',
  },
  inputText: {
    height: 50,
    //marginTop: 10,
    marginBottom: 12,
    marginLeft: 24,
    marginRight: 24,
    padding: 12,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: '#904507',
    backgroundColor: 'rgba(255, 156, 74, 0.75)'//'#ff9c4a',
  },
  textArea: {
    height: 150,
  },
  submitButton: {
    height: 50,
    backgroundColor: '#904507',
    alignSelf: 'stretch',
    //marginTop: 10,
    padding: 12,
    borderWidth: 1,
    borderRadius: 9,
    justifyContent: 'center',
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 12,
  },
  signupButton: {
    height: 50,
    backgroundColor: '#de6909',
    alignSelf: 'stretch',
    //marginTop: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffb272',
    fontSize: 18,
    alignSelf: 'center',
  },
  pageFooter: {
    //borderWidth: 2,
    flex: 0.2,
  },
});
