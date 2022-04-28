import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './Header.style';

const Header = ({otpu, data, name}) => {
  return (
    <View style={styles.containerUp}>
      <View style={styles.containerUpInnerContainer}>
        <View>
          <Image style={styles.image} source={{uri: otpu}} />
        </View>

        <View>
          <Text style={{fontSize: 30, color: 'white', marginStart: 20}}>
            {name}
          </Text>

          <Text style={{fontSize: 18, color: 'white', marginStart: 20}}>
            Post Sayısı:{Object.keys(data).length}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
