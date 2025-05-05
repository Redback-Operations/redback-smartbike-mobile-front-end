import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const friends = [
  {
    id: '1',
    name: 'Jordan Anderson',
    photo: 'https://i.pravatar.cc/150?img=12',
    email: 'jordan@example.com',
    dob: '1998-05-10',
  },
  {
    id: '2',
    name: 'Aviksha Vidya',
    photo: 'https://i.pravatar.cc/150?img=5',
    email: 'aviksha@example.com',
    dob: '1997-12-20',
  },
  {
    id: '3',
    name: 'Karan Kapoor',
    photo: 'https://i.pravatar.cc/150?img=20',
    email: 'karan@example.com',
    dob: '1995-07-30',
  },
  {
    id: '4',
    name: 'Alicia Chen',
    photo: 'https://i.pravatar.cc/150?img=24',
    email: 'alicia@example.com',
    dob: '1996-11-15',
  },
];

export default function FriendsScreen() {
  const router = useRouter();

  const goToDetails = (friend) => {
    router.push({
      pathname: '/frienddetails',
      params: {
        name: friend.name,
        photo: friend.photo,
        email: friend.email,
        dob: friend.dob,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Friends</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => goToDetails(item)}>
            <Image source={{ uri: item.photo }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: 'white' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  list: { paddingBottom: 20 },
  card: {
    flex: 1,
    backgroundColor: '#FEE',
    alignItems: 'center',
    margin: 10,
    borderRadius: 12,
    padding: 15,
  },
  image: { width: 70, height: 70, borderRadius: 35 },
  name: { marginTop: 10, fontWeight: '600' },
});
