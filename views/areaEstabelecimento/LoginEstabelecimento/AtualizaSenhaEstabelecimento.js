import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput,ScrollView,Image } from 'react-native';
import { css } from '../../../assets/css/css';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../config/config.json'

export default function AtualizaSenhaEstabelecimento({ navigation }) {
  const [id, setId] = useState(null);
  const [senhaAntiga, setSenhaAntiga] = useState(null);
  const [novaSenha, setNovaSenha] = useState(null);
  const [confNovaSenha, setConfNovaSenha] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    async function getIdEstabelecimento() {
      let response = await AsyncStorage.getItem('estabelecimentoData');
      let json = JSON.parse(response);
      setId(json.id);
    }
    getIdEstabelecimento();
  });

  async function sendForm() {
    let response = await fetch(`${config.urlRoot}verifyPassEstabelecimento`, {
      method: 'POST',
      body: JSON.stringify({
        id: id,
        senhaAntiga: senhaAntiga,
        novaSenha: novaSenha,
        confNovaSenha: confNovaSenha
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    let json = await response.json();
    setMsg(json);
  }
  return (
    <ScrollView>
    <View>
      <TouchableOpacity style={css.arrowReturn} onPress={() => navigation.navigate('PerfilEstabelecimento')} >
        <Image style={css.arrowReturnContent} source={require('../../../assets/image/arrowReturn.png')}/>
      </TouchableOpacity>
    </View>
    <View style={css.updateSenha__form}>
      <Text style={css.trocarSenhaTitle}>Você deseja alterar sua senha?</Text>
        <Text style={{color:'red', textAlign: 'center', marginBottom: 20, fontSize: 16}}>{msg}</Text>
      <TextInput style={css.trocarSenhaInput} placeholder="Senha antiga" secureTextEntry={true} onChangeText={text => setSenhaAntiga(text)} />
      <TextInput style={css.trocarSenhaInput} placeholder="Nova senha" secureTextEntry={true} onChangeText={text => setNovaSenha(text)} />
      <TextInput style={css.trocarSenhaInput} placeholder="Confirme a nova senha" secureTextEntry={true} onChangeText={text => setConfNovaSenha(text)} />
      <TouchableOpacity style={css.btnUpdateInfoSenha} onPress={() => sendForm()}>
                        <Text style={css.login__buttonText}>
                            Alterar senha
                        </Text>
                    </TouchableOpacity>
    </View>
    </ScrollView>
  );
}