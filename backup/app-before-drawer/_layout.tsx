import { Stack } from "expo-router";

const isDev = process.env.NODE_ENV === "development";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // Headers in dev, hidden in prod

            }}
        >
            {/* Authentication Screens */}
            <Stack.Screen name="index" options={{ gestureEnabled: false }} />
            <Stack.Screen name="signIn" />
            <Stack.Screen name="sign-up" />
            <Stack.Screen name="forgot-password" options={{ presentation: "modal" }} />

            {/* Main App Screens */}
            <Stack.Screen name="home" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="settings" />
        </Stack>
    );
}