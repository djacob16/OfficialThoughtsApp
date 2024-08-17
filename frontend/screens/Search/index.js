import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, LayoutAnimation, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import listAllUsers from "../../data/listAllUsers";
import styles from "./styles";
import searchIcon from "../../assets/search.png";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
    const navigation = useNavigation();
    const [isTextInputFocused, setTextInputFocused] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [users, setUsers] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);
    const searchRef = useRef(null);

    const handleTextInputFocus = async () => {
        setTextInputFocused(true);
        // Load recent users when input is focused
        const storedRecentUsers = await AsyncStorage.getItem("recentUsers");
        if (storedRecentUsers) {
            setRecentUsers(JSON.parse(storedRecentUsers));
        }
    };

    const handleTextCancel = () => {
        setTextInputFocused(false);
        setSearchInput("");
        setUsers([]);
        searchRef.current?.blur();
    };

    const saveRecentUser = async (user) => {
        let updatedRecentUsers = [user, ...recentUsers.filter((u) => u.id !== user.id)];
        if (updatedRecentUsers.length > 5) {
            updatedRecentUsers = updatedRecentUsers.slice(0, 5); // Limit to 5 recent users
        }
        await AsyncStorage.setItem("recentUsers", JSON.stringify(updatedRecentUsers));
        setRecentUsers(updatedRecentUsers);
    };

    useEffect(() => {
        if (searchInput.length > 0) {
            const response = async () => {
                const result = await listAllUsers(searchInput);
                setUsers(result);
            };
            response();
        } else {
            setUsers([]);
        }
    }, [searchInput]);

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <View style={styles.textInputContainer}>
                        <Image source={searchIcon} style={styles.searchIcon} />
                        <TextInput
                            placeholderTextColor={"#959595"}
                            ref={searchRef}
                            value={searchInput}
                            autoCapitalize={"none"}
                            autoFocus={isTextInputFocused}
                            placeholder={"Search"}
                            style={isTextInputFocused ? styles.textInputFocused : styles.input}
                            onFocus={handleTextInputFocus}
                            onChangeText={setSearchInput}
                        />
                    </View>
                    {isTextInputFocused && (
                        <TouchableOpacity onPress={handleTextCancel}>
                            <Text style={{ color: "white" }}>Cancel</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <ScrollView style={styles.userProfilesContainer}>
                {searchInput.length > 0 ? (
                    users?.map((user, index) => (
                        <TouchableOpacity
                            key={user.id}
                            style={styles.userProfile}
                            onPress={() => {
                                saveRecentUser(user);
                                navigation.navigate("Profile", { userId: user.id });
                            }}
                        >
                            <Image source={{ uri: user.photo }} style={{ width: 30, height: 30, borderRadius: 20 }} />
                            <Text style={{ color: "white" }}>{user.displayName}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View>
                        {isTextInputFocused && recentUsers.length > 0 && <Text style={{ color: "white" }}>recent searches</Text>}
                        {isTextInputFocused && recentUsers?.map((user, index) => (
                            <View key={index}>
                                <TouchableOpacity
                                    key={user.id}
                                    style={styles.userProfile}
                                    onPress={() => {
                                        navigation.navigate("Profile", { userId: user.id });
                                    }}
                                >
                                    <Image source={{ uri: user.photo }} style={{ width: 30, height: 30, borderRadius: 20 }} />
                                    <Text style={{ color: "white" }}>{user.displayName}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )
                }
            </ScrollView >
        </View >
    );
};

export default Search;
