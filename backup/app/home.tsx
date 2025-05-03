// app/home.tsx
import { View, Text, Image, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import ProfileScreen from "./profile"; // Import profile.tsx

const Drawer = createDrawerNavigator();

// Home Screen (inline for simplicity)
function HomeContent() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
            <Text style={{ color: "#32CD32", fontSize: 24 }}>Home</Text>
        </View>
    );
}

// Custom Drawer Content
function CustomDrawerContent(props: DrawerContentComponentProps) {
    const router = useRouter();

    const handleLogout = () => {
        console.log("Logged out");
        router.replace("/"); // Redirect to signIn or adjust as needed
    };

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: "#000" }}>
            {/* Profile Section */}
            <View
                style={{
                    padding: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: "#32CD32",
                    flexDirection: "row", // Arrange items in a row
                    alignItems: "center", // Align items vertically
                }}
            >
                <Image
                    source={require('../assets/images/pfp.jpeg')}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                />
                <Text style={{ color: "#fff", fontSize: 18, marginLeft: 10 }}>Abdallah</Text>
            </View>


            {/* Drawer Items */}
            <DrawerItemList {...props} />

            {/* Logout Button */}
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <TouchableOpacity
                    style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#32CD32" }}
                    onPress={handleLogout}
                >
                    <Text style={{ color: "#fff", fontSize: 16 }}>Log Out!</Text>
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

            </Drawer.Navigator>
        </GestureHandlerRootView>
    );
}