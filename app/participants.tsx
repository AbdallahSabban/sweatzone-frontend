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
import { useRouter } from "expo-router";

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
    const participants = [
        { gamertag: "sniperman" },
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
});