// app/profile.tsx
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer";

export default function ProfileScreen() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();

    const openLeftDrawer = () => {
        navigation.openDrawer();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton} onPress={openLeftDrawer}>
                    <Text style={styles.menuText}>☰</Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { fontFamily: "RussoOne" }]}>My Profile</Text>
                <View style={styles.menuButton} />
            </View>
            <ScrollView contentContainerStyle={styles.profileContainer}>
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <Image
                        source={require("../assets/images/pfp.jpeg")} // Same as drawer
                        style={styles.profilePicture}
                    />
                    <Text style={[styles.username, { fontFamily: "RussoOne" }]}>Abdallah</Text>
                </View>

                {/* Tournament Results Section */}
                <Text style={styles.sectionTitle}>Previous Tournament Results</Text>
                <View style={styles.resultsBox}>
                    <Text style={styles.noResultsText}>No tournament results yet</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#000",
    },
    menuButton: {
        padding: 10,
        width: 50, // Fixed width for symmetry
    },
    menuText: {
        color: "#32CD32",
        fontSize: 30,
    },
    headerTitle: {
        color: "#32CD32",
        fontSize: 24,
        textAlign: "center",
        flex: 1,
    },
    profileContainer: {
        padding: 20,
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    profilePicture: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
    },
    username: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
    sectionTitle: {
        color: "#32CD32",
        fontSize: 20,
        marginBottom: 10,
    },
    resultsBox: {
        backgroundColor: "#1A1A1A",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    noResultsText: {
        color: "#B0B0B0",
        fontSize: 16,
    },
});