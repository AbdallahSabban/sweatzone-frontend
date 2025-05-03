import { useState, useEffect } from 'react';
import {
    Text, TextInput, TouchableOpacity, View, StyleSheet, StatusBar,
    KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback,
    Keyboard, Platform, Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';



export default function SignInScreen() {
    const router = useRouter();
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [fontsLoaded] = useFonts({
        'RussoOne': require('../assets/fonts/RussoOne-Regular.ttf'),
    });


    useEffect(() => {
        navigation.setOptions({ title: 'Sign In' });
    }, [navigation]);

    const handleSignIn = () => {
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

        if (isValid && username === 'test' && password === 'test') {
            router.push('/home'); // Navigate to HomePage if credentials match
        } else if (isValid) {
            setUsernameError('Invalid username or password');
            setPasswordError('Invalid username or password');
        }
    };

    const handleForgotPassword = () => {
        router.push('/forgot-password'); // Navigate to Forgot Password screen
    };

    const handleSignUp = () => {
        router.push('/sign-up'); // Navigate to Sign Up screen
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
                        placeholder="Password"
                        placeholderTextColor="#B0B0B0"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                    <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordButton}>
                        <Text style={styles.forgotPasswordText}>Forgot my password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>

                    <View style={styles.signUpContainer}>
                        <Text style={styles.signUpText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={handleSignUp}>
                            <Text style={styles.signUpTextBlue}>Sign up</Text>
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
    forgotPasswordButton: {
        alignSelf: 'flex-end',
        marginTop: 5,
    },
    forgotPasswordText: {
        color: '#007BFF',
        fontSize: 16,
    },
    signUpContainer: {
        flexDirection: 'row',
        marginTop: 15,
    },
    signUpText: {
        color: '#fff',
        fontSize: 16,
    },
    signUpTextBlue: {
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
});
