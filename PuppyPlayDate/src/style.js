import { StyleSheet } from 'react-native';

const _background = '#FFF';
const _opacity = .4;
const _inputBackground = '#666';

var Dimensions = require('Dimensions')
var {width, height} = Dimensions.get('window');

module.exports = StyleSheet.create({
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
    //  borderWidth: 3,
    // margin: 0,
    // padding: 0,
    backgroundColor: '#9cff92',
  },
  innerContainer: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'red',
    // make things inside inner container centered
    justifyContent: 'center',
    marginTop: 64, // need this because of the navigation bar
  },
  topMargin: {
      height:20,
  },
  input: {
    height: 40,
    marginBottom:0,
    borderRadius:5,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: _inputBackground,
    color: '#FFF',
    alignItems: 'center',
  },
  button: {
    borderRadius: 4,
    borderColor:'#bbb',
    backgroundColor: '#333',
    borderWidth: 1,
    padding: 5,
    flex: 1,
  },
  addButton: {
    height: 30,
    backgroundColor: '#114800',
    alignSelf: 'center',
    //marginTop: 10,
    padding: 12,
    borderWidth: 1,
    borderRadius: 9,
    justifyContent: 'center',
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 12,
    marginTop: 12,
  },
  addButtonText: {
    color: '#77ed6b',
    fontSize: 14,
    alignSelf: 'center',
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
    color: '#77ed6b',
    fontWeight: 'bold',
  },
  inputLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    alignSelf: 'flex-start',
  },
  inputText: {
    color: 'rgb(239,239,239)',
    height: 40,
    //marginTop: 10,
    marginBottom: 12,
    marginLeft: 24,
    marginRight: 24,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: '#114800',
    backgroundColor: 'rgba(51, 31, 14, 0.40)'//'#ff9c4a',
  },
  textArea: {
    height: 150,
  },
  submitButton: {
    height: 35,
    backgroundColor: '#114800',
    alignSelf: 'stretch',
    //marginTop: 10,
    padding: 12,
    borderWidth: 1,
    borderRadius: 9,
    justifyContent: 'center',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 40,
    marginBottom: 12,
  },
  signupButton: {
    height: 35,
    backgroundColor: '#479030',
    alignSelf: 'stretch',
    //marginTop: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#77ed6b',
    fontSize: 18,
    alignSelf: 'center',
  },
  pageFooter: {
    //borderWidth: 2,
    flex: 0.2,
  },
  profileEntry: {
    //alignItems: 'center',
    //borderTopWidth: 1,
    borderBottomWidth: 1,
    // paddingLeft: 6,
    // paddingRight: 6,
    padding: 12,
    marginLeft: 12,
    marginRight: 12,
  },
  entryLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  entryText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  profileAvatar: {
    width: 128,
    height: 128,
    borderRadius: 128/2,
    borderWidth: 1,
    alignSelf: 'center',
    marginBottom: 12,
    marginTop: 0,
  },
  listEntry: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgb(140, 140, 140)',
    padding: 12,
    marginLeft: 12,
    marginRight: 12,
  },
  listEntryContent: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  entryAvatar: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 50/2,
  },
  // pickerArea: {
  //   // flex: 1,
  //   marginBottom: 12,
  //   marginLeft: 24,
  //   marginRight: 24,
  //   padding: 12,
  //   height: 75,
  //   borderWidth: 1,
  // },
  // picker: {
  //   flex: 0,
  //   //width: width * 0.5,
  //   //flexwrap: 'wrap',
  //   //justifyContent: '',
  //   //alignSelf: 'flex-end',
  //   //height: 50,
  //   borderWidth: 1,
  // },
  rowWithLeave:{
    flex: 8,
  },
  deleteButton:{
    backgroundColor: "red",
    flex: 2,
  },
  userProfileTop: {
    // alignSelf: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    //justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
    padding: 12,
    paddingRight: 0,
    marginLeft: 12,
    marginRight: 12,
  },
  dogList: {
    backgroundColor: 'rgb(239,239,239)',
    // borderWidth: 1,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 8,
  },
  editProfileButton: {
    height: 30,
  },
  editProfileButtonText: {
    color: 'blue',
    fontSize: 14,
  },
  joinGroupText: {
    color: 'green',
    alignSelf: 'flex-start',
    fontWeight: 'bold'
  },
  leaveGroupText: {
    color: 'red',
    alignSelf: 'flex-end',
    fontWeight: 'bold'
  },
});
