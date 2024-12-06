import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Menu = ({ navigation }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePress = (item) => {
    setSelectedItem(item);
    navigation.navigate(item);
  };

  return (
    <View style={styles.container}>
      {/* Header with icons */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="bars" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>WOMEN SAFETY</Text>

        {/* Header icons aligned to the top right */}
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Icon name="bell" size={24} color="#ffd700" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="cog" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Items */}
      <TouchableOpacity
        onPress={() => handlePress('EmergencyContacts')}
        style={[
          styles.menuItem,
          selectedItem === 'EmergencyContacts' && styles.selectedMenuItem,
        ]}
      >
        <Text style={styles.menuText}>Emergency Contacts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress('IncidentReport')}
        style={[
          styles.menuItem,
          selectedItem === 'IncidentReport' && styles.selectedMenuItem,
        ]}
      >
        <Text style={styles.menuText}>Incident Report</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress('HelpSupport')}
        style={[
          styles.menuItem,
          selectedItem === 'HelpSupport' && styles.selectedMenuItem,
        ]}
      >
        <Text style={styles.menuText}>Help and Support</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress('AboutFeedback')}
        style={[
          styles.menuItem,
          selectedItem === 'AboutFeedback' && styles.selectedMenuItem,
        ]}
      >
        <Text style={styles.menuText}>About and Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B0000',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    position: 'relative',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  headerIcons: {
    position: 'absolute',
    top: 10,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedMenuItem: {
    backgroundColor: '#ff0000', // Red background for selected item
  },
  menuText: {
    fontSize: 18,
    color: '#000',
  },
});

export default Menu;
