import { Stack } from "expo-router";

const isDev = process.env.NODE_ENV === "development";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // Headers in dev, hidden in prod
                gestureEnabled: false
            }}
        >
            {/* Authentication Screens */}
            <Stack.Screen name="index" options={{ gestureEnabled: false }} />
            <Stack.Screen name="sign-up" options={{ gestureEnabled: true }} />
            <Stack.Screen name="forgot-password" options={{ presentation: "modal",gestureEnabled: true }} />

            {/* Main App Screens */}
            <Stack.Screen name="home" options={{animation:"slide_from_left"}} />
            <Stack.Screen name="profile" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="my-tournaments" />
            <Stack.Screen name="event-details" options={{ gestureEnabled: true }} />
            <Stack.Screen name="organize-event" options={{ gestureEnabled: true }} />
            {/* Delete */}
            <Stack.Screen name="date" />
        </Stack>
    );
}