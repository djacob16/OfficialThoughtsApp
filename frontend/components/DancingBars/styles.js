import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    bar: {
        width: 3,
        height: 6,
        backgroundColor: Colors.yellowFont,
        marginHorizontal: 2,
        borderRadius: 1
    },
});

export default styles