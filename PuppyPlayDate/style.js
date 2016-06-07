const _background = '#FFF';
const _opacity = .4;
const _inputBackground = '#666';

module.exports = require('react-native').StyleSheet.create({
  center:{
    justifyContent: 'center'
  },
  bImage:{
    flex: 1,
    width: null,
    height: null,
  },
  blur:{
    flex: 1,
    backgroundColor: _background,
    opacity: _opacity,
  },
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
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
  buttonText:{
    color: '#FFF',
  },
  outterMargin:{
    flex: 1,
  },
  content:{
    flex:8,
  },
});
