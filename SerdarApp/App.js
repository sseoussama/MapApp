

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,ActivityIndicator} from 'react-native';
import ClusterMarker from "./ClusterMarker";
import { getCluster } from "./MapUtils";
import MapView,{Marker} from 'react-native-maps';



const INITIAL_POSITION = {
  latitude:  5.313814712010483,
  longitude:25.650589931756265,
  latitudeDelta: 144.07389126801,
  longitudeDelta:126.56254928559066
}
import axios from 'axios'

export default class App extends Component {
  state={
    fetched:false,
    type1:true,
    type2:true,
    type3:true,
    markers1:[],
    markers2:[],
    markers3:[],
    region: INITIAL_POSITION
  }
  renderMarker = (marker, index,color) => {
    const key = index + marker.geometry.coordinates[0];
    var color;
    // If a cluster
    if (marker.properties) {
      
      return (
        <Marker
        tracksViewChanges={false}
        pinColor={color}
          key={key}
          coordinate={{
            latitude: marker.geometry.coordinates[1],
            longitude: marker.geometry.coordinates[0]
          }}
        >
       <ClusterMarker count={marker.properties.point_count} color={color} />
         
        
       
         
        </Marker>
      );
    }
    // If a single marker
    return (
      <Marker
      tracksViewChanges={false}
        key={key}
        pinColor={color}
        coordinate={{
          latitude: marker.geometry.coordinates[1],
          longitude: marker.geometry.coordinates[0]
        }}
      />
    );
  };

 async  componentDidMount()
  {
try
{
  const response2 = await axios.get('https://mighty-wildwood-77773.herokuapp.com/api/markers?type=2');
  
  this.setState({markers2:response2.data.data})
  const response3 = await axios.get('https://mighty-wildwood-77773.herokuapp.com/api/markers?type=3');

    this.setState({markers3:response3.data.data})
    
    const response1 = await axios.get('https://mighty-wildwood-77773.herokuapp.com/api/markers?type=1');
   
    this.setState({markers1:response1.data.data,fetched:true})
}
 
catch (error) {
  console.log(error);
}
  
   
  }
  getType1()
  {
   

    if(this.state.type1){
      const allCoords =this.state.markers1.map(marker => ({
        geometry: {
          coordinates: [marker.Longitude,parseFloat(marker.Latitude)],
         
        }
      }));
      const cluster = getCluster(allCoords, this.state.region);
      return(
        <View>
          {cluster.markers.map((marker, index) => this.renderMarker(marker, index,"#8ed57f"))}
     
        
         
        </View>
      );
    } 
  
    
     
    
    
  }
  getType2()
  {
   

    if(this.state.type2){
      const allCoords =this.state.markers2.map(marker => ({
        geometry: {
          coordinates: [marker.Longitude,parseFloat(marker.Latitude)],
          
        }
      }));
      const cluster = getCluster(allCoords, this.state.region);
      return(
        <View>
          {cluster.markers.map((marker, index) => this.renderMarker(marker, index,'#508ed3'))}
     
        
         
        </View>
      );
    } 
    
  }
 
  getType3()
  {
    if(this.state.type3){
      const allCoords =this.state.markers3.map(marker => ({
        geometry: {
          coordinates: [marker.Longitude,parseFloat(marker.Latitude)],
         
        }
      }));
      const cluster = getCluster(allCoords, this.state.region);
      return(
        <View>
          {cluster.markers.map((marker, index) => this.renderMarker(marker, index,'#ed6158'))}
     
        
         
        </View>
      );
    } 
    
  }
  render1()
  {
    if(!this.state.fetched)
    return (
      <View  style={{position:'absolute',bottom:'50%',left:'50%',zIndex:999}}>
       
      <ActivityIndicator color='#0167e8ff' size="large" />
       </View>);
  }
  render() {
    
    return (
      <View style={styles.container}>

         {this.render1()}
            <MapView
           
             style={{ position: 'absolute',
             top: 0,
             left: 0,
             right: 0,
             bottom: 0,}}
             region={this.state.region}
             onRegionChangeComplete={region => {this.setState({ region:region })}}
             


  >

{this.getType1()}
{this.getType2()}
{this.getType3()}

  </MapView>
 <View  style={{position:'absolute',bottom:20,left:0,alignItems:'center',width:'100%'}}>
    <TouchableOpacity style={{flex:1,marginBottom:10,padding:10,backgroundColor:this.state.type1 ? '#8ed57f' : "white"}} onPress={()=>this.setState({type1:!this.state.type1})}>
      <Text>Type 1 </Text>
    </TouchableOpacity>
    <TouchableOpacity style={{flex:1,marginBottom:10,padding:10,backgroundColor:this.state.type2 ? '#508ed3' : "white"}} onPress={()=>this.setState({type2:!this.state.type2})}>
      <Text>Type 2 </Text>
    </TouchableOpacity>
    <TouchableOpacity style={{flex:1,padding:10,backgroundColor:this.state.type3 ?  '#ed6158' : "white"}} onPress={()=>this.setState({type3:!this.state.type3})}>
      <Text>Type 3 </Text>
    </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  
});
