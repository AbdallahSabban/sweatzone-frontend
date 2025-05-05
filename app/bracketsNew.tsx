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
import Svg, { Rect, Path, Text as SvgText } from "react-native-svg";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";

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

export default function BracketsScreen() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    const { eventId } = useLocalSearchParams<{ eventId: string }>();
    const [eventTitle, setEventTitle] = useState("Loading...");

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
    useEffect(() => {
        const fetchEventTitle = async () => {
            try {
                const response = await axios.get(`http://192.168.1.9:3000/api/events/${eventId}`);
                console.log("Fetched event data:", response.data);
                // Adjust this depending on your backend response shape
                setEventTitle(response.data.event.title || "Untitled Event");
            } catch (error) {
                console.error("Failed to fetch event title:", error);
                setEventTitle("Failed to load title");
            }
        };

        if (eventId) {
            fetchEventTitle();
        }
    }, [eventId]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <EventHeader navigation={navigation} />
            <Text style={styles.pageTitle}>{eventTitle}</Text>
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

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
    bracketsContainer: {
        padding: 20,
    },
    pageTitle: {
        color: "#32CD32",
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
    },
    sectionTitle: {
        color: "#32CD32",
        fontSize: 20,
        marginTop: 20,
        marginBottom: 10,
        fontFamily: "RussoOne",
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
});
