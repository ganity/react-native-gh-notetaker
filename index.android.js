/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
var Main = require('./App/Components/Main');
var Dashboard = require('./App/Components/Dashboard');

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  BackAndroid
} from 'react-native';

class Notetaker extends Component {
  
  componentDidMount() {
    var navigator = this._navigator;
    BackAndroid.addEventListener('hardwareBackPress', function() {
        if (navigator && navigator.getCurrentRoutes().length > 1) {
          navigator.pop();
          return true;
        }
        return false;
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress');
  }

  render() {
    let defaultName = 'main';
    let defaultComponent = Main;
    return (
        <Navigator
          initialRoute={{ name: defaultName, component: defaultComponent }}
          configureScene={(route) => {
            return Navigator.SceneConfigs.VerticalDownSwipeJump;
          }}
          renderScene={(route, navigator) => {
            let Component = route.component;
            this._navigator = navigator;
            return <Component {...route.params} navigator={navigator} />
          }} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  
});

AppRegistry.registerComponent('Notetaker', () => Notetaker);
