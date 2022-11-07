import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeMenu from './src/components/HomeMenu'
import Portada from './src/components/Portada';
import Register from './src/components/Register';
import Login from './src/components/Login';
import Home from './src/components/Home';



const Stack = createNativeStackNavigator();

function App(){
  return(
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Portada" component={ Portada } />
       <Stack.Screen name="Login" component={ Login } />
       <Stack.Screen name="Register" component={ Register } />
       <Stack.Screen name="Home" component={ Home } />
       <Stack.Screen name="HomeMenu" component={ HomeMenu } />
    
    </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;

