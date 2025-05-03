import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, Platform} from 'react-native';
import {useState, useEffect} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateScreen() {
    const [date, setDate] = useState(new Date());//initial value of picker date
    const [showPicker, setShowPicker] = useState(false);
    const [eventDate,setEventDate] = useState("empty")//not sure if this is needed or not but we will see
    //method to toggle visibility of picker
    const toggleDatepicker = () =>{
        setShowPicker(!showPicker);
        console.log("new event date is (in toggle): "+ eventDate);
    };

    //function when the value changes
    const onChange = (event: any, selectedDate: Date) => {

        if (event){
            const currentDate= selectedDate;
            setDate(currentDate);
            if (Platform.OS === "android"){
               toggleDatepicker();

               console.log("is android");
            }
            setEventDate(currentDate.toDateString());
            console.log("event is there");
            console.log("new eventDate (in onChange) is : "+ eventDate);
        }
        else {
            toggleDatepicker();
            console.log("event is not there");
        }
    };

    return (

        <View style={styles.container}>
            <Text style={styles.label}>Selected Date:</Text>

            { showPicker && (
            <DateTimePicker
                mode="date"
                minimumDate={new Date()}
                display="spinner"
                value={date}
                themeVariant={"light"}
                style={styles.datePicker}
                onChange={(event, selectedDate) => {
                    if (selectedDate) {
                        onChange(event, selectedDate); // Ensure selectedDate is passed as a Date
                    }
                }}
            />
            )}
            {/*Buttons to appear in IOS for confirming or canceling date picking*/}
            { showPicker && Platform.OS === "ios" && (
                <Pressable onPress={toggleDatepicker}>
                    <Text style={[ { fontFamily: "RussoOne" }]}>Confirm</Text>
                </Pressable>
            )}

            <TouchableOpacity>
                { !showPicker && (
                    <Pressable onPress={toggleDatepicker}>
                        <TextInput
                            placeholder={date.toDateString()}
                            placeholderTextColor={"#11182744"}
                            style={styles.input}
                            editable={false} // Prevent keyboard input
                            pointerEvents="none" // Use TouchableOpacity for tap
                            value={date.toDateString()}
                            onChangeText={setEventDate}

                        />
                    </Pressable>
                )

                }
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        height: 50,
        borderColor: '#32CD32',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 15,
        marginBottom: 10,
        color: '#0',
        fontSize: 18,
        width: '100%',
    },
    datePicker: {
        height: 120,
        maxHeight: 120,
        marginTop: -10,
    },
});