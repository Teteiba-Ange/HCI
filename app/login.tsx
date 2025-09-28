import line from "@/assets/images/Line 2.png";
import google from "@/assets/images/Rectangle (1).png";
import logo from "@/assets/images/Logo.png";
import Feather from '@expo/vector-icons/Feather';
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[secureTextEntry,setSecureTextEntry]=useState(true);
  const togglePasswordVisibility=()=>{
    setSecureTextEntry((prev)=>!prev);
  }

  const handleLogin = () => {
    if (email === "angelateteiba11@gmail.com" && password === "12345") {
      router.push("/devotionScreen");
    } else {
      Alert.alert("Invalid Email/Password");
    }
  };

  return (
    <View style={{ margin: 30 }}>
      <View style={{ alignItems: 'center' }}>
        <Image source={logo} style={{ marginTop: 20, borderRadius: 50 }} />
        <Text>Welcome Back 👋</Text>
        <Text>We are happy to see you again, Friend</Text>
      </View>
      <View style={{ gap: 20 }}>
        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email Address"
          keyboardType="email-address"
          style={{ borderColor: "black", borderWidth: 1, borderRadius: 5 }}
        />
        <Text>Password</Text>
        <View style={{ borderColor: "black", borderWidth: 1, borderRadius: 5,display:"flex",
        flexDirection:'row' }} >

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        /> 
        <TouchableOpacity   onPress={togglePasswordVisibility} style={{marginLeft:220,marginTop:5}}>
          <Feather name={secureTextEntry ?"eye-off":"eye"}
          color="black" size={24}/>
        </TouchableOpacity>
        
        </View>
        <Text style={{ color: "blue", marginLeft: 200 }}>Forgot Password?</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            marginTop: 20,
            borderRadius: 5,
            alignItems: "center",
            marginHorizontal: 20,
          }}
          onPress={handleLogin} // Call handleLogin correctly
        >
          <Text style={{ fontSize: 32, color: "white" }}>Login</Text>
        </TouchableOpacity>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Image style={{ marginTop: 9 }} source={line} />
          <Text>Sign In with</Text>
          <Image style={{ marginTop: 9 }} source={line} />
        </View>
        <View style={{ borderWidth: 1, borderColor: "gray", borderRadius: 5, flexDirection: 'row', alignItems: 'center', paddingLeft: 50 }}>
          <Image source={google} />
          <Text style={{ fontSize: 26 }}>Google</Text>
        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: 40 }}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => { router.push('/signUp'); }}>
            <Text style={{ color: "blue" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;