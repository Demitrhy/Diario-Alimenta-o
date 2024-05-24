import { StyleSheet } from 'react-native';

export const estilos = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    padding: 35,
  },
  containerPreto: {
    backgroundColor: 'black', // Fundo preto para a nova View
    padding: 20, // Adicionar padding para espaçamento interno
    borderRadius: 8, // Bordas arredondadas
    borderWidth: 2, // Largura da borda
    borderColor: 'orange', // Cor da borda
  },
  input: {
    width: '100%',
    marginBottom: 20,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: 'white', // Fundo branco aos inputs para visibilidade
  },
  inputComBorda: {
    borderWidth: 2, // Largura da borda
    borderColor: 'orange', // Cor da borda laranja
  },
  loginText: {
    color: 'blue',
    marginBottom: 20,
    marginLeft: 5,
    marginTop: -18,
  },
  button: {
    width: '50%',
    backgroundColor: 'orange', // Change this to your desired background color
    padding: 10,
    borderRadius: 50,
    marginLeft: 80,
    marginTop: 18,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', // Change this to your desired text color
    fontSize: 16,
  },
  titulo: {},
  label: {
    color: 'white', // Cor do rótulo
    marginBottom: 5, // Espaçamento abaixo do rótulo
  },
});
