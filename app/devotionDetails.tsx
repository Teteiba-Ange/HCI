import calendar from "@/assets/images/Calender.png";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

interface DataItems {
    id: string;
    Title: string;
    text: string;
}

const Data: DataItems[] = [
    { id: "1", Title: "January", text: "31 days left" },
    { id: "2", Title: "February", text: "28 days left" },
    { id: "3", Title: "March", text: "31 days left" },
    { id: "4", Title: "April", text: "30 days left" },
    { id: "5", Title: "May", text: "31 days left" },
    { id: "6", Title: "June", text: "30 days left" },
    { id: "7", Title: "July", text: "31 days left" },
    { id: "8", Title: "August", text: "31 days left" },
    { id: "9", Title: "September", text: "30 days left" },
    { id: "10", Title: "October", text: "31 days left" },
    { id: "11", Title: "November", text: "30 days left" },
    { id: "12", Title: "December", text: "31 days left" },
];

const devotionDetails = () => {
    const renderItem = ({ item }: { item: DataItems }) => (
        <TouchableOpacity 
            onPress={() => router.push("/devotionDay")}
            style={{ padding: 10, justifyContent: "center", alignItems: "center", borderWidth: 1, backgroundColor: "lightgray", marginBottom: 20, borderRadius: 30 }}
        >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={calendar} style={{ width: 50, height: 50 }} />
                <View style={{ paddingLeft: 30, flexDirection: 'column' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.Title}</Text>
                    <Text style={{ color: 'gray' }}>{item.text}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ marginTop: 30, flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>Subscription Approved</Text>
                <SimpleLineIcons name="menu" size={24} color="black" />
            </View>
            <Text style={{ textDecorationLine: 'underline', alignSelf: "center", fontSize: 20, marginVertical: 10 }}>2024</Text>
            <FlatList
                data={Data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{ alignContent: "center" }}
            />
        </View>
    );
};

export default devotionDetails;