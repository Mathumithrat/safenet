import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

  const MapPage = () => {
  const [region, setRegion] = useState(null); // State to hold region data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Request location permission and get current location
    const getLocation = async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        setLoading(false);
        return;
      }

      // Get current location
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922, // Set zoom level
        longitudeDelta: 0.0421, // Set zoom level
      });

      setLoading(false);
    };

    getLocation();
  }, []);

  // Show a loading indicator if the location is being fetched
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          region={region} // Use the current region state
          showsUserLocation={true} // Show user's current location
          followUserLocation={true} // Follow the user's location as it moves
        >
          {/* Optional: Place a marker at the user's location */}
          <Marker coordinate={region} />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapPage;
