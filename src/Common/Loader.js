import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const MsgModal = ({msg, loader, color}) => {
  const [visible, setVisible] = useState(null);
  return (
    <Modal transparent visible={!visible}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            height: responsiveHeight(30),
            width: responsiveHeight(30),
            // backgroundColor: '#D86E06',
            backgroundColor: '#fff',
            borderRadius: responsiveHeight(7),
            alignItems: 'center',
            paddingHorizontal: responsiveWidth(3),
            elevation: responsiveHeight(10),
            justifyContent: 'center',
            // opacity: 0.95,
            borderWidth: 1,
            borderColor: '#D86E06',
          }}>
          {msg && (
            <>
              <Text
                style={{
                  color: color,
                  fontSize: responsiveFontSize(2),
                  letterSpacing: responsiveWidth(0.2),
                  marginTop: responsiveHeight(2),
                  textAlign: 'center',
                }}>
                {msg}
                {'\n🤮'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setVisible(!visible);
                }}
                style={{
                  height: responsiveHeight(4),
                  width: responsiveHeight(10),
                  backgroundColor: '#fff',
                  top: responsiveHeight(4),
                  borderRadius: responsiveWidth(4),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></TouchableOpacity>
            </>
          )}

          {loader && (
            <ActivityIndicator
              size={'large'}
              color={'#D86E06'}
              style={{transform: [{scaleY: 2.5}, {scaleX: 2.5}]}}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default MsgModal;

const styles = StyleSheet.create({});
