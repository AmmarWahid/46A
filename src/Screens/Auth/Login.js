import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {createContext, useCallback, useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import logo from '../../Assets/loginlogo.png';
import back from '../../Assets/back.png';
import LinearGradient from 'react-native-linear-gradient';
import {AvoidSoftInput} from 'react-native-avoid-softinput';
import {useFocusEffect} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {useLoginUserMutation, useSignupMutation} from '../../Store/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useToast from '../../Hooks';
import MsgModal from '../../Common/Loader';
import {useDispatch} from 'react-redux';
import {setUser} from '../../Store/Slice';
const Login = () => {
const FCM =createContext()
const FCMToken =useContext(FCM)

  async function getToken() {
    const fcmToken = await AsyncStorage.getItem('fcmtoken');
    return fcmToken;
  }
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    email: '',
    password: '',
  });
  const body = {
    email: value.email,
    password: value.password,
  };
  const {showToast} = useToast();

  const [setlogin, {data, isError, isSuccess, isLoading}] =
    useLoginUserMutation();
  const handleLogin = async () => {
    let res = await getToken();
    // console.log(res);
    let body = {
      email: value.email,
      password: value.password,
      // email: 'ammarmemon450@gmail.com',
      // password: 'Test@1234',
      fcmToken: res,
    };

    try {
      const response = await setlogin(body);
      console.log(response);
      if (response.data) {
        dispatch(setUser(response.data.data));
        // navigation.navigate('MyTabs');
      }
      if (response.error) {
        showToast('error', 'Error', response.error.data.Error, 5000);
      }
    } catch (error) {
      // console.log(error);
      showToast('error', 'Error', error, 5000);
    }
  };
  const onFocusEffect = React.useCallback(() => {
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
    AvoidSoftInput.setEnabled(true);
    return () => {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
      setValue({});
    };
  }, []);

  useFocusEffect(onFocusEffect);

  const [selected, setSelected] = useState(0);
  const btn = useCallback(n => {
    setSelected(n);
  }, []);
  return (
    <ImageBackground
      source={logo}
      style={{
        flex: 1,
      }}>
      <StatusBar
        translucent={true}
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />

      {isLoading ? <MsgModal loader={true} /> : null}
      <ScrollView
        keyboardDismissMode="on-drag"
      
      
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <Image resizeMode="contain" source={back} style={styles.back} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('signup');
            }}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.6, marginTop: responsiveHeight(35)}}>
          <View>
            <Text style={styles.txt_intro}>Sign In</Text>
          </View>
          <View
            style={{
              gap: 20,
              alignSelf: 'center',
              marginTop: responsiveHeight(5),
            }}>
            <View style={styles.txt_input}>
              <TextInput
                placeholder="Your Email"
                style={{color: '#000'}}
                placeholderTextColor={'#000'}
                value={value.email}
                autoCapitalize='none'
                onChangeText={pre => setValue(txt => ({...txt, email: pre}))}
              />
            </View>
            <View style={styles.txt_input}>
              <TextInput
                placeholder="Password"
                style={{color: '#000'}}
                placeholderTextColor={'#000'}
                value={value.password}
                secureTextEntry
                onChangeText={pre => setValue(txt => ({...txt, password: pre}))}
              />
            </View>
          </View>

          <Pressable
            style={{zIndex: 9999, marginVertical: responsiveHeight(1)}}
            onPress={() => {
              navigation.navigate('forgetpassword');
            }}>
            <Text style={styles.forget}>Forget?</Text>
          </Pressable>

          <TouchableOpacity onPress={handleLogin}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={
                selected == 0 ? ['#FFB424', '#D86E06'] : ['#fff', '#ffff']
              }
              style={styles.linearGradient}>
              <Text style={[styles.btnText]}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  txt_intro: {
    color: '#000',
    fontFamily: 'Taviraj-Regular',
    textAlign: 'center',
    fontSize: responsiveFontSize(4.5),
  },

  linearGradient: {
    height: responsiveHeight(7),
    width: responsiveWidth(85),
    borderRadius: responsiveWidth(30),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
  },
  btnText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveHeight(4),
    flex: 0.4,
  },
  txt_input: {
    height: responsiveHeight(8),
    width: responsiveWidth(85),
    borderWidth: responsiveWidth(0.2),
    borderColor: '#000',
    borderRadius: responsiveWidth(30),
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(5),
  },
  back: {
    height: responsiveHeight(4),
    width: responsiveWidth(8),
    top: responsiveHeight(4),
  },
  forget: {
    color: '#000',
    fontSize: responsiveFontSize(2),
    fontFamily: 'Taviraj-Black',
    textAlign: 'center',
    top: responsiveHeight(2),
  },
});
