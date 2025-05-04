// app/event-details.tsx
import { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDrawerNavigator, DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Svg, { Rect, Path, Text as SvgText } from "react-native-svg";
import axios, { AxiosError } from "axios"; // Import AxiosError

const Drawer = createDrawerNavigator();

// Reusable Header Component
function EventHeader({ navigation }: { navigation: DrawerNavigationProp<any> }) {
    const router = useRouter();

    const openRightDrawer = () => {
        navigation.openDrawer();
    };

    const goBackToHome = () => {
        router.push("/home");
    };

    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={goBackToHome}>
                <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={openRightDrawer}>
                <Text style={styles.menuText}>☰</Text>
            </TouchableOpacity>
        </View>
    );
}

// Event Details Content
function EventDetailsContent() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    const { eventId } = useLocalSearchParams();
    const [eventTitle, setEventTitle] = useState<string | null>(null);
    const [eventDescription, setEventDescription] = useState<string | null>(null);
    const [eventDate, setEventDate] = useState<string | null>(null);
    const [eventLocation, setEventLocation] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch event data when eventId is available
    useEffect(() => {
        if (eventId) {
            const fetchEvent = async () => {
                try {
                    const response = await axios.get(`http://192.168.1.9:3000/api/events/${eventId}`);
                    const { title, description, date, location } = response.data.event;
                    setEventTitle(title);
                    setEventDescription(description);
                    setEventDate(date);
                    setEventLocation(location);
                    setError(null);
                } catch (err) {
                    const axiosError = err as AxiosError; // Type err as AxiosError
                    console.error("Error fetching event:", {
                        message: axiosError.message,
                        response: axiosError.response ? {
                            status: axiosError.response.status,
                            data: axiosError.response.data,
                        } : null,
                        eventId,
                    });
                    setError("Failed to fetch event details");
                    setEventTitle(null);
                    setEventDescription(null);
                    setEventDate(null);
                    setEventLocation(null);
                }
            };
            fetchEvent();
        } else {
            setEventTitle(null);
            setEventDescription(null);
            setEventDate(null);
            setEventLocation(null);
            setError("No event ID provided");
        }
    }, [eventId]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.detailsContainer}>
                <EventHeader navigation={navigation} />
                {error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : null}
                <Image
                    source={require("../assets/images/trophy.png")}
                    style={styles.eventImage}
                    resizeMode="contain"
                />
                <Text style={styles.eventTitle}>
                    {eventTitle || "Esports World Cup 2025"}
                </Text>
                <Text style={styles.eventInfo}>
                    {eventDate || "March 15, 2025"}
                </Text>
                <Text style={styles.eventInfo}>
                    {eventLocation || "Jeddah, Saudi Arabia"}
                </Text>
                <Text style={styles.eventInfo}>Organizer: SweatZone Team</Text>
                <Text style={styles.sectionTitle}>Event Description</Text>
                <Text style={styles.organizerText}>
                    {eventDescription || "Join us for the ultimate esports showdown! This event features top-tier teams competing in a high-stakes tournament. Don’t miss out on the action—register now and be part of the excitement!"}
                </Text>
                <TouchableOpacity style={styles.registerButton} onPress={() => console.log("Register clicked")}>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

// Brackets Screen with SVG
function BracketsScreen() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    const participants = [
        "xX_Sniper_Xx",
        "Ahmad Elmaamoun",
        "Abdallah",
        "BlazeMaster",
        "NinjaLegend",
    ];

    const boxWidth = 150;
    const boxHeight = 40;
    const spacing = 20;
    const verticalSpacing = 60;
    const totalWidth = 650;

    return (
        <SafeAreaView style={styles.safeArea}>
            <EventHeader navigation={navigation} />
            <ScrollView
                horizontal={true}
                contentContainerStyle={styles.bracketsContainer}
                showsHorizontalScrollIndicator={true}
            >
                <View>
                    <Text style={styles.sectionTitle}>Brackets</Text>
                    <Svg height="500" width={totalWidth}>
                        {/* Quarterfinals */}
                        <Rect x="10" y="50" width={boxWidth} height={boxHeight} fill="#1A1A1A" rx="5" />
                        <SvgText x="15" y="70" fill="#fff" fontSize="16">{participants[0]}</SvgText>
                        <Rect x="10" y="90" width={boxWidth} height={boxHeight} fill="#1A1A1A" rx="5" />
                        <SvgText x="15" y="110" fill="#fff" fontSize="16">{participants[1]}</SvgText>
                        <Rect x="10" y="170" width={boxWidth} height={boxHeight} fill="#1A1A1A" rx="5" />
                        <SvgText x="15" y="190" fill="#fff" fontSize="16">{participants[2]}</SvgText>
                        <Rect x="10" y="210" width={boxWidth} height={boxHeight} fill="#1A1A1A" rx="5" />
                        <SvgText x="15" y="230" fill="#fff" fontSize="16">{participants[3]}</SvgText>
                        <Rect x="10" y="290" width={boxWidth} height={boxHeight} fill="#1A1A1A" rx="5" />
                        <SvgText x="15" y="310" fill="#fff" fontSize="16">{participants[4]} (Bye)</SvgText>

                        {/* Connecting Lines - Quarterfinals to Semifinals */}
                        <Path d="M160 70 H200 V150 H240" stroke="#32CD32" strokeWidth="2" fill="none" />
                        <Path d="M160 190 H200 V150 H240" stroke="#32CD32" strokeWidth="2" fill="none" />
                        <Path d="M160 310 H240" stroke="#32CD32" strokeWidth="2" fill="none" />

                        {/* Semifinals */}
                        <Rect x="240" y="130" width={boxWidth} height={boxHeight} fill="#1A1A1A" rx="5" />
                        <SvgText x="245" y="150" fill="#fff" fontSize="16">Winner QF1</SvgText>
                        <Rect x="240" y="170" width={boxWidth} height={boxHeight} fill="#1A1A1A" rx="5" />
                        <SvgText x="245" y="190" fill="#fff" fontSize="16">{participants[4]}</SvgText>
                        <Rect x="240" y="250" width={boxWidth} height={boxHeight} fill="#1A1A1A" rx="5" />
                        <SvgText x="245" y="270" fill="#fff" fontSize="16">Winner QF2</SvgText>
                        <Rect x="240" y="290" width={boxWidth} height={boxHeight} fill="#1A1A1A" rx="5" />
                        <SvgText x="245" y="310" fill="#fff" fontSize="16">TBD</SvgText>

                        {/* Connecting Lines - Semifinals to Final */}
                        <Path d="M390 150 H430 V270 H470" stroke="#32CD32" strokeWidth="2" fill="none" />
                        <Path d="M390 270 H430 V270 H470" stroke="#32CD32" strokeWidth="2" fill="none" />

                        {/* Final */}
                        <Rect x="470" y="250" width={boxWidth} height={boxHeight} fill="#1A1A1A" rx="5" />
                        <SvgText x="475" y="270" fill="#fff" fontSize="16">Winner SF1</SvgText>
                        <Rect x="470" y="290" width={boxWidth} height={boxHeight} fill="#1A1A1A" rx="5" />
                        <SvgText x="475" y="310" fill="#fff" fontSize="16">Winner SF2</SvgText>
                    </Svg>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Participants Screen
function ParticipantsScreen() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    const participants = [
        { gamertag: "xX_Sniper_Xx" },
        { gamertag: "Ahmad Elmaamoun" },
        { gamertag: "Abdallah" },
        { gamertag: "BlazeMaster" },
        { gamertag: "NinjaLegend" },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <EventHeader navigation={navigation} />
            <ScrollView contentContainerStyle={styles.participantsContainer}>
                <Text style={styles.sectionTitle}>Participants</Text>
                {participants.map((participant, index) => (
                    <View key={index} style={styles.participantBox}>
                        <Text style={styles.participantText}>{participant.gamertag}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

// Right Drawer Content
function RightDrawerContent(props: DrawerContentComponentProps) {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: "#000" }}>
            <Text style={[styles.sectionTitle, { padding: 20 }]}>Event Options</Text>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

export default function EventDetails() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer.Navigator
                drawerContent={(props) => <RightDrawerContent {...props} />}
                screenOptions={{
                    headerShown: false,
                    drawerPosition: "right",
                    drawerStyle: { backgroundColor: "#000", width: 250 },
                    drawerActiveTintColor: "#32CD32",
                    drawerInactiveTintColor: "#fff",
                }}
            >
                <Drawer.Screen name="Details" component={EventDetailsContent} />
                <Drawer.Screen name="Brackets" component={BracketsScreen} />
                <Drawer.Screen name="Participants" component={ParticipantsScreen} />
            </Drawer.Navigator>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
    detailsContainer: {
        padding: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    backButton: {
        padding: 10,
    },
    backText: {
        color: "#32CD32",
        fontSize: 18,
    },
    menuButton: {
        padding: 10,
    },
    menuText: {
        color: "#32CD32",
        fontSize: 30,
    },
    eventImage: {
        width: "100%",
        height: 150,
        borderRadius: 10,
        marginBottom: 15,
    },
    eventTitle: {
        color: "#32CD32",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        fontFamily: "RussoOne",
    },
    eventInfo: {
        color: "#B0B0B0",
        fontSize: 16,
        marginBottom: 5,
    },
    errorText: {
        color: "red",
        fontSize: 16,
        marginBottom: 15,
    },
    sectionTitle: {
        color: "#32CD32",
        fontSize: 20,
        marginTop: 20,
        marginBottom: 10,
        fontFamily: "RussoOne",
    },
    organizerText: {
        color: "#fff",
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 20,
    },
    registerButton: {
        backgroundColor: "#32CD32",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    registerButtonText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
    },
    centeredContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    bracketsContainer: {
        padding: 20,
    },
    participantsContainer: {
        padding: 20,
    },
    participantBox: {
        backgroundColor: "#1A1A1A",
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    participantText: {
        color: "#fff",
        fontSize: 16,
    },
});