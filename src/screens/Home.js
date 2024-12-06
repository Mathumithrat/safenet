import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const HomeScreen = () => {
  const [showInput, setShowInput] = useState(false); // State to toggle input form
  const [recipient, setRecipient] = useState(''); // State to track selected recipient
  const [details, setDetails] = useState(''); // State to store entered details

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
    // Reset form
    setDetails('');
    setShowInput(false);
  };

  return (
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
          source={{ uri: 'https://images.yourstory.com/cs/wordpress/2017/03/Featured-image-7-1.jpg?mode=crop&crop=faces&ar=2%3A1&format=auto&w=1920&q=75' }} 
          style={styles.image} 
        />
        <TouchableOpacity style={styles.bellButton} onPress={handleEmergencyPress}>
          <Icon name="bell" size={30} color="#fff" />
        </TouchableOpacity>

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
  bellButton: {
    backgroundColor: '#f00',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
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
