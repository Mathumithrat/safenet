import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const IncidentReport = () => {
  // State to hold the incident report details
  const [incidentDetails, setIncidentDetails] = useState({
    location: '',
    description: '',
    date: '',
  });

  // Function to handle form submission
  const handleSubmit = () => {
    // Display the form data in the console (you can handle this as needed)
    console.log('Incident Report:', incidentDetails);

    // Display alert message
    Alert.alert('Success', 'The incident has been reported');

    // Optionally, clear the form after submission
    setIncidentDetails({ location: '', description: '', date: '' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Incident Report</Text>

      {/* Location Input */}
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Where did the incident happen?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter location"
          value={incidentDetails.location}
          onChangeText={(text) => setIncidentDetails({ ...incidentDetails, location: text })}
        />
      </View>

      {/* Description Input */}
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>What happened?</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Enter description of the incident"
          value={incidentDetails.description}
          onChangeText={(text) => setIncidentDetails({ ...incidentDetails, description: text })}
          multiline
        />
      </View>

      {/* Date Input */}
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Date of Incident:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter date (YYYY-MM-DD)"
          value={incidentDetails.date}
          onChangeText={(text) => setIncidentDetails({ ...incidentDetails, date: text })}
        />
      </View>

      {/* Submit Button */}
      <Button title="Submit Report" onPress={handleSubmit} color="red" />
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
  descriptionInput: {
    height: 100, // For a larger text box for descriptions
    textAlignVertical: 'top', // For multiline input
  },
});

export default IncidentReport;
