import React from "react";
import { StyleSheet, View, Text } from "react-native";


const Style = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignSelf: "flex-start"
    },
    bubble: {
        flex: 0,
        flexDirection: "row",
        alignSelf: "flex-start",
       
        padding: 4,
        borderRadius: 4,
        
        borderWidth: 1
    },
    count: {
        color: "#fff",
        fontSize: 13
    }
});

const ClusterMarker = ({ count,color }) => {

return( <View style={Style.container}>
    <View style={[Style.bubble,{ backgroundColor:color,borderColor:color,}]}>
        <Text style={Style.count}>{count}</Text>
    </View>
</View>)
}
   
;

export default ClusterMarker;