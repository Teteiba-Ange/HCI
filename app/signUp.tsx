import line from "@/assets/images/Line 2.png";
import google from "@/assets/images/Rectangle (1).png";
import logo from "@/assets/images/Logo.png";
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

const signUp = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (fullname === "Angela" || password === '1234' ||email === "angelateteiba11@gmail.com" || password === confirmPassword) {
      router.push('/devotionScreen');
    } else {
      Alert.alert("Error", "Please ensure all fields are filled correctly.");
    }
  };

  return (
    <View style={{ margin: 30 ,justifyContent:"center"}}>
      <Image source={logo} style={{ marginTop: 20, borderRadius: 50,alignSelf:'center' }} />
      <Text style={{alignSelf:'center'}}>Create an Account</Text>
      <Text style={{alignSelf:'center'}}>We are happy to see you, Friend</Text>

      <View >
        <TextInput
          value={fullname}
          onChangeText={setFullname}
          placeholder='Enter your fullname'
          style={{ borderRadius: 5, borderColor: "black", borderWidth: 1, marginTop: 20 }}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder='Enter email address'
          keyboardType='email-address'
          style={{ borderRadius: 5, borderColor: "black", borderWidth: 1, marginTop: 20 }}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder='Your password'
          secureTextEntry
          style={{ borderRadius: 5, borderColor: "black", borderWidth: 1, marginTop: 20 }}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder='Confirm Password'
          secureTextEntry
          style={{ borderRadius: 5, borderColor: "black", borderWidth: 1, marginTop: 20 }}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "blue",
          marginTop: 20,
          borderRadius: 5,
          alignItems: "center",
          marginHorizontal: 20
        }}
        onPress={handleSignUp} // Call handleSignUp correctly
      >
        <Text style={{ fontSize: 32, color: "white" }}>Sign Up</Text>
      </TouchableOpacity>

      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 20 }}>
        <Image style={{ marginTop: 9 }} source={line} />
        <Text style={{ marginHorizontal: 5 }}>Sign Up with</Text>
        <Image style={{ marginTop: 9 }} source={line} />
      </View>

      <View style={{ borderWidth: 1, borderColor: "gray", borderRadius: 5,
      alignSelf:'center', flexDirection: 'row', alignItems: 'center', paddingLeft: 70, marginTop: 10
      ,paddingRight:70 }}>
        <Image source={google} style={{ width: 24, height: 24 }} />
        <Text style={{ fontSize: 26, marginLeft: 10}}>Google</Text>
      </View>

      <View style={{ flexDirection: 'row', marginHorizontal: 40, marginTop: 20 }}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={{ color: "blue", marginLeft: 5 }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default signUp;