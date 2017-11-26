import React, {Component} from 'react';
import {
  AppRegistry,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {fetchWeather} from './weatherAPI';
import Highlighter from 'react-native-highlight-words';

const iconNames = {
  Default: 'md-time',
  Clear: 'md-sunny',
  Rain: 'md-rainy',
  Thunderstorm: 'md-thunderstorm',
  Clouds: 'md-cloudy',
  Snow: 'md-snow',
  Drizzle: 'md-umbrella',
  Mist: 'md-umbrella'
}

const phrases = {
  Default: {
    title: "Fetching the Weather",
    subtitle: "Be patient, you're witnessing a miracle",
    highlight: "Weather",
    color: "#636363",
    background: "#9C9C9C"
  },
  Clear: {
    title: "It's a Clear Day!",
    subtitle: "Go outside and have some fun!",
    highlight: "Clear",
    color: "#E32500",
    background: "#FFD017"
  },
  Rain: {
    title: "Rain, rain go away",
    subtitle: "...better find that umbrella",
    highlight: "away",
    color: "#004A96",
    background: "#2F343A"
  },
  Thunderstorm: {
    title: "Craaack-boom! Better stay inside!",
    subtitle: "...and unplug those devices!",
    highlight: "boom",
    color: "#FBFF46",
    background: "#020202"
  },
  Clouds: {
    title: "Every cloud has a silver lining!",
    subtitle: "...at least it's not raining",
    highlight: "cloud",
    color: "#0044FF",
    background: "#999999"
  },
  Snow: {
    title: "Get your snow shovels ready!",
    subtitle: "...and don't forget the rock salt",
    highlight: "snow",
    color: "#021D4C",
    background: "#2085BC"
  },
  Drizzle: {
    title: "Just a little drizzle- that's all",
    subtitle: "...could be better, could be worse",
    highlight: "drizzle",
    color: "#174F0C",
    background: "#1FBB68"
  },
  Mist: {   
    title: "Feeling a bit misty",    
    subtitle: "...could be a bad hair day",   
    highlight: "misty",    
    color: "#6A0D58",   
    background: "#C069A8"   
  },
}

class App extends Component {

  componentWillMount() {
    this.state = {
      temp: 0,
      weather: 'Default'
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (posData) => fetchWeather(posData.coords.latitude ,posData.coords.longitude)
        .then(res => this.setState({
          temp:Math.round(res.temp), //enter manually to see diff screens
          //temp: 32,
          weather:res.weather
          //weather: 'Default'
          //weather: 'Mist'
          //weather: 'Rain'
          //weather: 'Thunderstorm'
          //weather: 'Drizzle'
          //weather: 'Clear'
          //weather: 'Snow'
          //weather: 'Clouds'
        })),
      (error) => alert(error),
      {timeout: 10000}      
     )
  }

  render () {
    console.log('component is rendering!');
    return (
      <View style={[styles.container,{backgroundColor:phrases[this.state.weather].background}]}> 
        <StatusBar hidden={true}/>    
        <View style={styles.header}>
          <Icon style={styles.icon} name={iconNames[this.state.weather]} />
          <Text style={styles.temp}>{this.state.temp}°</Text>
        </View> 
          <View style={styles.body}>
            <Highlighter
              style={styles.title}
              highlightStyle={{color: phrases[this.state.weather].color}}
              searchWords={[phrases[this.state.weather].highlight]}
              textToHighlight={phrases[this.state.weather].title}
            />
            <Text style={styles.subtitle}>{phrases[this.state.weather].subtitle}</Text>
          </View>
      </View>        
    )
  }
}

const styles = StyleSheet.create({
  container: {
    //justifyContent: 'space-around',
    flex: 1,
    backgroundColor: '#FFD017'
  },
  header: {
    flexDirection: 'row',
    flex: 1.3,
    justifyContent: 'space-around',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'black'
    //marginTop: 10
    
  },
  temp: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 62,
    color: 'white'
  },
  body: {
    flexDirection: 'column',
    flex: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // borderWidth: 2,
    // borderColor: 'black',  
    margin: 15,
    //marginBottom: 100
  },
  title: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 75,
    color: 'white',
    marginBottom: 5
  },
  subtitle: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 20,
    color: 'white',
    marginTop: 10
  },
  icon: {
    fontSize: 80,
    color: 'white'
  }
})

AppRegistry.registerComponent('WeatherAlly', () => App)


