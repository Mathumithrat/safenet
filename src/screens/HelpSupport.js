import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Modal, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';

const HelpSupport = () => {
  const [helpType, setHelpType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!helpType || !contact) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    console.log({
      helpType,
      contact,
      description,
      message,
    });

    Alert.alert('Success', 'Your request for help has been submitted!');
    setModalVisible(false);
    setHelpType('');
    setDescription('');
    setContact('');
    setMessage('');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Help and Support</Text>

        {/* Radio Buttons for Help Type */}
        <View style={styles.radioGroup}>
          <Text style={styles.formLabel}>Select Help Type</Text>
          {['Emergency', 'Medical Assistance', 'Legal Help', 'Other'].map((option) => (
            <View style={styles.radioOption} key={option}>
              <RadioButton
                value={option}
                status={helpType === option ? 'checked' : 'unchecked'}
                onPress={() => setHelpType(option)}
                color="#FF0000"
              />
              <Text style={styles.radioText}>{option}</Text>
            </View>
          ))}
        </View>

        {/* Button to trigger Modal */}
        <TouchableOpacity style={styles.primaryButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Add Description</Text>
        </TouchableOpacity>

        {/* Modal for Description */}
        <Modal animationType="slide" transparent={false} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>Describe the Issue</Text>

            {/* Description */}
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Please describe your situation"
              placeholderTextColor="#ccc"
              multiline
              value={description}
              onChangeText={setDescription}
            />

            {/* Contact Information */}
            <Text style={styles.modalHeader}>Contact Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your contact number"
              placeholderTextColor="#ccc"
              value={contact}
              onChangeText={setContact}
            />

            {/* Additional Message */}
            <Text style={styles.modalHeader}>Additional Message</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Add any additional details or message"
              placeholderTextColor="#ccc"
              multiline
              value={message}
              onChangeText={setMessage}
            />

            {/* Modal Buttons */}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalPrimaryButton} onPress={handleSubmit}>
                <Text style={styles.modalButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSecondaryButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Submit Request Button */}
        <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Request</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF0000',
    textAlign: 'center',
  },
  formLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  radioGroup: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioText: {
    fontSize: 16,
    color: '#555',
  },
  primaryButton: {
    backgroundColor: '#FF0000',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 16,
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  modalPrimaryButton: {
    backgroundColor: '#FF0000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
  },
  modalSecondaryButton: {
    backgroundColor: '#555',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HelpSupport;
