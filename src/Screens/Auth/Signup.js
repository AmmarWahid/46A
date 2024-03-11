import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,KeyboardAvoidingView,Platform
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import logo from '../../Assets/signup.png';
import back from '../../Assets/back.png';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {AvoidSoftInput} from 'react-native-avoid-softinput';
import {useFocusEffect} from '@react-navigation/native';
import useToast from '../../Hooks';
import {useSignupMutation} from '../../Store/Auth';
import MsgModal from '../../Common/Loader';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
const Signup = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(0);
  const [value, setValue] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  console.log('value.firstname', value.firstname);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const {showToast} = useToast();
  const [setsignup, {isError, isLoading, isSuccess, data, status}] =
    useSignupMutation();
  const handleSignup = async () => {
    if (!emailRegex.test(value.email)) {
      showToast('error', 'Error', 'Enter Valid Email', 5000);
    }
    let body = {
      firstName: value.firstname,
      lastName: value.lastname,
      email: value.email,
      password: value.password,
    };

    try {
      const response = await setsignup(body);
      console.log(response, isError, isSuccess, status, data);

      if (response.data) {
        navigation.navigate('login');
        showToast('success', 'Now Login', 'Account Created', 5000);
      }
      if (response.error) {
        showToast('error', 'Error', response.error.data.error, 5000);
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
    };
  }, []);

  useFocusEffect(onFocusEffect);

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
      <GestureHandlerRootView>



        <ScrollView
         keyboardDismissMode="on-drag"
        
        
        >
          {isLoading ? <MsgModal loader={true} /> : null}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.pop();
              }}>
              <Image resizeMode="contain" source={back} style={styles.back} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('login');
              }}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: responsiveHeight(30)}}>
            <View>
              <Text style={styles.txt_intro}>Sign Up</Text>
            </View>
            <View
              style={{
                gap: 10,
                alignSelf: 'center',
                marginTop: responsiveHeight(3),
              }}>
              <View style={styles.txt_input}>
                <TextInput
                  placeholder="First Name"
                  style={{color: '#000'}}
                  placeholderTextColor={'#000'}
                  value={value.firstname}
                  onChangeText={pre =>
                    setValue(txt => ({...txt, firstname: pre}))
                  }
                />
              </View>
              <View style={styles.txt_input}>
                <TextInput
                  placeholder="Last Name"
                  style={{color: '#000'}}
                  placeholderTextColor={'#000'}
                  value={value.lastname}
                  onChangeText={pre =>
                    setValue(txt => ({...txt, lastname: pre}))
                  }
                />
              </View>
              <View style={styles.txt_input}>
                <TextInput
                  placeholder="Email"
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
                  placeholderTextColor={'#000'}
                  style={{color: '#000'}}
                  value={value.password}
                  secureTextEntry
                  onChangeText={pre =>
                    setValue(txt => ({...txt, password: pre}))
                  }
                />
              </View>
            </View>
            <TouchableOpacity onPress={handleSignup}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={
                  selected == 0 ? ['#FFB424', '#D86E06'] : ['#fff', '#ffff']
                }
                style={styles.linearGradient}>
                <Text style={[styles.btnText]}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={{height: responsiveHeight(9)}}></View>
        
        </ScrollView>
 
      </GestureHandlerRootView>
    </ImageBackground>
  );
};

export default Signup;

const styles = StyleSheet.create({
  txt_intro: {
    color: '#000',
    fontFamily: 'Taviraj-Regular',

    textAlign: 'center',
    fontSize: responsiveFontSize(4),
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
    flex: 0.34,
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
});
