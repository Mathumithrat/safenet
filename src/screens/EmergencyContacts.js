import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';

const EmergencyContacts = () => {
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

  const handleSubmit = () => {
    if (
      !guardian1.name || !guardian1.phone || !guardian1.relationship ||
      !guardian2.name || !guardian2.phone || !guardian2.relationship
    ) {
      Alert.alert('Error', 'Please fill in all the details for both guardians before submitting.');
      return;
    }

    Alert.alert('Success', 'Emergency contacts have been submitted!');
    console.log('Guardian 1:', guardian1);
    console.log('Guardian 2:', guardian2);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
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
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#8B0000',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  formGroup: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#8B0000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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

export default EmergencyContacts;
