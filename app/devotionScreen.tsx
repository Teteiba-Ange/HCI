import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const DevotionalScreen = () => {
  const [loading, setLoading] = useState(true);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    let timer: number | undefined;

    if (loading) {
      timer = setTimeout(() => {
        setLoading(false); // Set loading to false after the delay
      }, 3000); // 3 seconds delay
    }

    return () => {
      clearTimeout(timer); // Cleanup the timer
    };
  }, [loading]);

  // Function to handle payment
  const handlePayment = async () => {
    setProcessingPayment(true);
    try {
      // Call your backend to initialize payment
      const response = await fetch('http://localhost:3000/api/initialize-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'user@example.com', // Replace with actual user email
          amount: 10.00, // Amount in GHS
        }),
      });

      const data = await response.json();
      
      if (data.status && data.data.authorization_url) {
        // Open the Paystack payment page
        const canOpen = await Linking.canOpenURL(data.data.authorization_url);
        if (canOpen) {
          await Linking.openURL(data.data.authorization_url);
          // After payment, you might want to verify the transaction
          // This could be done via a webhook or by polling your backend
          Alert.alert(
            'Payment Initiated',
            'Please complete the payment to access devotionals. After payment, return to this app.',
            [{ text: 'OK', onPress: () => setProcessingPayment(false) }]
          );
        }
      } else {
        Alert.alert('Error', 'Failed to initialize payment');
        setProcessingPayment(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert('Error', 'Something went wrong with the payment process');
      setProcessingPayment(false);
    }
  };

  // Function to check payment status (you might call this periodically or after returning to app)
  const checkPaymentStatus = async (reference: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/verify-transaction/${reference}`);
      const data = await response.json();
      
      if (data.status && data.data.status === 'success') {
        setPaymentCompleted(true);
        Alert.alert('Success', 'Payment completed successfully!');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  };

  const GridLayout = () => {
    const rows = 4;
    const columns = 4;
    const squares = Array.from({ length: rows * columns });

    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
        {squares.map((_, index) => (
          <View key={index} style={{ width: 85, height: 100, backgroundColor: 'grey', margin: 5 }} />
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"} />

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading devotionals</Text>
        </View>
      ) : (
        <View style={{ flex: 1, marginTop: 20 }}>
          <View style={{ flexDirection: 'row', marginLeft: 20, gap: 15, marginTop: 10 }}>
            <TextInput 
              placeholder='Enter year to search' 
              keyboardType='numeric'
              style={{ borderWidth: 1, backgroundColor: "gray", borderRadius: 10, paddingHorizontal: 10, flex: 1 }} 
            />
            <Feather name="search" size={20} color="pink" /> 
            <Ionicons name="notifications" size={22} color="Black" /> 
            <EvilIcons name="user" size={24} color="black" />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 }}>
            <Text>Available</Text>
            <Text style={{ color: 'blue' }}>See all</Text>
          </View>
          <ScrollView>
            {paymentCompleted ? (
              <TouchableOpacity onPress={() => router.push("/devotionDetails")}>
                <GridLayout />
              </TouchableOpacity>
            ) : (
              <View style={{ padding: 20, alignItems: 'center' }}>
                <Text style={{ fontSize: 18, marginBottom: 20 }}>
                  Subscribe to access all devotionals
                </Text>
                <TouchableOpacity 
                  onPress={handlePayment}
                  disabled={processingPayment}
                  style={{
                    backgroundColor: processingPayment ? '#ccc' : 'blue',
                    padding: 15,
                    borderRadius: 10,
                    width: 200,
                    alignItems: 'center'
                  }}
                >
                  {processingPayment ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={{ color: 'white', fontSize: 16 }}>
                      Subscribe Now - GHS 10
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default DevotionalScreen;