import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Profile = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Profile Screen</Text>
    <Button title="Back to Home" onPress={() => navigation.goBack()} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});

export default Profile;
