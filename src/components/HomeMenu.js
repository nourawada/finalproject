//Menu tab de navegación
//Importar toda la estreuctura de navegación

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Profile from '../screens/profile';
import NewPost from '../screens/NewPost';
import Buscador from '../screens/Buscador'

const Tab = createBottomTabNavigator();


function HomeMenu(){

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={ Home } />
            <Tab.Screen name="Buscador" component={ Buscador} />
            <Tab.Screen name="NewPost" component={ NewPost } />
            <Tab.Screen name="Profile" component={ Profile } />
        </Tab.Navigator>
    )

}

export default HomeMenu;