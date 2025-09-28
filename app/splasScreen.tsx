import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Platform, Image, SafeAreaView, StatusBar, TouchableOpacity, ActivityIndicator } from "react-native";
import splash from "@/assets/images/Screenshot_20250624_235330_One UI Home (4).png";
import { router } from "expo-router";

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    setLoading(false);
  };

  useEffect(() => {
    let timer: number;

    if (loading) {
      timer = setTimeout(() => {
        router.push("/login");
      }, 6000); // 3 seconds delay
    }

    return () => {
      clearTimeout(timer); // Cleanup the timer
    };
  }, [loading]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"} />
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity onPress={handleClick}>
          <Image source={splash} style={{ width: 200, height: 194 }} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default SplashScreen;