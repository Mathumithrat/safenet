import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const IncidentReport = () => {
  const [incidentDetails, setIncidentDetails] = useState({
    location: '',
    description: '',
    date: '',
  });

  const handleSubmit = () => {
    console.log('Incident Report:', incidentDetails);
    Alert.alert('Success', 'The incident has been reported');
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
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={
          !incidentDetails.location.trim() ||
          !incidentDetails.description.trim() ||
          !incidentDetails.date.trim()
        }
      >
        <Text style={styles.submitButtonText}>Submit Report</Text>
      </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#8B0000',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  formGroup: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    fontSize: 14,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#8B0000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default IncidentReport;
