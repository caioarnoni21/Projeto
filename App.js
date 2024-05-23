import * as React from 'react';
import { TextInput, Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, Vibration } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from 'react-native-elements';
import { Card, Paragraph } from 'react-native-paper';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class Principal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
    };
  }

  handleLogin = async () => {
    try {
      let senha = await AsyncStorage.getItem(this.state.email);
      if (senha != null) {
        if (senha == this.state.senha) {
          this.props.navigation.navigate('Categorias');
        } else {
          alert("Senha Incorreta!");
        }
      } else {
        alert("Usuário não foi encontrado!");
      }
    } catch (erro) {
      console.log(erro);
    }
  };

  render() {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Entrar</Text>
        <TextInput
          style={styles.input}
          placeholder="Email ou número de celular"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          onChangeText={(senha) => this.setState({ senha })}
        />
        <TouchableOpacity style={styles.loginButton} onPress={this.handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>OU</Text>
        <TouchableOpacity style={styles.registerButton} onPress={() => this.props.navigation.navigate('Cadastro')}>
          <Text style={styles.registerButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class Cadastro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
    };
  }

  handleRegister = async () => {
    try {
      await AsyncStorage.setItem(this.state.email, this.state.senha);
      alert("Cadastrado com sucesso!");
      Vibration.vibrate();
      this.props.navigation.navigate('Login');
    } catch (erro) {
      alert("Erro ao cadastrar!");
    }
  };

  render() {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Cadastrar</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          onChangeText={(senha) => this.setState({ senha })}
        />
        <TouchableOpacity style={styles.loginButton} onPress={this.handleRegister}>
          <Text style={styles.loginButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class Nav2 extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Principal} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
        <Stack.Screen name="Categorias" component={Categorias} />
        <Stack.Screen name="Filme1" component={Filme1} />
        <Stack.Screen name="Filme2" component={Filme2} />
        <Stack.Screen name="Filme3" component={Filme3} />
        <Stack.Screen name="Filme4" component={Filme4} />
        <Stack.Screen name="Filme5" component={Filme5} />
      </Stack.Navigator>
    );
  }
}

class Categorias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      selectedGenre: null,
      selectedMood: null
    };
  }

  handleCheckBoxPress = (option) => {
    this.setState({ selectedOption: option });
  };

  handleGenreCheckBoxPress = (genre) => {
    this.setState({ selectedGenre: genre });
  };

  handleMoodCheckBoxPress = (mood) => {
    this.setState({ selectedMood: mood });
  };

  handleFilter = () => {
    const { selectedOption, selectedGenre, selectedMood } = this.state;
    console.log('Filtrando com:', { selectedOption, selectedGenre, selectedMood });

    if (selectedGenre === 'Drama') {
      this.props.navigation.navigate('Filme1');
    } else if (selectedGenre === 'Ação') {
      this.props.navigation.navigate('Filme2');
    } else if (selectedGenre === 'Comédia') {
      this.props.navigation.navigate('Filme3');
    } else if (selectedGenre === 'Ficção Científica') {
      this.props.navigation.navigate('Filme4');
    } else if (selectedGenre === 'Terror') {
      this.props.navigation.navigate('Filme5');
    } else {
      alert('Nenhum filme encontrado com as opções selecionadas.');
    }
  };

  render() {
    const { selectedOption, selectedGenre, selectedMood } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Quem está com você?</Text>
        <CheckBox
          title="Família"
          checked={selectedOption === 'Familia'}
          onPress={() => this.handleCheckBoxPress('Familia')}
          containerStyle={styles.checkBoxContainer}
          textStyle={styles.checkBoxText}
        />
        <CheckBox
          title="Amigos"
          checked={selectedOption === 'Amigos'}
          onPress={() => this.handleCheckBoxPress('Amigos')}
          containerStyle={styles.checkBoxContainer}
          textStyle={styles.checkBoxText}
        />
        <CheckBox
          title="Namorada"
          checked={selectedOption === 'Namorada'}
          onPress={() => this.handleCheckBoxPress('Namorada')}
          containerStyle={styles.checkBoxContainer}
          textStyle={styles.checkBoxText}
        />
        <CheckBox
          title="Sozinho"
          checked={selectedOption === 'Sozinho'}
          onPress={() => this.handleCheckBoxPress('Sozinho')}
          containerStyle={styles.checkBoxContainer}
          textStyle={styles.checkBoxText}
        />
        <CheckBox
          title="Encontro"
          checked={selectedOption === 'Encontro'}
          onPress={() => this.handleCheckBoxPress('Encontro')}
          containerStyle={styles.checkBoxContainer}
          textStyle={styles.checkBoxText}
        />

        <Text style={styles.heading}>Qual é o seu humor hoje?</Text>
        <CheckBox
          title="Feliz"
          checked={selectedMood === 'Feliz'}
          onPress={() => this.handleMoodCheckBoxPress('Feliz')}
          containerStyle={styles.checkBoxContainer}
          textStyle={styles.checkBoxText}
        />
        <CheckBox
          title="Triste"
          checked={selectedMood === 'Triste'}
          onPress={() => this.handleMoodCheckBoxPress('Triste')}
          containerStyle={styles.checkBoxContainer}
          textStyle={styles.checkBoxText}
        />
        <CheckBox
          title="Aventureiro"
          checked={selectedMood === 'Aventureiro'}
          onPress={() => this.handleMoodCheckBoxPress('Aventureiro')}
          containerStyle={styles.checkBoxContainer}
          textStyle={styles.checkBoxText}
        />
        <CheckBox
          title="Relaxado"
          checked={selectedMood === 'Relaxado'}
          onPress={() => this.handleMoodCheckBoxPress('Relaxado')}
          containerStyle={styles.checkBoxContainer}
          textStyle={styles.checkBoxText}
        />
        <CheckBox
          title="Romântico"
          checked={selectedMood === 'Romântico'}
          onPress={() => this.handleMoodCheckBoxPress('Romântico')}
          containerStyle={styles.checkBoxContainer}
          textStyle={styles.checkBoxText}
        />

        <Text style={styles.heading}>Escolha o gênero do filme:</Text>
        <CheckBox
          title="Ação"
          checked={selectedGenre === 'Ação'}
          onPress={() => this.handleGenreCheckBoxPress('Ação')}
          containerStyle={styles.checkBoxContainer}
          textStyle={styles.checkBoxText}
        />
        <CheckBox
          title="Comédia"
          checked={selectedGenre === 'Comédia'}
          onPress={() => this.handleGenreCheckBoxPress('Comédia')}
          containerStyle={styles.checkBoxContainer}
          textStyle={styles.checkBoxText}
        />
        <CheckBox
          title="Drama"
          checked={selectedGenre === 'Drama'}
          onPress={() => this.handleGenreCheckBoxPress('Drama')}
          containerStyle={styles.checkBoxContainer}
          textStyle={styles.checkBoxText}
        />
        <CheckBox
          title="Ficção Científica"
          checked={selectedGenre === 'Ficção Científica'}
          onPress={() => this.handleGenreCheckBoxPress('Ficção Científica')}
          containerStyle={styles.checkBoxContainer}
          textStyle={styles.checkBoxText}
        />
        <CheckBox
          title="Terror"
          checked={selectedGenre === 'Terror'}
          onPress={() => this.handleGenreCheckBoxPress('Terror')}
          containerStyle={styles.checkBoxContainer}
          textStyle={styles.checkBoxText}
        />

        <TouchableOpacity style={styles.filterButton} onPress={this.handleFilter}>
          <Text style={styles.filterButtonText}>Filtrar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

class Filme1 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Card>
          <Card.Title title="Divertida Mente" />
          <Card.Content>
          <Image
              source={require('/assets/Divertidamente.jpg')}
              style={{ width: '100%', height: 200 }}
              resizeMode="contain"
            />
            <Paragraph>{'Riley é uma garota de 11 anos que lida com suas emoções – Alegria, Tristeza, Raiva, Medo e Nojinho – quando sua família se muda para uma nova cidade. É um filme que mistura elementos de drama familiar e alegria.'}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

class Filme2 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Card>
          <Card.Title title="Besouro Azul" />
          <Card.Content>
            <Image
              source={require('/assets/besouro-azul.jpg')}
              style={{ width: '100%', height: 200 }}
              resizeMode="contain"
            />
            <Paragraph>{'O adolescente Jaime Reyes ganha superpoderes quando um misterioso escaravelho se prende à sua coluna e lhe fornece uma poderosa armadura alienígena azul.'}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  }
}


class Filme3 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Card>
          <Card.Title title="Toy-Story" />
          <Card.Content>
          <Image
              source={require('/assets/toys.jpeg')}
              style={{ width: '100%', height: 200 }}
              resizeMode="contain"
            />
            <Paragraph>{'O aniversário do garoto Andy está chegando e seus brinquedos ficam nervosos, temendo que ele ganhe novos brinquedos que possam substituí-los. Liderados pelo caubói Woody, o brinquedo predileto de Andy, eles recebem Buzz Lightyear, o boneco de um patrulheiro espacial, que logo passa a receber mais atenção do garoto. Com ciúmes, Woody tenta ensiná-lo uma lição, mas Buzz cai pela janela. É o início da aventura do caubói, que precisa resgatar Buzz para limpar sua barra com os outros brinquedos.'}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

class Filme4 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Card>
          <Card.Title title="De volta para o futuro" />
          <Card.Content>
          <Image
              source={require('/assets/futuro.jpg')}
              style={{ width: '100%', height: 200 }}
              resizeMode="contain"
            />
            <Paragraph>{'O adolescente Marty McFly é transportado para 1955 quando uma experiência do excêntrico cientista Doc Brown dá errado. Ele viaja pelo tempo em um carro modificado e acaba conhecendo seus pais ainda jovens. O problema é que Marty pode deixar de existir porque ele interferiu na rotina dos pais, que correm o risco de não se apaixonar mais. Para complicar ainda mais a situação, Marty precisa voltar para casa a tempo de salvar o cientista.'}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

class Filme5 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Card>
          <Card.Title title="Hereditário" />
          <Card.Content>
          <Image
              source={require('/assets/hereditario.jfif')}
              style={{ width: '100%', height: 200 }}
              resizeMode="contain"
            />
            <Paragraph>{'Após a morte da reclusa avó, a família Graham começa a desvendar algumas coisas. Mesmo após a partida da matriarca, ela permanece como se fosse uma sombra sobre a família, especialmente sobre a solitária neta adolescente, Charlie, por quem ela sempre manteve uma fascinação não usual. '}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  loginTitle: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    marginBottom: 20,
    padding: 10,
    borderRadius: 4,
  },
  loginButton: {
    backgroundColor: '#E50914',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  orText: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 18,
    marginVertical: 10,
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingVertical: 5,
  },
  checkBoxText: {
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    backgroundColor: '#E50914',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 20,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Login" component={Nav2}
            options={{
              tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home-account" color={color} size={size} />),
              headerShown: false,
            }}
          />
          <Tab.Screen name="Criar Usuário" component={Cadastro}
            options={{
              tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account-details" color={color} size={size} />),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
