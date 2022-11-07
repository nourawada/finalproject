import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import HomeMenu from './src/components/HomeMenu'

const Stack = createNativeStackNavigator();

function App(){
  return(
    <NavigationContainer>
    <Stack.Navigator>
       <Stack.Screen name="Register" component={ Register } />
       <Stack.Screen name="Login" component={ Login } />
       <Stack.Screen name="Home" component={ Home } />
       <Stack.Screen name="HomeMenu" component={ HomeMenu } />
    
    </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;

