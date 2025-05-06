import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";

/*
    keep this comment and don't delete it, chatgpt.
structure of event object:
event:{date, description, matches, title, participants,id,location}
id is a number
participants is an array of strings
matches is an array of match objects that is structured like this:
const match = {
            id: number
            round: number,
            player1: string,
            player2: string,
            winner: string,
        };
the rest are strings
*/

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

export default function MatchesScreen() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    const { eventId } = useLocalSearchParams();
    const [matches, setMatches] = useState<any[]>([]);
    const [eventTitle, setEventTitle] = useState<string | null>(null);
    const [eventDate, setEventDate] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedMatch, setSelectedMatch] = useState<any | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const fetchEventData = useCallback(async () => {
        if (eventId) {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://192.168.1.9:3000/api/events/${eventId}`
                );
                const { title, date, matches } = response.data.event;
                setEventTitle(title);
                setEventDate(date);
                setMatches(matches || []);
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
                setMatches([]);
            } finally {
                setLoading(false);
            }
        } else {
            setError("No event ID provided");
            setEventTitle(null);
            setEventDate(null);
            setMatches([]);
            setLoading(false);
        }
    }, [eventId]);

    useEffect(() => {
        fetchEventData();
    }, [fetchEventData]);

    useFocusEffect(
        useCallback(() => {
            fetchEventData();
        }, [fetchEventData])
    );

    const handleMatchClick = (match: any) => {
        setSelectedMatch(match);
        setModalVisible(true);
    };

    const handleWinnerSelect = (winner: string) => {
        if (selectedMatch) {
            axios
                .patch(`http://192.168.1.9:3000/api/events/${eventId}/matches/${selectedMatch.id}/winner`, {
                    winner,
                })
                .then((response) => {
                    const updatedMatches = matches.map((m) =>
                        m.id === selectedMatch.id ? { ...m, winner: response.data.match.winner } : m
                    );
                    setMatches(updatedMatches);
                    setModalVisible(false);
                })
                .catch((error) => {
                    console.error("Error updating match winner:", error);
                });
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <EventHeader navigation={navigation} />
            <ScrollView contentContainerStyle={styles.participantsContainer}>
                {eventTitle && <Text style={styles.eventTitle}>{eventTitle}</Text>}
                {eventDate && <Text style={styles.eventInfo}>{eventDate}</Text>}
                <Text style={styles.sectionTitle}>Matches</Text>
                {loading ? (
                    <Text style={styles.loadingText}>Loading matches...</Text>
                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : matches.length === 0 ? (
                    <Text style={styles.noParticipantsText}>No matches found for this event.</Text>
                ) : (
                    matches.map((match) => (
                        <View key={match.id} style={styles.matchBox}>
                            <Text style={styles.roundText}>Round {match.round}</Text>
                            <Text style={styles.matchText}>
                                {match.player1} {match.winner === match.player1 && "✅"} vs{" "}
                                {match.player2} {match.winner === match.player2 && "✅"}
                            </Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleMatchClick(match)}
                            >
                                <Text style={styles.buttonText}>Select Winner</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </ScrollView>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Winner</Text>
                        <View style={styles.playerSelection}>
                            <TouchableOpacity
                                style={styles.playerColumn}
                                onPress={() => handleWinnerSelect(selectedMatch?.player1)}
                            >
                                <Text style={styles.playerName}>{selectedMatch?.player1}</Text>
                            </TouchableOpacity>
                            <View style={styles.divider} />
                            <TouchableOpacity
                                style={styles.playerColumn}
                                onPress={() => handleWinnerSelect(selectedMatch?.player2)}
                            >
                                <Text style={styles.playerName}>{selectedMatch?.player2}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
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
    matchBox: {
        backgroundColor: "#1A1A1A",
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    matchText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        fontFamily: "RussoOne",
    },
    roundText: {
        color: "#32CD32",
        fontSize: 14,
        marginBottom: 5,
    },
    button: {
        backgroundColor: "#32CD32",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,
        textAlign: "center",
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
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#1A1A1A",
        padding: 20,
        borderRadius: 10,
        width: 300,
        alignItems: "center",
    },
    modalTitle: {
        color: "#32CD32",
        fontSize: 18,
        marginBottom: 10,
    },
    playerSelection: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },
    playerColumn: {
        flex: 1,
        alignItems: "center",
        padding: 10,
    },
    playerName: {
        color: "#fff",
        fontSize: 18,
        fontFamily: "RussoOne",
    },
    divider: {
        width: 2,
        backgroundColor: "#32CD32",
        height: "100%",
    },
});
