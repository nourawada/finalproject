import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeMenu from './src/components/HomeMenu'
import Portada from './src/components/Portada';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Comentarios from './src/screens/Comentarios';
import ProfileUser from './src/screens/ProfileUser';





const Stack = createNativeStackNavigator();

function App(){
  return(
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Portada" component={ Portada } />
       <Stack.Screen name="Login" component={ Login } />
       <Stack.Screen name="Register" component={ Register } />
       <Stack.Screen name="HomeMenu" component={ HomeMenu } options= {{ headerShown : false}}/>
       <Stack.Screen name="Comentarios" component={Comentarios} />
       <Stack.Screen name="ProfileUser" component={ProfileUser} />

    
    </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;

