import { useState, useEffect } from 'react';
import {
    Text, TextInput, TouchableOpacity, View, StyleSheet, StatusBar,
    KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback,
    Keyboard, Platform, Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

export default function SignUpScreen() {
    const router = useRouter();
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    const [fontsLoaded] = useFonts({
        'RussoOne': require('../assets/fonts/RussoOne-Regular.ttf'),
    });

    useEffect(() => {
        navigation.setOptions({ title: 'Sign Up' });
    }, [navigation]);

    const handleSignUp = () => {
        let isValid = true;

        if (!username) {
            setUsernameError('Username is required');
            isValid = false;
        } else {
            setUsernameError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Please enter a valid email');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (isValid) {
            // Here you can handle the sign-up logic (e.g., save user data to the backend)
            router.push('/home'); // Navigate to HomePage if successful
        }
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
                <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                    <Text style={[styles.appName, { fontFamily: 'RussoOne' }]}>SweatZone</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#B0B0B0"
                        value={username}
                        onChangeText={setUsername}
                    />
                    {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

                    <TextInput
                        style={[styles.input, { marginTop: 10 }]}
                        placeholder="Email"
                        placeholderTextColor="#B0B0B0"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                    <TextInput
                        style={[styles.input, { marginTop: 10 }]}
                        placeholder="Password"
                        placeholderTextColor="#B0B0B0"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                    <TextInput
                        style={[styles.input, { marginTop: 10 }]}
                        placeholder="Confirm Password"
                        placeholderTextColor="#B0B0B0"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <View style={styles.signInContainer}>
                        <Text style={styles.signInText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/')}>
                            <Text style={styles.signInTextBlue}>Sign in</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.spacing} />

                    <TouchableOpacity onPress={() => console.log("Google Sign-In Clicked")} style={styles.imageContainer}>
                        <Image source={require('./google-sign-in.png')} style={styles.googleSignInImage} />
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appName: {
        fontSize: 48,
        color: '#32CD32',
        marginBottom: 40,
    },
    input: {
        height: 50,
        borderColor: '#32CD32',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 15,
        marginBottom: 10,
        color: '#fff',
        fontSize: 18,
        width: '100%',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#32CD32',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
        marginBottom: 15,
    },
    buttonText: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    signInButton: {
        alignItems: 'center',
        marginTop: 15,
    },
    signInText: {
        color: '#fff',
        fontSize: 16,
    },
    signInTextBlue: {
        color: '#007BFF',
    },
    spacing: {
        marginTop: 20,
    },
    imageContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    googleSignInImage: {
        width: 200,
        height: 60,
        resizeMode: 'contain',
    },
    signInContainer: {
        flexDirection: 'row',
        marginTop: 15,
    },
});
