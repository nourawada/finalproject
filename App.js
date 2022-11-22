import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeMenu from './src/components/HomeMenu'
import Portada from './src/components/Portada';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Comentarios from './src/screens/Comentarios';
import ProfileUser from './src/screens/ProfileUser';
import NewPost from './src/screens/NewPost';






const Stack = createNativeStackNavigator();

function App(){
  return(
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Portada" component={ Portada }  options= {{ headerShown : false}} />
       <Stack.Screen name="Login" component={ Login }  options= {{ headerShown : false}}/>
       <Stack.Screen name="Register" component={ Register } options= {{ headerShown : false}} />
       <Stack.Screen name="HomeMenu" component={ HomeMenu } options= {{ headerShown : false}}/>
       <Stack.Screen name="Home" component={Home}  options= {{ headerShown : false}}/>
       <Stack.Screen name="Comentarios" component={Comentarios}  />
       <Stack.Screen name="ProfileUser" component={ProfileUser} />
       <Stack.Screen name="NewPost" component={NewPost}  options= {{ headerShown : false}}/>

    
    </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;

