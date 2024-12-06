import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, Modal, TextInput, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

const WomenSafetyFeedback = () => {
  const [safetyConcern, setSafetyConcern] = useState('');
  const [situationDescription, setSituationDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [safetyRating, setSafetyRating] = useState('5');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    if (!safetyConcern || !contactInfo || !situationDescription) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    console.log({
      safetyConcern,
      situationDescription,
      contactInfo,
      safetyRating,
    });
    Alert.alert('Success', 'Your feedback has been submitted!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Women Safety Feedback Form</Text>

      <View style={styles.radioGroup}>
        <Text style={styles.formLabel}>Select Your Safety Concern</Text>
        <View style={styles.radioOption}>
          <RadioButton
            value="Harassment"
            status={safetyConcern === 'Harassment' ? 'checked' : 'unchecked'}
            onPress={() => setSafetyConcern('Harassment')}
            color="#B22222"
          />
          <Text style={styles.radioText}>Harassment</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton
            value="Physical Abuse"
            status={safetyConcern === 'Physical Abuse' ? 'checked' : 'unchecked'}
            onPress={() => setSafetyConcern('Physical Abuse')}
            color="#B22222"
          />
          <Text style={styles.radioText}>Physical Abuse</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton
            value="Stalking"
            status={safetyConcern === 'Stalking' ? 'checked' : 'unchecked'}
            onPress={() => setSafetyConcern('Stalking')}
            color="#B22222"
          />
          <Text style={styles.radioText}>Stalking</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton
            value="Other"
            status={safetyConcern === 'Other' ? 'checked' : 'unchecked'}
            onPress={() => setSafetyConcern('Other')}
            color="#B22222"
          />
          <Text style={styles.radioText}>Other</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Describe the Situation</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Describe the Safety Situation</Text>

            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Please describe the safety situation"
              placeholderTextColor="#aaa"
              multiline
              value={situationDescription}
              onChangeText={setSituationDescription}
            />

            <Text style={styles.modalText}>Contact Information</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your contact info (Email or Phone)"
              placeholderTextColor="#aaa"
              value={contactInfo}
              onChangeText={setContactInfo}
            />

            <Text style={styles.modalText}>Safety Rating (1-5)</Text>

            <View style={styles.radioOption}>
              <RadioButton
                value="5"
                status={safetyRating === '5' ? 'checked' : 'unchecked'}
                onPress={() => setSafetyRating('5')}
                color="#B22222"
              />
              <Text style={styles.modalText}>5 - Very Safe</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton
                value="4"
                status={safetyRating === '4' ? 'checked' : 'unchecked'}
                onPress={() => setSafetyRating('4')}
                color="#B22222"
              />
              <Text style={styles.modalText}>4 - Safe</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton
                value="3"
                status={safetyRating === '3' ? 'checked' : 'unchecked'}
                onPress={() => setSafetyRating('3')}
                color="#B22222"
              />
              <Text style={styles.modalText}>3 - Neutral</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton
                value="2"
                status={safetyRating === '2' ? 'checked' : 'unchecked'}
                onPress={() => setSafetyRating('2')}
                color="#B22222"
              />
              <Text style={styles.modalText}>2 - Unsafe</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton
                value="1"
                status={safetyRating === '1' ? 'checked' : 'unchecked'}
                onPress={() => setSafetyRating('1')}
                color="#B22222"
              />
              <Text style={styles.modalText}>1 - Very Unsafe</Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Submit" onPress={handleSubmit} color="#B22222" />
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="#B22222" />
            </View>
          </View>
        </View>
      </Modal>

      <Button title="Submit Feedback" onPress={handleSubmit} color="#B22222" />
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
    color: '#000',
  },
  button: {
    backgroundColor: '#B22222',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Black semi-transparent background
  },
  modalView: {
    backgroundColor: '#000', // Black background for the modal content
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff', // White text color
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#555', // Darker border color
    color: '#fff', // White text color in input fields
    width: '100%',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default WomenSafetyFeedback;
