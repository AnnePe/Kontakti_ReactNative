import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList,StatusBar } from 'react-native';
import * as Contacts from 'expo-contacts';


export default function App() {
  const [currentContact, setCurrentContact] = useState({});
   
    const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
       
        fields: [Contacts.Fields.PhoneNumbers]
      })

      if (data.length > 0) {
        //    console.log(data);
            setCurrentContact(data);
      }
    }
  }
  
  return (

    <View style={styles.container} >
     
      <StatusBar hidden={true} />
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => 
          <View>
            <Text style={{fontSize: 20, fontWeight: "light"}}>{item.name}    {item.phoneNumbers[0].number}</Text>
          </View>}
        data={currentContact} 
       />  
          
       <Button title="Get contact" onPress={getContacts} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30,
  },
  
});