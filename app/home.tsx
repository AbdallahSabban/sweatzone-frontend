// app/home.tsx
import { SetStateAction, useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    RefreshControl,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDrawerNavigator, DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from "@react-navigation/drawer";
import { useRouter, useNavigation, useFocusEffect } from "expo-router";
import ProfileScreen from "./profile";
import SettingsScreen from "./settings";
import MyTournamentsScreen from "./my-tournaments";
import OrganizeEventScreen from "./organize-event";
import axios from "axios";

const Drawer = createDrawerNavigator();

// Define the event type
type Event = {
    id: number;
    title: string;
    date: string;
    location: string;
};

function HomeContent() {
    const router = useRouter();
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    const [searchQuery, setSearchQuery] = useState("");
    const [events, setEvents] = useState<Event[]>([]);
    const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

    // Function to fetch events
    const fetchEvents = useCallback(async () => {
        try {
            const response = await axios.get("http://192.168.1.9:3000/api/events");
            setEvents(response.data.events);
            console.log("Fetched events:", response.data.events);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setRefreshing(false); // Stop refreshing after fetch completes
        }
    }, []);

    // Refetch events every time the screen is focused
    useFocusEffect(
        useCallback(() => {
            fetchEvents();
        }, [fetchEvents])
    );

    // Handle pull-to-refresh
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchEvents();
    }, [fetchEvents]);

    const handleSearch = (text: SetStateAction<string>) => {
        setSearchQuery(text);
        console.log("Searching for:", text);
    };

    const goToEventDetails = (eventId?: number) => {
        router.push({ pathname: "/event-details", params: { eventId } });
    };

    const openLeftDrawer = () => {
        navigation.openDrawer();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton} onPress={openLeftDrawer}>
                    <Text style={styles.menuText}>☰</Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { fontFamily: "RussoOne" }]}>Explore</Text>
                <View style={styles.menuButton} />
            </View>
            <ScrollView
                contentContainerStyle={styles.homeContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#32CD32" // Color of the refresh indicator
                        colors={["#32CD32"]} // Color for the spinner (Android)
                    />
                }
            >
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search Events..."
                    placeholderTextColor="#B0B0B0"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
                <Text style={[styles.sectionTitle, { fontFamily: "RussoOne" }]}>
                    Featured Events
                </Text>
                {/* Example Event */}
                <TouchableOpacity
                    style={styles.eventBox}
                    onPress={() => router.push("/ewc-details")}
                >
                    <Image
                        source={require("../assets/images/ewc.jpg")}
                        style={styles.eventImage}
                    />
                    <View style={styles.eventDetails}>
                        <Text style={styles.eventTitle}>Esports World Cup 2025</Text>
                        <Text style={styles.eventInfo}>Sun May 11 2025</Text>
                        <Text style={styles.eventInfo}>Jeddah, Saudi Arabia</Text>
                    </View>
                </TouchableOpacity>
                {/* Fetched Events */}
                {events.map((event) => (
                    <TouchableOpacity
                        key={event.id}
                        style={styles.eventBox}
                        onPress={() => goToEventDetails(event.id)}
                    >
                        <Image
                            source={require("../assets/images/trophy.png")}
                            style={styles.eventImage}
                        />
                        <View style={styles.eventDetails}>
                            <Text style={styles.eventTitle}>{event.title}</Text>
                            <Text style={styles.eventInfo}>{event.date}</Text>
                            <Text style={styles.eventInfo}>{event.location}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

// Custom Drawer Content
function CustomDrawerContent(props: DrawerContentComponentProps) {
    const router = useRouter();

    const handleLogout = () => {
        console.log("Logged out");
        router.replace("/");
    };

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: "#000" }}>
            <View
                style={{
                    padding: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: "#32CD32",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Image
                    source={require("../assets/images/pfp.jpeg")}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                />
                <Text style={{ color: "#fff", fontSize: 18, marginLeft: 10, fontFamily: "RussoOne" }}>
                    Abdallah
                </Text>
            </View>
            <DrawerItemList {...props} />
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <TouchableOpacity
                    style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#32CD32" }}
                    onPress={handleLogout}
                >
                    <Text style={{ color: "#fff", fontSize: 16 }}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
}

// Drawer Navigator
export default function Home() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    headerShown: false,
                    drawerStyle: { backgroundColor: "#000", width: 250 },
                    drawerActiveTintColor: "#32CD32",
                    drawerInactiveTintColor: "#fff",
                }}
            >
                <Drawer.Screen name="Home" component={HomeContent} />
                <Drawer.Screen name="Profile" component={ProfileScreen} />
                <Drawer.Screen name="My Tournaments" component={MyTournamentsScreen} />
                <Drawer.Screen name="Organize Event" component={OrganizeEventScreen} />
                <Drawer.Screen name="Settings" component={SettingsScreen} />
            </Drawer.Navigator>
        </GestureHandlerRootView>
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
        width: 50,
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
    homeContainer: {
        padding: 20,
    },
    searchBar: {
        height: 50,
        backgroundColor: "#1A1A1A",
        borderRadius: 10,
        paddingHorizontal: 15,
        color: "#fff",
        fontSize: 16,
        marginBottom: 20,
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