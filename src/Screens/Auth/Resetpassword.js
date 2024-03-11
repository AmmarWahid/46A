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
import logo from '../../Assets/loginlogo.png';
import back from '../../Assets/back.png';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {useResetpasswordMutation} from '../../Store/Auth';
import useToast from '../../Hooks';
import MsgModal from '../../Common/Loader';
import {AvoidSoftInput} from 'react-native-avoid-softinput';


const ResetPassword = ({route}) => {
  const {id} = route.params || {};
  // console.log(id);
  const navigation = useNavigation();
  const {showToast} = useToast();
  const [isLoading,setIsloading]=useState(false)

  const [value, setValue] = useState({
    password: '',
    resetPasswordVerificationCode: '',
  });
  const [setreset, {isError,}] = useResetpasswordMutation();
  const handleresetpassword = async () => {
    let body = {
      data: {
        password: value.password,
        resetPasswordVerificationCode: value.resetPasswordVerificationCode,
      },
      id,
    };

    try {
      setIsloading(true)

      const response = await setreset(body);
      // console.log('response', response);
      if (response.data) {
      setIsloading(false)
        showToast('success', 'Wow', response.data.message, 5000);
        navigation.replace('login');
      }
      if (response.error) {
      setIsloading(false)
        showToast('error', 'Error', response.error.data.message, 5000);
      }
    } catch (error) {
      setIsloading(false)

    }
  };

  return (
    <ImageBackground
      source={logo}
      style={{
        flex: 1,
      }}>
         <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <StatusBar
        translucent={true}
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
     

      {isLoading ? <MsgModal loader={true} /> : null}
       {/* <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}> */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image resizeMode="contain" source={back} style={styles.back} />
        </TouchableOpacity>
       
      </View>
      <View style={{flex: 0.6}}>
        <View>
          <Text style={styles.txt_intro}>Reset Password</Text>
        </View>

        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            width: responsiveWidth(80),
            fontSize: responsiveFontSize(1.7),
            alignSelf: 'center',
            fontFamily: 'Taviraj-Light',
          }}>
          Please Check Your email and enter the valid OTP Code
        </Text>

        <View
          style={{
            gap: 20,
            alignSelf: 'center',
            marginTop: responsiveHeight(5),
          }}>
          <View style={styles.txt_input}>
            <TextInput
              placeholder="OTP"
              style={{color: '#000'}}
              placeholderTextColor={'#000'}
              value={value.resetPasswordVerificationCode}
              onChangeText={pre =>
                setValue(txt => ({...txt, resetPasswordVerificationCode: pre}))
              }
            />
          </View>
          <View style={styles.txt_input}>
            <TextInput
              placeholder="New Password"
              placeholderTextColor={'#000'}
              style={{color: '#000'}}
              value={value.password}
              onChangeText={pre => setValue(txt => ({...txt, password: pre}))}
            />
          </View>
        </View>

        <TouchableOpacity onPress={handleresetpassword}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#FFB424', '#D86E06']}
            style={styles.linearGradient}>
            <Text style={[styles.btnText]}>Confirm</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ResetPassword;

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
});
