// app/home.tsx
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import { useEffect } from 'react';
import styles from './styles'; // Importing the styles from _styles.ts

export default function HomePage() {
    const navigation = useNavigation();
    const router = useRouter(); // For programmatic navigation

    useEffect(() => {
        // Disable swipe back gesture on the Home page after login
        navigation.setOptions({
            gestureEnabled: false, // Disable swipe gesture
        });
    }, [navigation]);

    const handleLogout = () => {
        // Add any logout logic here (e.g., clear auth state if applicable)
        router.replace('/'); // Navigate back to index.tsx
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.welcomeText, { fontFamily: 'RussoOne' }]}>Welcome to SweatZone!</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}