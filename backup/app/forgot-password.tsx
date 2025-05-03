import { useState } from 'react';
import {
    Text, TextInput, TouchableOpacity, View, StyleSheet, StatusBar,
    KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font'; // Import the useFonts hook

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [fontsLoaded] = useFonts({
        'RussoOne': require('../assets/fonts/RussoOne-Regular.ttf'), // Load RussoOne font
    });

    const handleResetPassword = () => {
        if (!email) {
            setEmailError('Email is required');
            return;
        }
        setEmailError('');
        console.log('Password reset request sent for:', email);
        // Here, you would integrate an API call to request password reset

        // Navigate back to sign-in after submitting
        router.push('/');
    };

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <StatusBar barStyle="light-content" backgroundColor="#000" />
                <Text style={[styles.title, { fontFamily: 'RussoOne' }]}>Password Recovery</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#B0B0B0"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                    <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>


            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#32CD32',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#32CD32',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 15,
        color: '#fff',
        fontSize: 18,
        width: '100%',
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#32CD32',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        marginTop: 15,
    },
    backText: {
        color: '#007BFF',
        fontSize: 16,
    },
});
