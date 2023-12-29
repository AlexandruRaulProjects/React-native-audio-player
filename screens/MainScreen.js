import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { USERS, AUDIOS_NUMBER } from '../data/dummy-data';
import CustomLinearGradient from '../components/CustomLinearGradient';
import CustomButton from '../components/CustomButton';

const menuItems = [
    {
        iconName: 'history',
        title: ' History',
        navigateTo: ''
    },

    {
        iconName: 'library-books',
        title: ' Audio Books',
        navigateTo: 'Audios'
    },

    {
        iconName: 'add-circle',
        title: ' Add new audio book',
        navigateTo: ''
    },

    {
        iconName: 'settings',
        title: ' Voice Settings',
        navigateTo: ''
    },

];



function MainScreen({ navigation }) {


    return <CustomLinearGradient>
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <View style={styles.profileBox}>
                <Text style={styles.image}>Image</Text>
                <View style={styles.profileTexts}>
                    <Text style={styles.fullName}>Jenny Wilson</Text>
                    <Text style={styles.email}>jenny.wilson@gmail.com</Text>
                </View>
            </View>
            <View style={styles.menu}>
                <Text style={styles.menuTitle}>Menu</Text>
                <View style={styles.menuOptions}>
                    {
                        menuItems.map((menuItem) =>
                            <Pressable key={menuItem.title} onPress={() => navigation.navigate(menuItem.navigateTo)} android_ripple={{ color: 'rgba(117,29,124,0.2)' }}>
                                <View style={styles.menuItem}>
                                    <View>
                                        <MaterialIcons name={menuItem.iconName} size={24} color="white" />
                                    </View>
                                    <Text style={styles.menuItem}>{menuItem.title}</Text>
                                    {menuItem.title === ' Audio Books' && <Text style={styles.numberOfBooks}>32</Text>}
                                </View>
                            </Pressable>
                        )

                    }
                </View>
            </View>

            <CustomButton
                iconName="logout"
                buttonText=' Logout'
            />

        </View>
    </CustomLinearGradient>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 32,
        fontWeight: '500',
        color: '#F1F1F1'
    },
    profileBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
        marginVertical: 16
    },
    image: {
        marginRight: 48
    },
    fullName: {
        color: 'violet'
    },
    email: {
        color: '#F1F1F1'
    },
    menu: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuOptions: {
        marginRight: 60,
    },
    menuTitle: {
        fontSize: 28,
        fontWeight: '400',
        color: '#F1F1F1',
        marginTop: 32,
        marginBottom: 24
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: '#F1F1F1',
        width: 200,
        marginVertical: 12
    },
    numberOfBooks: {
        backgroundColor: '#F1F1F1',
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },


});

export default MainScreen; 