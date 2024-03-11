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
import React, {useCallback, useEffect, useState} from 'react';
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
import {useForgetpasswordMutation} from '../../Store/Auth';
import MsgModal from '../../Common/Loader';
import useToast from '../../Hooks';
import {AvoidSoftInput} from 'react-native-avoid-softinput';
import {useFocusEffect} from '@react-navigation/native';

const Forget = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const {showToast} = useToast();
  const [isLoading,setIsloading]=useState(false)
  const [setforget, {}] = useForgetpasswordMutation();
  const handleforget = async () => {
    // console.log(res);
    let body = {
      email: email,
    };

    // if (!email) {
    //   return showToast('error', 'Error', "email mus", 5000);
    // }

    try {
      setIsloading(true)
      const response = await setforget(body);
      console.log('response', response);

      if (response.data) {
        setIsloading(false)
        navigation.replace('resetpassword', {id: response.data.data.id});
      }
      if (response.error) {
        setIsloading(false)
        showToast('error', 'Error', response.error.data.message, 5000);
      }
    } catch (error) {
      console.log(error);
      setIsloading(false)
      showToast('error', 'Error', error.error, 5000);
    }
  };
//   const onFocusEffect = useCallback(() => {
//     AvoidSoftInput.setShouldMimicIOSBehavior(true);
//     AvoidSoftInput.setEnabled(true);
//     return () => {
//       AvoidSoftInput.setEnabled(false);
//       AvoidSoftInput.setShouldMimicIOSBehavior(false);
   
//     };
//   }, []);

//  useFocusEffect(onFocusEffect);
useEffect(()=>{

  AvoidSoftInput.setShouldMimicIOSBehavior(true);
    AvoidSoftInput.setEnabled(true);
},[])
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


<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  style={{flex: 1}}
>

      {isLoading ? <MsgModal loader={true} /> : null}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}>
          <Image resizeMode="contain" source={back} style={styles.back} />
        </TouchableOpacity>
        <TouchableOpacity></TouchableOpacity>
      </View>
      <View style={{flex: 0.6}}>
        <View>
          <Text style={styles.txt_intro}>Forget Password</Text>
        </View>

        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            width: responsiveWidth(80),
            fontSize: responsiveFontSize(1.5),
            alignSelf: 'center',
            fontFamily: 'Taviraj-Light',
          }}>
          Please enter the valid Email Address you'd like your password reset
          information sent to
        </Text>

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
              value={email}
              autoCapitalize='none'
              onChangeText={r => setEmail(r)}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={
            handleforget

            // () => {
            // navigation.navigate('resetpassword');
            // }
          }>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#FFB424', '#D86E06']}
            style={styles.linearGradient}>
            <Text style={[styles.btnText]}>Procced</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Forget;

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
