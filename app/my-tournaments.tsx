// app/my-tournaments.tsx
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useRouter } from "expo-router";
import {DrawerNavigationProp} from "@react-navigation/drawer";

export default function MyTournamentsScreen() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    const router = useRouter();

    const openLeftDrawer = () => {
        navigation.openDrawer();
    };

    const goToEventDetails = () => {
        router.push("/event-details");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton} onPress={openLeftDrawer}>
                    <Text style={styles.menuText}>☰</Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { fontFamily: "RussoOne" }]}>My Events</Text>
                <View style={styles.menuButton} />
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={[styles.sectionTitle, { fontFamily: "RussoOne" }]}>Upcoming</Text>
                <TouchableOpacity style={styles.eventBox} onPress={goToEventDetails}>
                    <Image
                        source={require("../assets/images/ewc.jpg")}
                        style={styles.eventImage}
                    />
                    <View style={styles.eventDetails}>
                        <Text style={styles.eventTitle}>Esports World Cup 2025</Text>
                        <Text style={styles.eventInfo}>March 15, 2025</Text>
                        <Text style={styles.eventInfo}>Jeddah, Saudi Arabia</Text>
                    </View>
                </TouchableOpacity>
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
    container: {
        padding: 20,
    },
    sectionTitle: {
        color: "#32CD32",
        fontSize: 24,
        marginBottom: 15,
    },
    eventBox: {
        flexDirection: "row",
        backgroundColor: "#1A1A1A",
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
    },
    eventImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    eventDetails: {
        marginLeft: 10,
        flex: 1,
    },
    eventTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    eventInfo: {
        color: "#B0B0B0",
        fontSize: 14,
        marginTop: 5,
    },
});