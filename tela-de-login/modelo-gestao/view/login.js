import { Component } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator,TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { estilos } from '../css/estilos';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
  }

  atualizarValores = (val, props) => {
    const state = this.state;
    state[props] = val;
    this.setState(state);
  };

  userLogin = () => {
    if (this.state.email === '' || this.state.password === '') {
      alert('Digite Detalhes do usuario! ');
      this.setState({ isLoading: true });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((response) => {
          this.setState({
            email: '',
            password: '',
            isLoading: false,
          });
          this.props.navigation.navigate('Calendario')
        })
        .catch((error) => {
          this.setState({
            messageError: error,
          });
        });
    }
  };

  render() {
    if (this.state.isLoading) {
      <View>
        <ActivityIndicator size="large" color="#9e9e9e" />
      </View>;
    }
  
    return (
      <View style={estilos.container}>
        <View style={estilos.containerPreto}>

         <Text style={estilos.label}>E-mail</Text>
          <TextInput
            placeholder={'Digite seu email '}
            placeholderTextColor={'#999'} // Cor do placeholder para melhor visibilidade
            style={[estilos.input, estilos.inputComBorda]}
            value={this.state.email}
            onChangeText={(val) => this.atualizarValores(val, 'email')}
          />


         <Text style={estilos.label}>S-enha</Text>
          <TextInput
            placeholder={'Digite sua senha '}
            placeholderTextColor={'#999'} // Cor do placeholder para melhor visibilidade
            style={[estilos.input, estilos.inputComBorda]}
            value={this.state.password}
            onChangeText={(val) => this.atualizarValores(val, 'password')}
            secureTextEntry={true}
            maxLength={8}
          />
          
          <Text
            style={estilos.loginText} 
            onPress={() => this.props.navigation.navigate('TelaCadastro')}>
            Não tem conta?
          </Text>

           <View>
            <TouchableOpacity style={estilos.button} onPress={() => this.userLogin}>
              <Text style={estilos.buttonText}>Logar</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    );
  }
}

