import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
  GestureResponderEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import { Audio } from 'expo-av';

const HomeScreen = ({ navigation }) => {
  const [showInput, setShowInput] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [details, setDetails] = useState('');
  const [tapCount, setTapCount] = useState(0);
  const [lastTap, setLastTap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigateToMap = () => {
    navigation.navigate('map');
  };

  const getLocation = async () => {
    try {
      setIsLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required.');
        setIsLoading(false);
        return null;
      }
      const location = await Location.getCurrentPositionAsync({});
      setIsLoading(false);
      return location;
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Unable to fetch location.');
      console.error(error);
      return null;
    }
  };

  const sendSMS = async (location) => {
    const phoneNumber = '+9199447 46141';
    const message = `Emergency! My current location is: 
Latitude: ${location.coords.latitude}, 
Longitude: ${location.coords.longitude}
Google Maps Link: https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`;

    const isAvailable = await SMS.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert('Error', 'SMS service is not available on this device.');
      return;
    }

    try {
      const { result } = await SMS.sendSMSAsync(phoneNumber, message);
      if (result === 'sent') {
        Alert.alert('Success', 'Emergency message sent!');
      } else {
        Alert.alert('Failed', 'Unable to send the message.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while sending the message.');
      console.error(error);
    }
  };

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/emergency-sound.mp3') // Replace with your sound file path
      );
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to play the sound.');
      console.error(error);
    }
  };

  const handleLongPress = async () => {
    await playSound();
  };

  const handleDoubleTap = async () => {
    const now = Date.now();
    if (lastTap && now - lastTap < 300) {
      const location = await getLocation();
      if (location) {
        await sendSMS(location);
      }
    } else {
      setLastTap(now);
    }
  };

  const handleEmergencyPress = () => {
    Alert.alert(
      'Emergency Alert',
      'Push the Notification to',
      [
        { text: 'Guardian 1', onPress: () => handleRecipientSelection('Guardian 1') },
        { text: 'Guardian 2', onPress: () => handleRecipientSelection('Guardian 2') },
        { text: 'Police Station', onPress: () => handleRecipientSelection('Police Station') },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handleRecipientSelection = (selectedRecipient) => {
    setRecipient(selectedRecipient);
    setShowInput(true);
  };

  const handleSendNotification = () => {
    if (!details.trim()) {
      Alert.alert('Error', 'Please enter the necessary details.');
      return;
    }
    Alert.alert('Success', `Notification sent to ${recipient}`);
    setDetails('');
    setShowInput(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <TouchableWithoutFeedback
        onLongPress={handleLongPress}
        delayLongPress={2000}
        onPress={handleDoubleTap}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Women Safety</Text>
            <Text style={styles.subtitle}>
              Press the button below during an <Text style={styles.emergencyText}>Emergency</Text>
            </Text>
          </View>

          <Image
            source={{
              uri: 'https://images.yourstory.com/cs/wordpress/2017/03/Featured-image-7-1.jpg?mode=crop&crop=faces&ar=2%3A1&format=auto&w=1920&q=75',
            }}
            style={styles.image}
          />

          <View style={styles.actions}>
            <TouchableOpacity style={styles.bellButton} onPress={handleEmergencyPress}>
              <Icon name="bell" size={30} color="#fff" />
              <Text style={styles.buttonText}>Emergency Alert</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.locationButton} onPress={navigateToMap}>
              <Icon name="map-marker" size={30} color="#fff" />
              <Text style={styles.buttonText}>Share Location</Text>
            </TouchableOpacity>
          </View>

          {isLoading && <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />}

          {showInput && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Send details to {recipient}:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter location, description, etc."
                value={details}
                onChangeText={setDetails}
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSendNotification}>
                <Text style={styles.sendButtonText}>Send Notification</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f7f8fa',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4a4e69',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
    fontStyle: 'italic',
  },
  emergencyText: {
    color: '#d7263d',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#ddd',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  bellButton: {
    backgroundColor: '#e63946',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    elevation: 5,
  },
  locationButton: {
    backgroundColor: '#3a86ff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    elevation: 5,
  },
  buttonText: {
    marginTop: 5,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  inputContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 5,
    marginTop: 20,
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#2a9d8f',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
