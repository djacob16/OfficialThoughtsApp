import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import YourActiveThought from '../YourActiveThought';
import { getActiveThoughts } from '../../slices/getActiveThoughts';
import { getInactiveThoughts } from '../../slices/getInactiveThoughts';
import YourInactiveThought from '../YourInactiveThought';
import { Colors } from '../../constants/colors';

const YourThoughts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getActiveThoughts());
        dispatch(getInactiveThoughts())
    }, [dispatch])

    const { activeThoughts } = useSelector((state) => state.getActiveThoughtsSlice);
    const { inactiveThoughts } = useSelector((state) => state.getInactiveThoughtsSlice);

    useEffect(() => {
        console.log("ACTIVE THOUGHTS: ", activeThoughts)
    }, [activeThoughts])


    return (
        <View style={styles.container}>
            <View style={styles.activeContainer}>
                <Text style={styles.activeTitle}>On my mind</Text>
                <View>
                    {activeThoughts.length === 0 && (
                        <Text style={styles.activeSubText}>
                            Thoughts on your mind are actively seen by others around you
                        </Text>
                    )}
                    {activeThoughts.map((activeThought, index) => (
                        <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.lightGray, marginBottom: 15 }} key={activeThought.id}>
                            <YourActiveThought activeThought={activeThought} />
                        </View>
                    ))}
                </View>
            </View>
            <View style={styles.inactiveContainer}>
                <Text style={styles.inactiveTitle}>In memory</Text>
                <View style={{ paddingHorizontal: 8 }}>
                    {inactiveThoughts.length === 0 && (
                        <Text style={styles.inactiveSubText}>
                            Thoughts in memory are not actively seen by anyone near you
                        </Text>
                    )}
                    {inactiveThoughts.map((inactiveThought, index) => (
                        <YourInactiveThought key={inactiveThought.id} inactiveThought={inactiveThought} />
                    ))}
                </View>
            </View>
        </View>
    );
}

export default YourThoughts;
