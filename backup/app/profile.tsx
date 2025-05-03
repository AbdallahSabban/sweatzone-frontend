// app/profile.tsx
import { View, Text } from "react-native";

export default function ProfileScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
            <Text style={{ color: "#32CD32", fontSize: 24 }}>Profile Screen</Text>
        </View>
    );
}