import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const SocialMediaSharingApp = () => {
  const params = useLocalSearchParams();
  const [shareMessage, setShareMessage] = useState<string>('Check out this amazing app!');

  useEffect(() => {
    if (params.message) {
      setShareMessage(params.message as string);
    }
  }, [params.message]);

  // Open WhatsApp directly
  const openWhatsAppDirectly = (): void => {
    let url = `whatsapp://send?text=${encodeURIComponent(shareMessage)}`;
    
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'WhatsApp is not installed on this device');
    });
  };

  // Open Telegram directly
  const openTelegramDirectly = (): void => {
    let url = `tg://share?url=https://example.com&text=${encodeURIComponent(shareMessage)}`;
    
    Linking.openURL(url).catch(() => {
      // Fallback to alternative Telegram URL scheme
      let fallbackUrl = `https://t.me/share/url?url=https://example.com&text=${encodeURIComponent(shareMessage)}`;
      Linking.openURL(fallbackUrl).catch(() => {
        Alert.alert('Error', 'Telegram is not installed on this device');
      });
    });
  };

  // Open Facebook share dialog
  const openFacebook = (): void => {
    let url = `https://www.facebook.com/sharer/sharer.php?u=https://example.com&quote=${encodeURIComponent(shareMessage)}`;
    
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open Facebook');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Social Share</Text>
      <Text style={styles.subtitle}>Share devotion content with others</Text>
      
      <View style={styles.messageContainer}>
        <Text style={styles.messageLabel}>Share Message:</Text>
        <TextInput
          style={styles.messageInput}
          value={shareMessage}
          onChangeText={setShareMessage}
          placeholder="Enter your share message"
          multiline
          textAlignVertical="top"
        />
      </View>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity 
          style={[styles.socialButton, styles.whatsappButton]}
          onPress={openWhatsAppDirectly}
        >
          <FontAwesome name="whatsapp" size={24} color="white" />
          <Text style={styles.socialButtonText}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.socialButton, styles.telegramButton]}
          onPress={openTelegramDirectly}
        >
          <FontAwesome name="telegram" size={24} color="white" />
          <Text style={styles.socialButtonText}>Telegram</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.socialButton, styles.facebookButton]}
          onPress={() => openFacebook()}
        >
          <FontAwesome name="facebook" size={24} color="white" />
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  messageContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  messageLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  messageInput: {
    fontSize: 16,
    minHeight: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '30%',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  telegramButton: {
    backgroundColor: '#0088CC',
  },
  facebookButton: {
    backgroundColor: '#3b5998',
  },
  socialButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
  },
});

export default SocialMediaSharingApp;