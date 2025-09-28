import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

const DevotionDay = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [copiedText, setCopiedText] = useState('');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const copyToClipboard = async () => {
        const devotionText = `Looking Up to God

MEMORY VERSE:
Psalm 34:5
Psalm 34:10

EXPOSITION:
When we look to God, we reflect His glory. The phrase "those who look to him are radiant" emphasizes that our focus on God transforms us. This radiance isn't merely physical; it's a spiritual brightness that comes from trusting in His goodness and faithfulness.
Application: In moments of despair, lifting our eyes to God can change our perspective. Instead of being consumed by our problems, we can experience peace and joy that radiates from within.
Psalm 34:10 reassures us that while difficulties may arise—symbolized by lions growing weak and hungry—those who actively seek the Lord will not lack any good thing. This verse highlights the importance of seeking God earnestly, knowing that He provides for our needs.
Application: In times of need, we should remember that looking up to God means trusting in His provision. Our focus should be on seeking Him rather than worrying about our circumstances.

PRAYER:
Heavenly Father, I thank You for Your unwavering love and faithfulness. 
Help me to keep my eyes fixed on You, especially in times of trouble. May Your light shine in my life, bringing radiance to my heart and hope to my spirit. Teach me to seek You earnestly,
 trusting that You will provide all that I need. In Jesus' name, I pray. Amen.`;

        await Clipboard.setStringAsync(devotionText);
        setCopiedText(devotionText);
        Alert.alert('Copied!', 'Devotion text has been copied to clipboard.');
        setIsOpen(false);
    };

    const shareDevotion = () => {
        const devotionText = `Looking Up to God

MEMORY VERSE:
Psalm 34:5
Psalm 34:10

EXPOSITION:
When we look to God, we reflect His glory. The phrase "those who look to him are radiant" emphasizes that our focus on God transforms us. This radiance isn't merely physical; it's a spiritual brightness that comes from trusting in His goodness and faithfulness.
Application: In moments of despair, lifting our eyes to God can change our perspective. Instead of being consumed by our problems, we can experience peace and joy that radiates from within.
Psalm 34:10 reassures us that while difficulties may arise—symbolized by lions growing weak and hungry—those who actively seek the Lord will not lack any good thing. This verse highlights the importance of seeking God earnestly, knowing that He provides for our needs.
Application: In times of need, we should remember that looking up to God means trusting in His provision. Our focus should be on seeking Him rather than worrying about our circumstances.

PRAYER:
Heavenly Father, I thank You for Your unwavering love and faithfulness. 
Help me to keep my eyes fixed on You, especially in times of trouble. May Your light shine in my life, bringing radiance to my heart and hope to my spirit. Teach me to seek You earnestly,
 trusting that You will provide all that I need. In Jesus' name, I pray. Amen.`;
        
        router.push({
            pathname: "/share",
            params: { message: devotionText }
        });
        setIsOpen(false);
    };

    return (
        <View style={{ padding: 20, }}>
            <View style={{ marginTop: 30, flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>Subscription Approved</Text>
                <TouchableOpacity onPress={toggleDropdown}>
                    <SimpleLineIcons name="menu" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Dropdown Menu */}
            {isOpen && (
                <View style={{
                    position: 'absolute',
                    top: 60,
                    right: 20,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    shadowColor: '#000',
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    elevation: 5,
                    padding: 10,
                    zIndex: 1000,
                }}>
                    <TouchableOpacity onPress={copyToClipboard} style={{ padding: 10 }}>
                        <Text>Copy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={shareDevotion} style={{ padding: 10 }}>
                        <Text>Share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsOpen(false)} style={{ padding: 10 }}>
                        <Text>Bookmark</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsOpen(false)} style={{ padding: 10 }}>
                        <Text>Create Note</Text>
                    </TouchableOpacity>
                </View>
            )}

            <Text style={{ textDecorationLine: 'underline', alignSelf: "center", fontSize: 20, marginVertical: 10 }}>2024</Text>
            <Text>WEDNESDAY, 30 2024</Text>
            <Text>TOPIC</Text>
            <Text>Looking Up to God</Text>
            <Text>MEMORY VERSE</Text>
            <Text>Scriptures</Text>
            <Text>Psalm 34:5</Text>
            <Text>Psalm 34:10</Text>
            <Text>EXPOSITION</Text>
            <Text>When we look to God, we reflect His glory. The phrase "those who look to him are radiant" emphasizes that our focus on God transforms us. This radiance isn't merely physical; it's a spiritual brightness that comes from trusting in His goodness and faithfulness.
Application: In moments of despair, lifting our eyes to God can change our perspective. Instead of being consumed by our problems, we can experience peace and joy that radiates from within.
Psalm 34:10 reassures us that while difficulties may arise—symbolized by lions growing weak and hungry—those who actively seek the Lord will not lack any good thing. This verse highlights the importance of seeking God earnestly, knowing that He provides for our needs.
Application: In times of need, we should remember that looking up to God means trusting in His provision. Our focus should be on seeking Him rather than worrying about our circumstances.</Text>
            <Text>PRAYER</Text>
            <Text>Heavenly Father, I thank You for Your unwavering love and faithfulness. 
                Help me to keep my eyes fixed on You, especially in times of trouble. May Your light shine in my life, bringing radiance to my heart and hope to my spirit. Teach me to seek You earnestly,
                 trusting that You will provide all that I need. In Jesus' name, I pray. Amen.</Text>
        </View>
    );
};

export default DevotionDay;