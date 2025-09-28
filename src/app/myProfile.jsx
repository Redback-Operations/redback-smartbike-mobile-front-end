import { View, Text, Image, StyleSheet, Button, Linking } from "react-native";
import CustomSafeArea from "@/components/CustomSafeArea";
import { useThemeStyles } from "@/hooks/useThemeStyles";

export default function UserDetails() {
  const { inlineStyles, theme } = useThemeStyles();
  const user = {
    name: "Aviksha Vidya Koundinya",
    email: "aviksha@example.com",
    dob: "1998-07-25",
    photo: "https://i.pravatar.cc/150?img=5",
    stravaLink: "https://www.strava.com/athletes/aviksha",
  };

  const handleStravaPress = () => {
    Linking.openURL(user.stravaLink);
  };

  return (
    <View style={inlineStyles.background} className="flex-1">
      <CustomSafeArea>
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <Image source={{ uri: user.photo }} style={styles.avatar} />
          <Text style={[styles.name, { color: theme.text }]}>{user.name}</Text>
          <Text style={[styles.detail, { color: theme.textSecondary }]}>📧 {user.email}</Text>
          <Text style={[styles.detail, { color: theme.textSecondary }]}>🎂 {user.dob}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="View on Strava"
              onPress={handleStravaPress}
              color={theme.primary}
            />
          </View>
        </View>
      </CustomSafeArea>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 16 },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  detail: { fontSize: 16, marginBottom: 4 },
  buttonContainer: { marginTop: 24, width: "80%" },
});
