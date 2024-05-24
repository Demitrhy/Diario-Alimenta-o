import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';
import firebaseConfig from './modelo-gestao/database/dbConfig';
import Login from './modelo-gestao/view/login';
import Cadastro from './modelo-gestao/view/cadastro';
import Calendario from './modelo-gestao/view/calendario';
import AboutScreen from './modelo-gestao/view/AboutScreen'  ;

const Stack = createStackNavigator();

const HeaderTitle = ({ mainTitle, subTitle, lineWidth }) => (
  <View style={styles.headerTitleContainer}>
    <Text style={styles.mainTitle}>{mainTitle}</Text>
    <Text style={styles.subTitle}>{subTitle}</Text>
    <View style={[styles.underline, { width: lineWidth }]}></View>
  </View>
);

function Home() {
  return (
    <Stack.Navigator
      initialRouteName="TelaLogin"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="TelaLogin"
        component={Login}
        options={{
          headerTintColor: '#fff000',
          headerTitle: () => (
            <HeaderTitle
              mainTitle="Bem-vindo ao"
              subTitle="Diario Alimentação"
            />
          ),
        }}
      />
      <Stack.Screen
        name="TelaCadastro"
        component={Cadastro}
        options={{
          headerTintColor: '#fff000',
          headerTitle: () => (
            <HeaderTitle
              mainTitle="Bem-vindo ao"
              subTitle="Cadastro"
              lineWidth="70%"
            />
          ),
        }}
      />
      <Stack.Screen
        name="Calendario"
        component={Calendario}
        options={{ title: 'Seu Calendario', headerTintColor: '#fff000' }}
      />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    alignItems: 'center',
  },
  mainTitle: {
    color: 'black',
    fontSize: 20,
  },
  subTitle: {
    color: 'orange',
    fontSize: 20,
  },
  underline: {
    marginTop: 2,
    height: 2,
    width: '100%',
    backgroundColor: 'orange',
  },
});

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  );
}
