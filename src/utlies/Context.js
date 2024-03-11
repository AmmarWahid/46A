import {StyleSheet, Text, View} from 'react-native';
import React, {createContext} from 'react';

const Context = ({childern}) => {
  const FCM = createContext();
  const [data, setdata] = React.useState();
  return <FCM.Provider value={{data, setdata}}>{childern}</FCM.Provider>;
};

export default Context;

const styles = StyleSheet.create({});
