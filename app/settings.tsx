// app/settings.tsx
import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    Switch,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer";

export default function SettingsScreen() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState<"account" | "notifications" | null>(null);

    // Account state
    const [username, setUsername] = useState("Abdallah");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Notifications state
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(true);

    // Load Russo One font
    const [fontsLoaded] = useFonts({
        RussoOne: require("../assets/fonts/RussoOne-Regular.ttf"),
    });

    // Validation for account fields
    const validateInputs = () => {
        let isValid = true;

        if (username.length < 3) {
            setUsernameError("Username must be at least 3 characters");
            isValid = false;
        } else {
            setUsernameError("");
        }

        if (password.length < 6 || !/\d/.test(password)) {
            setPasswordError("Password must be 6+ characters and include a number");
            isValid = false;
        } else {
            setPasswordError("");
        }

        return isValid;
    };

    const handleSaveAccount = () => {
        if (validateInputs()) {
            console.log("Saving:", { username, password });
            setModalVisible(false);
            setPassword("");
        }
    };

    const openModal = (type: "account" | "notifications") => {
        setModalType(type);
        setModalVisible(true);
    };

    const openLeftDrawer = () => {
        navigation.openDrawer();
    };

    // Wait for fonts to load
    if (!fontsLoaded) {
        return (
            <View style={styles.safeArea}>
                <Text style={{ color: "#fff" }}>Loading fonts...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton} onPress={openLeftDrawer}>
                    <Text style={styles.menuText}>☰</Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { fontFamily: "RussoOne" }]}>Settings</Text>
                <View style={styles.menuButton} />
            </View>
            <ScrollView contentContainerStyle={styles.container}>

                <TouchableOpacity style={styles.optionButton} onPress={() => openModal("account")}>
                    <Text style={styles.optionText}>Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton} onPress={() => openModal("notifications")}>
                    <Text style={styles.optionText}>Notifications</Text>
                </TouchableOpacity>

                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <ScrollView contentContainerStyle={{ padding: 20 }}>
                                {modalType === "account" && (
                                    <>
                                        <Text style={styles.modalTitle}>Edit Account</Text>
                                        <Text style={styles.label}>New Username</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Username"
                                            placeholderTextColor="#B0B0B0"
                                            value={username}
                                            onChangeText={setUsername}
                                        />
                                        {usernameError ? (
                                            <Text style={styles.errorText}>{usernameError}</Text>
                                        ) : null}
                                        <Text style={styles.label}>New Password</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Password"
                                            placeholderTextColor="#B0B0B0"
                                            secureTextEntry
                                            value={password}
                                            onChangeText={setPassword}
                                        />
                                        {passwordError ? (
                                            <Text style={styles.errorText}>{passwordError}</Text>
                                        ) : null}
                                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAccount}>
                                            <Text style={styles.saveButtonText}>Save</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                                {modalType === "notifications" && (
                                    <>
                                        <Text style={styles.modalTitle}>Notifications</Text>
                                        <View style={styles.switchRow}>
                                            <Text style={styles.switchLabel}>Email Notifications</Text>
                                            <Switch
                                                value={emailNotifications}
                                                onValueChange={setEmailNotifications}
                                                trackColor={{ false: "#767577", true: "#32CD32" }}
                                                thumbColor={emailNotifications ? "#fff" : "#f4f3f4"}
                                            />
                                        </View>
                                        <View style={styles.switchRow}>
                                            <Text style={styles.switchLabel}>Push Notifications</Text>
                                            <Switch
                                                value={pushNotifications}
                                                onValueChange={setPushNotifications}
                                                trackColor={{ false: "#767577", true: "#32CD32" }}
                                                thumbColor={pushNotifications ? "#fff" : "#f4f3f4"}
                                            />
                                        </View>
                                    </>
                                )}
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
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
    title: {
        color: "#32CD32",
        fontSize: 48,
        marginBottom: 20,
        textAlign: "center",
    },
    optionButton: {
        padding: 15,
        backgroundColor: "#1A1A1A",
        borderRadius: 10,
        marginVertical: 10,
    },
    optionText: {
        color: "#fff",
        fontSize: 18,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#1A1A1A",
        borderRadius: 10,
        maxHeight: "80%",
    },
    modalTitle: {
        color: "#32CD32",
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 50,
        borderColor: "#32CD32",
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        color: "#fff",
        fontSize: 16,
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginBottom: 10,
    },
    switchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 15,
    },
    switchLabel: {
        color: "#fff",
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: "#32CD32",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    saveButtonText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
    },
    closeButton: {
        padding: 15,
        alignItems: "center",
        marginTop: 20,
    },
    closeButtonText: {
        color: "#007BFF",
        fontSize: 16,
    },
    label: {
        color: "#32CD32",
        fontSize: 16,
        marginBottom: 5,
        marginTop: 10,
    },
});