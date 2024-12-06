import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const EmergencyContacts = () => {
  // State to hold the guardian details
  const [guardian1, setGuardian1] = useState({
    name: '',
    phone: '',
    relationship: '',
  });

  const [guardian2, setGuardian2] = useState({
    name: '',
    phone: '',
    relationship: '',
  });

  // Function to handle form submission
  const handleSubmit = () => {
    // Display the form data in the console (you can handle this as needed)
    console.log('Guardian 1:', guardian1);
    console.log('Guardian 2:', guardian2);

    // Show success alert
    Alert.alert("Success", "You have successfully entered your Emergency contacts");

    // Optionally, navigate or perform any further actions
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Emergency Contacts</Text>

      {/* Guardian 1 Input Form */}
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Guardian 1 Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={guardian1.name}
          onChangeText={(text) => setGuardian1({ ...guardian1, name: text })}
        />
        <Text style={styles.formLabel}>Guardian 1 Phone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          keyboardType="phone-pad"
          value={guardian1.phone}
          onChangeText={(text) => setGuardian1({ ...guardian1, phone: text })}
        />
        <Text style={styles.formLabel}>Guardian 1 Relationship:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Relationship"
          value={guardian1.relationship}
          onChangeText={(text) => setGuardian1({ ...guardian1, relationship: text })}
        />
      </View>

      {/* Guardian 2 Input Form */}
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Guardian 2 Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={guardian2.name}
          onChangeText={(text) => setGuardian2({ ...guardian2, name: text })}
        />
        <Text style={styles.formLabel}>Guardian 2 Phone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          keyboardType="phone-pad"
          value={guardian2.phone}
          onChangeText={(text) => setGuardian2({ ...guardian2, phone: text })}
        />
        <Text style={styles.formLabel}>Guardian 2 Relationship:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Relationship"
          value={guardian2.relationship}
          onChangeText={(text) => setGuardian2({ ...guardian2, relationship: text })}
        />
      </View>

      {/* Submit Button */}
      <Button title="Submit" onPress={handleSubmit} color='red' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#8B0000',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ccc',
  },
});

export default EmergencyContacts;
