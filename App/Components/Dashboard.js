var React = require('react-native');
var Profile = require('./Profile');
var Repositories = require('./Repositories');
var api = require('../Utils/api');
var Notes = require('./Notes');
var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65,
  },
  image:{
  	
    height: 350,
  },
  buttonText:{
  	fontSize:24,
  	color:'white',
  	alignSelf:'center'
  }
});

class Dashboard extends React.Component{
	makeBackground(btn) {
		var obj={
			flex: 1,
     	    flexDirection:'row',
		    justifyContent: 'center',
		    alignSelf:'stretch',
		    
		}
		if (btn === 0) {
			obj.backgroundColor='#48BBEC';
		} else if (btn === 1) {
			obj.backgroundColor='#E77AAE';
		} else {
			obj.backgroundColor='#758BF4';
		}
		return obj;
	}

	goToProfile() {
	  this.props.navigator.push({
	      name:'Profile',
		  component: Profile,
	      title: 'Profile Page',
	      params: {userInfo: this.props.userInfo}
	    })
	}
	goToRepos() {
		api.getRepos(this.props.userInfo.login)
		.then((res) => {
			this.props.navigator.push({
		      name:'Repositories',
			  component: Repositories,
		      title: 'Repositories Page',
		      params: {
		      	userInfo: this.props.userInfo,
		      	repos: res
		      }
		    })
		})
	}
	goToNotes() {
		api.getNotes(this.props.userInfo.login)
		.then((res) => {
			res = res || {};
			this.props.navigator.push({
		      name:'Notes',
			  component: Notes,
		      title: 'Notes Page',
		      params: {
		      	userInfo: this.props.userInfo,
		      	notes: res
		      }
		    })
		})
	}
	render(){
 		return(
			<View style={styles.container}>
				<Image
		          source={{uri: this.props.userInfo.avatar_url}}
		          style={styles.image}
		        />
			
 				<TouchableHighlight
 					style={this.makeBackground(0)}
 					onPress={this.goToProfile.bind(this)}
 					underlayColor='#88D4F5'>
 					<Text style={styles.buttonText}> View Profile </Text>
 				</TouchableHighlight>
 				<TouchableHighlight
 					style={this.makeBackground(1)}
 					onPress={this.goToRepos.bind(this)}
 					underlayColor='#88D4F5'>
 					<Text style={styles.buttonText}> View Repos </Text>
 				</TouchableHighlight>
 				<TouchableHighlight
 					style={this.makeBackground(2)}
 					onPress={this.goToNotes.bind(this)}
 					underlayColor='#88D4F5'>
 					<Text style={styles.buttonText}> View Notes </Text>
 				</TouchableHighlight>
 				
 			</View>
 		);
 	}
}

module.exports = Dashboard;