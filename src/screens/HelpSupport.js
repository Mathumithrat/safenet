import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Modal, TextInput, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

const HelpSupport = () => {
  const [helpType, setHelpType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = () => {
    if (!helpType || !contact) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Log the submitted data
    console.log({
      helpType,
      contact,
      description,
      message,
    });

    // Show success alert and close modal
    Alert.alert('Success', 'Your request for help has been submitted!');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Help and Support</Text>

      {/* Radio Buttons for Help Type */}
      <View style={styles.radioGroup}>
        <Text style={styles.formLabel}>Select Help Type</Text>
        <View style={styles.radioOption}>
          <RadioButton
            value="Emergency"
            status={helpType === 'Emergency' ? 'checked' : 'unchecked'}
            onPress={() => setHelpType('Emergency')}
          />
          <Text style={styles.radioText}>Emergency</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton
            value="Medical Assistance"
            status={helpType === 'Medical Assistance' ? 'checked' : 'unchecked'}
            onPress={() => setHelpType('Medical Assistance')}
          />
          <Text style={styles.radioText}>Medical Assistance</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton
            value="Legal Help"
            status={helpType === 'Legal Help' ? 'checked' : 'unchecked'}
            onPress={() => setHelpType('Legal Help')}
          />
          <Text style={styles.radioText}>Legal Help</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton
            value="Other"
            status={helpType === 'Other' ? 'checked' : 'unchecked'}
            onPress={() => setHelpType('Other')}
          />
          <Text style={styles.radioText}>Other</Text>
        </View>
      </View>

      {/* Button to trigger Modal for Description */}
      <TouchableOpacity style={styles.redButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Add Description</Text>
      </TouchableOpacity>

      {/* Modal for Description and Additional Message */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Describe the Issue</Text>
          
          {/* Description TextInput */}
          <TextInput
            style={[styles.input, styles.descriptionInput, { color: '#fff' }]}
            placeholder="Please describe your situation"
            placeholderTextColor="#ccc"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.modalText}>Contact Information</Text>

          {/* Contact TextInput */}
          <TextInput
            style={[styles.input, { color: '#fff' }]}
            placeholder="Enter your contact number"
            placeholderTextColor="#ccc"
            value={contact}
            onChangeText={setContact}
          />

          <Text style={styles.modalText}>Additional Message</Text>

          {/* Message TextInput */}
          <TextInput
            style={[styles.input, styles.descriptionInput, { color: '#fff' }]}
            placeholder="Add any additional details or message"
            placeholderTextColor="#ccc"
            multiline
            value={message}
            onChangeText={setMessage}
          />

          {/* Red Submit and Cancel Buttons */}
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalRedButton} onPress={handleSubmit}>
              <Text style={styles.modalButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalRedButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Submit Request Button */}
      <TouchableOpacity style={styles.redButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Request</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#8B0000',
  },
  radioGroup: {
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  },
  redButton: {
    backgroundColor: '#FF0000',  // Red color for the "Submit Request" and "Add Description" buttons
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',  // Set a solid black background
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    width: 300,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  modalRedButton: {
    backgroundColor: '#FF0000',  // Red color for modal buttons
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HelpSupport;
