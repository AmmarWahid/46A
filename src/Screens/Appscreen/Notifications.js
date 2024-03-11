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
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import back from '../../Assets/back.png';
import Search from '../../Assets/Search.png';
import like from '../../Assets/like.png';
import note from '../../Assets/notification.png';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useGetnotificationsQuery} from '../../Store/Main';
import {useSelector} from 'react-redux';

const Notifications = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const id = useSelector(state => state.Slice.id);

  const {data} = useGetnotificationsQuery(id);
  const filterdata = data?.slice(0, 8);
  console.log(filterdata);

  // console.log();
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
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image resizeMode="contain" source={back} style={styles.back} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.buttonText}>Notifications</Text>
          </TouchableOpacity>
          <View></View>
        </View>
      </View>

      <View style={{flex: 0.87}}>
        <FlatList
          data={filterdata}
          style={{top: responsiveHeight(1)}}
          renderItem={({item, index}) => {
            const dateObject = new Date(item.timestamp);
            const date = dateObject.toISOString().split('T')[0]; // YYYY-MM-DD
            const time = dateObject.toISOString().split('T')[1].split('.')[0]; // HH:MM:SS

            // console.log('Date:', date);
            // console.log('Time:', time);
            // let itteeemmm=item.
            return (
              <View style={{flex: 1}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Home')}
                  style={styles.data_content}>
                  <View style={{}}>
                    <Image
                      source={note}
                      resizeMode="contain"
                      style={styles.icons}
                    />
                  </View>

                  <View style={{gap: responsiveHeight(1)}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',

                        overflow: 'hidden',
                      }}>
                      <Text style={styles.datetime}>{date}</Text>
                      <Text style={styles.datetime}>{time}</Text>
                    </View>
                    <Text style={styles.heading}>Daily Catullus Verse</Text>
                    <Text style={styles.txt}>
                      Let the words of Catullus grace your day. Today's poem
                      awaits you.
                    </Text>
                    <Pressable>
                      <Text style={styles.done}>{item.body}</Text>
                    </Pressable>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

  data_content: {
    height: responsiveHeight(22),
    width: Dimensions.get('window').width - 40,
    backgroundColor: '#ffff',
    marginVertical: responsiveWidth(2),
    alignSelf: 'center',
    borderRadius: responsiveWidth(2),
    elevation: 1,
    flexDirection: 'row',
    overflow: 'hidden',

    paddingTop: responsiveHeight(3),
    gap: responsiveWidth(5),
    paddingLeft: responsiveWidth(2),
  },
  heading: {
    fontSize: responsiveFontSize(2.3),
    fontFamily: 'Taviraj-Bold',
    color: '#000',

    width: responsiveWidth(75),
  },
  datetime: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Taviraj-Bold',
    color: 'orange',
  },
  txt: {
    fontFamily: 'Taviraj-Regular',
    color: 'gray',
    width: responsiveWidth(75),
    bottom: 10,
  },
  done: {
    color: '#D86E06',
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    bottom: 10,
    // marginTop: responsiveHeight(1),
  },
  icons: {
    height: responsiveWidth(6),
    width: responsiveWidth(6),
  },
});
