// app/home.tsx
import { SetStateAction, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDrawerNavigator, DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from "@react-navigation/drawer";
import { useRouter, useNavigation } from "expo-router";
import ProfileScreen from "./profile";
import SettingsScreen from "./settings";
import MyTournamentsScreen from "./my-tournaments";
import OrganizeEventScreen from "./organize-event"; // New screen

const Drawer = createDrawerNavigator();

// Home Screen with Search Bar and Featured Events
function HomeContent() {
    const router = useRouter();
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (text: SetStateAction<string>) => {
        setSearchQuery(text);
        console.log("Searching for:", text);
    };

    const goToEventDetails = () => {
        router.push("/event-details");
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
            <ScrollView contentContainerStyle={styles.homeContainer}>
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