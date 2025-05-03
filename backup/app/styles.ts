import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 24,
        color: '#32CD32',
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: '#32CD32',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    logoutText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});