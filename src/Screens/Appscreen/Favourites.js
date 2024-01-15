import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  FlatList,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import back from '../../Assets/back.png';
import Search from '../../Assets/Search.png';
import like from '../../Assets/like.png';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const Favourites = () => {
  return (
    <SafeAreaView
      edges={['bottom']}
      style={{flex: 1, backgroundColor: '#F6F5F0'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <View
        style={{
          flex: 0.1,
          marginTop: responsiveHeight(2),
          zIndex: 9999,
        }}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.buttonText}>Favourites</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 0.1}}>
        <View style={styles.Search_contain}>
          <TextInput
            placeholder="Search for favourites"
            placeholderTextColor={'#000'}
          />
          <TouchableOpacity style={styles.search_icon}>
            <Image resizeMode="contain" source={Search} style={styles.icons} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 0.77, marginBottom: responsiveHeight(6)}}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          style={{top: responsiveHeight(1)}}
          renderItem={({item, index}) => {
            return (
              <View style={{flex: 1}}>
                <View style={styles.data_content}>
                  <View style={{gap: responsiveHeight(2)}}>
                    <Text style={styles.heading}>
                      The Dedication: To Cornelius
                    </Text>
                    <Text style={styles.txt}>By Catullus</Text>
                  </View>
                  <View style={styles.fav}>
                    <Image
                      source={like}
                      resizeMode="contain"
                      style={styles.icons}
                    />
                    <Text style={{color: '#D86E06'}}>Read</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveHeight(3),
  },
  buttonText: {
    fontSize: responsiveFontSize(2.8),
    fontFamily: 'Taviraj-Bold',
    color: '#000',
  },
  back: {
    height: responsiveHeight(4),
    width: responsiveWidth(8),
  },
  Search_contain: {
    height: responsiveHeight(9),
    width: Dimensions.get('window').width - 60,
    borderRadius: responsiveWidth(4),
    borderWidth: responsiveWidth(0.3),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(2),
  },
  search_icon: {
    backgroundColor: '#FFB424',
    height: responsiveWidth(16),
    width: responsiveWidth(16),
    borderRadius: responsiveWidth(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  data_content: {
    height: responsiveHeight(15),
    width: Dimensions.get('window').width - 40,
    backgroundColor: '#ffff',
    marginVertical: responsiveWidth(2),
    alignSelf: 'center',
    borderRadius: responsiveWidth(2),
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(4),
  },
  heading: {
    fontSize: responsiveFontSize(2.3),
    fontFamily: 'Taviraj-Bold',
    color: '#000',
    width: responsiveWidth(50),
  },
  txt: {fontFamily: 'Taviraj-Regular', color: 'gray'},
  fav: {gap: 10, alignItems: 'center'},
  icons: {
    height: responsiveWidth(6),
    width: responsiveWidth(6),
  },
});
