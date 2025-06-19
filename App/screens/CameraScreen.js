import React, { useEffect, useState, useRef } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { Magnetometer } from "expo-sensors";

export default function CameraScreen({ route, navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [locationPermission, setLocationPermission] = useState(false);
  const ref = useRef(null);
  const { onPhotoTaken } = route.params || {}; // get onPhotoTaken function
  const [location, setLocation] = useState(null);
  const [compassHeading, setCompassHeading] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const { coords } = await Location.getCurrentPositionAsync({});
        setLocation({ latitude: coords.latitude, longitude: coords.longitude });
      }
    };

    if (!locationPermission) {
      getLocation();
      setLocationPermission(true);
    }
  }, [locationPermission]);

  useEffect(() => {
    const subscribeToMagnetometer = Magnetometer.addListener((data) => {
      const { x, y, z } = data;
      const heading = Math.atan2(y, x) * (180 / Math.PI);
      setCompassHeading(heading);
    });

    Magnetometer.setUpdateInterval(1000);

    return () => {
      subscribeToMagnetometer.remove();
    };
  }, []);

  useEffect(() => {
    const checkPermission = async () => {
      const { status } = await requestPermission();
      if (status !== "granted") {
        console.log("Camera permission not granted.");
      }
    };

    if (!permission?.granted) {
      checkPermission();
    }
  }, [permission, requestPermission]);

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to use the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (onPhotoTaken) {
      onPhotoTaken(photo.uri, location, compassHeading); 
    }
    navigation.goBack(); 
  };

  const renderCamera = () => (
    <CameraView
      style={styles.camera}
      ref={ref}
      mode={"picture"}
      facing={"back"}
    >
      <View style={styles.shutterContainer}>
        <Pressable
          onPress={takePicture}
          disabled={!location}
          style={({ pressed }) => [
            styles.shutterBtn,
            { opacity: pressed ? 0.5 : location ? 1 : 0.3 },
          ]}
        >
          <View style={styles.shutterBtnInner} />
        </Pressable>
      </View>
    </CameraView>
  );

  return (
    <View style={styles.container}>
      {renderCamera()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
