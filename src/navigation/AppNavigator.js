import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the Icon component
import Home from '../screens/Home';
import EmergencyContacts from '../screens/EmergencyContacts';
import IncidentReport from '../screens/IncidentReport';
import HelpSupport from '../screens/HelpSupport';
import AboutFeedback from '../screens/AboutFeedback';

const Drawer = createDrawerNavigator();

const AppNavigator = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen 
      name="Home" 
      component={Home} 
      options={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity style={{ flexDirection: 'row', marginRight: 15 }}>
            <TouchableOpacity onPress={() => console.log('Notification pressed')}>
              <Icon name="bell" size={24} color='black' style={{ marginRight: 15 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Settings pressed')}>
              <Icon name="cog" size={24} color='black' />
            </TouchableOpacity>
          </TouchableOpacity>
        ),
      })}
    />
    <Drawer.Screen name="EmergencyContacts" component={EmergencyContacts} />
    <Drawer.Screen name="IncidentReport" component={IncidentReport} />
    <Drawer.Screen name="HelpSupport" component={HelpSupport} />
    <Drawer.Screen name="AboutFeedback" component={AboutFeedback} />
  </Drawer.Navigator>
);

export default AppNavigator;
