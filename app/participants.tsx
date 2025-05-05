import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

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

export default function ParticipantsScreen() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    const { eventId } = useLocalSearchParams();
    const [participants, setParticipants] = useState<string[]>([]);
    const [eventTitle, setEventTitle] = useState<string | null>(null); // Optional
    const [eventDate, setEventDate] = useState<string | null>(null); // Optional
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch event data (including participants) when eventId is available
    useEffect(() => {
        if (eventId) {
            const fetchEventData = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(
                        `http://192.168.1.9:3000/api/events/${eventId}`
                    );
                    const { title, date, participants } = response.data.event;
                    setEventTitle(title);
                    setEventDate(date);
                    setParticipants(participants || []);
                    setError(null);
                } catch (err) {
                    const axiosError = err as AxiosError;
                    console.error("Error fetching event data:", {
                        message: axiosError.message,
                        response: axiosError.response
                            ? {
                                status: axiosError.response.status,
                                data: axiosError.response.data,
                            }
                            : null,
                        eventId,
                    });
                    setError("Failed to fetch event data");
                    setEventTitle(null);
                    setEventDate(null);
                    setParticipants([]);
                } finally {
                    setLoading(false);
                }
            };
            fetchEventData();
        } else {
            setError("No event ID provided");
            setEventTitle(null);
            setEventDate(null);
            setParticipants([]);
            setLoading(false);
        }
    }, [eventId]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <EventHeader navigation={navigation} />
            <ScrollView contentContainerStyle={styles.participantsContainer}>
                {/* Optional: Display event title and date */}
                {eventTitle && <Text style={styles.eventTitle}>{eventTitle}</Text>}
                {eventDate && <Text style={styles.eventInfo}>{eventDate}</Text>}
                <Text style={styles.sectionTitle}>Participants</Text>
                {loading ? (
                    <Text style={styles.loadingText}>Loading participants...</Text>
                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : participants.length === 0 ? (
                    <Text style={styles.noParticipantsText}>No participants found for this event.</Text>
                ) : (
                    participants.map(( participant, index) => (
                        <View key={index} style={styles.participantBox}>
                            <Text style={styles.participantText}>{participant}</Text>
                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
    participantsContainer: {
        padding: 20,
    },
    sectionTitle: {
        color: "#32CD32",
        fontSize: 20,
        marginTop: 20,
        marginBottom: 10,
        fontFamily: "RussoOne",
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
    errorText: {
        color: "red",
        fontSize: 16,
        marginBottom: 15,
    },
    loadingText: {
        color: "#B0B0B0",
        fontSize: 16,
        marginBottom: 15,
    },
    noParticipantsText: {
        color: "#B0B0B0",
        fontSize: 16,
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
});