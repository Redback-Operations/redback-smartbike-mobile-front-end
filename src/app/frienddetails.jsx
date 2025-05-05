import { View, Text, Image, StyleSheet, Linking, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function FriendDetails() {
  const { name, photo, email, dob } = useLocalSearchParams();

  const handleStravaPress = () => {
    Linking.openURL('https://www.strava.com/'); // or a user-specific Strava link if available
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.detail}>📧 {email}</Text>
      <Text style={styles.detail}>🎂 {dob}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Add on Strava" onPress={handleStravaPress} color="#FC4C02" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: 'white', alignItems: 'center' },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 16 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  detail: { fontSize: 16, marginBottom: 4 },
  buttonContainer: { marginTop: 24, width: '80%' },
});
