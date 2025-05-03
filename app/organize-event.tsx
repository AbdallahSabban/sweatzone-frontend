// app/organize-event.tsx
import { useState, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Keyboard,
    Pressable,
    TextInput as TextInputType,
    TouchableOpacity,
    Platform,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { SAUDI_CITIES } from "@/assets/constants/cities";
import {DrawerNavigationProp} from "@react-navigation/drawer"; // Adjust the path based on your file location
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";


export default function OrganizeEventScreen() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    const [title, setTitle] = useState("");
    const [eventDate, setEventDate] = useState(new Date().toDateString());
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [titleError, setTitleError] = useState("");
    const [dateError, setDateError] = useState("");
    const [locationError, setLocationError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [filteredCities, setFilteredCities] = useState<typeof SAUDI_CITIES>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const locationInputRef = useRef<TextInputType>(null);

    const openLeftDrawer = () => {
        navigation.openDrawer();
    };

    // Handle location input and filter suggestions
    const handleLocationChange = (text: string) => {
        setLocation(text);
        if (text.length > 0) {
            const filtered = SAUDI_CITIES.filter((item) =>
                item.city.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredCities(filtered);
            setShowSuggestions(true);
        } else {
            setFilteredCities([]);
            setShowSuggestions(false);
        }
    };

    const toggleDatepicker = () =>{
        setShowPicker(!showPicker);
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

    // Select a city from the suggestions and include the country
    const selectCity = (city: string, country: string) => {
        const fullLocation = `${city}, ${country}`; // Combine city and country
        setLocation(fullLocation); // Update the location state with both
        setShowSuggestions(false); // Hide suggestions
        setLocationError(""); // Clear any error
        Keyboard.dismiss(); // Dismiss keyboard
        locationInputRef.current?.blur(); // Ensure input loses focus
    };

    const validateInputs = () => {
        let isValid = true;

        if (title.length < 3) {
            setTitleError("Title must be at least 3 characters");
            isValid = false;
        } else {
            setTitleError("");
        }

        if (!eventDate || !/^\w{3} \w{3} \d{1,2} \d{4}$/.test(eventDate)) {
            setDateError("Enter a valid date (e.g., Sat Mar 15 2025)");
            console.log(eventDate);
            isValid = false;
        } else {
            setDateError("");
        }


        // Check if location matches a city-country pair from SAUDI_CITIES
        const isValidLocation = SAUDI_CITIES.some(
            (item) => `${item.city}, ${item.country}` === location
        );
        if (!isValidLocation) {
            setLocationError("Please select a valid city from the list");
            isValid = false;
        } else {
            setLocationError("");
        }

        if (description.length < 10) {
            setDescriptionError("Description must be at least 10 characters");
            isValid = false;
        } else {
            setDescriptionError("");
        }

        return isValid;
    };

    const handleCreateEvent = () => {
        if (validateInputs()) {
            console.log("Creating event:", { title, eventDate, location, description });
            // Add event creation logic here (e.g., API call)asd
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Pressable style={styles.menuButton} onPress={openLeftDrawer}>
                    <Text style={styles.menuText}>☰</Text>
                </Pressable>
                <Text style={[styles.headerTitle, { fontFamily: "RussoOne" }]}>Create an Event</Text>
                <View style={styles.menuButton} />
            </View>
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={[styles.label, { fontFamily: "RussoOne" }]}>Title</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Event Title"
                    placeholderTextColor="#B0B0B0"
                    value={title}
                    onChangeText={setTitle}
                />
                {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}

                <Text style={[styles.label, { fontFamily: "RussoOne" }]}>Date</Text>



                <TouchableOpacity onPress={toggleDatepicker}>
                <TextInput
                    style={styles.input}
                    placeholder="e.g., Sat Mar 16 2025"
                    placeholderTextColor="#B0B0B0"
                    editable={false}
                    pointerEvents={"none"}
                    value={date.toDateString()}
                    onChangeText={setEventDate}
                />
                </TouchableOpacity>
                { showPicker && (
                    <DateTimePicker
                        mode="date"
                        minimumDate={new Date()}
                        display="spinner"
                        value={date}
                        themeVariant={"dark"}
                        style={styles.datePicker}
                        onChange={(event, selectedDate) => {
                            if (selectedDate) {
                                onChange(event, selectedDate); // Ensure selectedDate is passed as a Date
                            }
                        }}
                    />
                )}
                {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}

                <Text style={[styles.label, { fontFamily: "RussoOne" }]}>Location</Text>
                <TextInput
                    ref={locationInputRef}
                    style={styles.input}
                    placeholder="Type a city (e.g., Riyadh)"
                    placeholderTextColor="#B0B0B0"
                    value={location}
                    onChangeText={handleLocationChange}
                    onFocus={() => {
                        if (location.length > 0) setShowSuggestions(true);
                    }}
                    onBlur={() => setShowSuggestions(false)}
                />
                {showSuggestions && filteredCities.length > 0 && (
                    <View style={styles.suggestionList}>
                        {filteredCities.map((item) => (
                            <Pressable
                                key={item.city}
                                style={({ pressed }) => [
                                    styles.suggestionItem,
                                    pressed && { backgroundColor: "#333" },
                                ]}
                                onPress={() => selectCity(item.city, item.country)} // Pass both city and country
                            >
                                <Text style={styles.suggestionText}>{`${item.city}, ${item.country}`}</Text>
                            </Pressable>
                        ))}
                    </View>
                )}
                {locationError ? <Text style={styles.errorText}>{locationError}</Text> : null}

                <Text style={[styles.label, { fontFamily: "RussoOne" }]}>Description</Text>
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Event Description"
                    placeholderTextColor="#B0B0B0"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={3}
                />
                {descriptionError ? <Text style={styles.errorText}>{descriptionError}</Text> : null}

                <Pressable style={styles.createButton} onPress={handleCreateEvent}>
                    <Text style={[styles.createButtonText, { fontFamily: "RussoOne" }]}>Create</Text>
                </Pressable>
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
        width: 50,
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
    label: {
        color: "#32CD32",
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 50,
        backgroundColor: "#1A1A1A",
        borderRadius: 10,
        paddingHorizontal: 15,
        color: "#fff",
        fontSize: 16,
        marginBottom: 15,
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: "top",
        paddingTop: 10,
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginBottom: 10,
    },
    createButton: {
        backgroundColor: "#32CD32",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    createButtonText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
    },
    confirmButton: {
        backgroundColor: "#111",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
        width: "50%",
    },
    confirmButtonText: {
        color: "#32CD32",
        fontSize: 18,
        fontWeight: "bold",
    },
    suggestionList: {
        maxHeight: 150,
        backgroundColor: "#1A1A1A",
        borderRadius: 10,
        marginBottom: 15,
        overflow: "hidden",
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#333",
    },
    suggestionText: {
        color: "#fff",
        fontSize: 16,
    },
    datePicker: {
        height: 120,
        maxHeight: 120,
        marginTop: -10,
    },
});