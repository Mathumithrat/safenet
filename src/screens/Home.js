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
  Linking,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import * as Location from 'expo-location'; // Import expo-location for location access
import * as SMS from 'expo-sms'; // Import expo-sms for sending SMS

const HomeScreen = ({ navigation }) => {
  const [showInput, setShowInput] = useState(false); // State to toggle input form
  const [recipient, setRecipient] = useState(''); // State to track selected recipient
  const [details, setDetails] = useState(''); // State to store entered details
  const [lastTap, setLastTap] = useState(0); // State for double-tap detection

  const navigateToMap = () => {
    navigation.navigate('map'); // Navigate to the MapPage screen
  };

  // Function to fetch the user's location
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required.');
        return null;
      }
      const location = await Location.getCurrentPositionAsync({});
      return location;
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch location.');
      console.error(error);
      return null;
    }
  };

  // Function to send SMS with location
  const sendSMS = async (location) => {
    const phoneNumber = '+919994159895'; // Replace with the static number
    const message = `Emergency! My current location is: 
Latitude: ${location.coords.latitude}, 
Longitude: ${location.coords.longitude}
Google Maps Link: https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`;

    if (Platform.OS === 'android' || Platform.OS === 'ios') {
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
    }
  };

  // Function to handle double-tap
  const handleDoubleTap = async () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 200; // Delay in milliseconds to detect double-tap
    if (now - lastTap < DOUBLE_TAP_DELAY) {
      const location = await getLocation();
      if (location) {
        await sendSMS(location);
      }
    }
    setLastTap(now);
  };


  // Function to handle emergency button press
  const handleEmergencyPress = () => {
    Alert.alert(
      'Emergency Alert',
      'Push the Notification to',
      [
        { text: 'Guardian 1', onPress: () => handleRecipientSelection('Guardian 1') },
        { text: 'Guardian 2', onPress: () => handleRecipientSelection('Guardian 2') },
        { text: 'Police Station', onPress: () => handleRecipientSelection('Police Station') },
        { text: 'Cancel', style: 'cancel' }, // Cancel button
      ],
      { cancelable: true }
    );
  };

  // Function to handle recipient selection
  const handleRecipientSelection = (selectedRecipient) => {
    setRecipient(selectedRecipient); // Set recipient
    setShowInput(true); // Show input field for necessary details
  };

  // Function to send notification
  const handleSendNotification = () => {
    if (!details.trim()) {
      Alert.alert('Error', 'Please enter the necessary details.');
      return;
    }
    console.log(`Sending notification to ${recipient}: ${details}`);
    Alert.alert('Success', `Notification sent to ${recipient}`);
    setDetails('');
    setShowInput(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>WOMEN SAFETY</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.subtitle}>
            Press the Button in <Text style={styles.emergencyText}>Emergency</Text>
          </Text>
          <Image
            source={{
              uri: 'https://images.yourstory.com/cs/wordpress/2017/03/Featured-image-7-1.jpg?mode=crop&crop=faces&ar=2%3A1&format=auto&w=1920&q=75',
            }}
            style={styles.image}
          />
          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.bellButton} onPress={handleEmergencyPress}>
              <Icon name="bell" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.locationButton} onPress={navigateToMap}>
              <Icon name="map-marker" size={30} color="white" />
            </TouchableOpacity>
          </View>

          {/* Show input field for necessary details */}
          {showInput && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Enter details for {recipient}:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your location, description, etc."
                value={details}
                onChangeText={setDetails}
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSendNotification}>
                <Text style={styles.sendButtonText}>Send Notification</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center' },
  header: { alignItems: 'center', marginTop: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  content: { alignItems: 'center', marginTop: 20 },
  subtitle: { fontSize: 18, textAlign: 'center', marginBottom: 10 },
  emergencyText: { color: 'red', fontWeight: 'bold' },
  image: { width: 300, height: 150, resizeMode: 'cover', marginBottom: 20 },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  bellButton: {
    backgroundColor: '#f00',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginHorizontal: 10,
  },
  locationButton: {
    backgroundColor: 'red',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginHorizontal: 10,
  },
  inputContainer: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  inputLabel: { fontSize: 16, marginBottom: 10 },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sendButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default HomeScreen;
