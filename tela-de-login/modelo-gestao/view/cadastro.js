import { Component } from 'react';
import { View, Text,  TextInput, ActivityIndicator,TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { estilos } from '../css/estilos';

export default class Cadastro extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      displayName: '',
    };
  }

  atualizarValores = (val, props) => {
    const state = this.state;
    state[props] = val;
    this.setState(state);
  };

  cadastro = () => {
    if (
      this.state.email === '' ||
      this.state.password === '' ||
      this.state.displayName === ''
    ) {
      alert('Favor Digite dados desejados! ');
      this.setState({ isLoading: false });
    } else {
      this.setState({ isLoading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((response) => {
          response.user.updateProfile({
            displayName: this.state.displayName,
          });

          this.setState({
            email: '',
            password: '',
            isLoading: false,
          });
          this.props.navigation.navigate('TelaLogin');
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

          <Text style={estilos.label}>Nome completo</Text>
          <TextInput
            placeholder={'Insira seu nome '}
            placeholderTextColor={'#999'}
            style={[estilos.input, estilos.inputComBorda]}
            value={this.state.displayName}
            onChangeText={(val) => this.atualizarValores(val, 'displayName')}
          />

          <Text style={estilos.label}>Usuario</Text>
          <TextInput
            placeholder={'Insira seu usuario'}
            placeholderTextColor={'#999'}
            style={[estilos.input, estilos.inputComBorda]}
            value={this.state.email}
            onChangeText={(val) => this.atualizarValores(val, 'email')}
          />

          <Text style={estilos.label}>Senha</Text>
          <TextInput
            placeholder={'Digite sua senha'}
            placeholderTextColor={'#999'}
            style={[estilos.input, estilos.inputComBorda]}
            value={this.state.password}
            onChangeText={(val) => this.atualizarValores(val, 'password')}
            secureTextEntry={true}
            maxLength={8}
          />
          <Text
            style={estilos.loginText}
            onPress={() => this.props.navigation.navigate('TelaLogin')}>
            Já tem conta?
          </Text>

            <View>
            <TouchableOpacity style={estilos.button} onPress={() => this.cadastro()} >
              <Text style={estilos.buttonText}>Cadas</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
