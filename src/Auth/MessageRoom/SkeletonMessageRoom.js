import React from 'react';
import {View, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const deviceSize = Dimensions.get('window');

const Skeleton = () => {
  return (
    <View style={{flex: 1}}>
      <SkeletonPlaceholder>
        <View style={{alignItems: 'flex-end'}}>
          <View
            style={{
              minHeight: deviceSize.height * 0.05,
              backgroundColor: 'white',
              marginHorizontal: 10,
              borderRadius: 10,
              padding: 5,
              minWidth: deviceSize.width * 0.4,
              maxWidth: deviceSize.width * 0.5,
            }}></View>
        </View>
        <View style={{alignItems: 'flex-start'}}>
          <View
            style={{
              marginVertical: 10,
              minHeight: deviceSize.height * 0.05,
              backgroundColor: 'white',
              marginHorizontal: 10,
              borderRadius: 10,
              padding: 5,
              minWidth: deviceSize.width * 0.4,
              maxWidth: deviceSize.width * 0.5,
            }}></View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <View
            style={{
              minHeight: deviceSize.height * 0.05,
              backgroundColor: 'white',
              marginHorizontal: 10,
              borderRadius: 10,
              padding: 5,
              minWidth: deviceSize.width * 0.4,
              maxWidth: deviceSize.width * 0.5,
            }}></View>
        </View>
        <View style={{alignItems: 'flex-start'}}>
          <View
            style={{
              marginVertical: 10,
              minHeight: deviceSize.height * 0.05,
              backgroundColor: 'white',
              marginHorizontal: 10,
              borderRadius: 10,
              padding: 5,
              minWidth: deviceSize.width * 0.4,
              maxWidth: deviceSize.width * 0.5,
            }}></View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <View
            style={{
              minHeight: deviceSize.height * 0.05,
              backgroundColor: 'white',
              marginHorizontal: 10,
              borderRadius: 10,
              padding: 5,
              minWidth: deviceSize.width * 0.4,
              maxWidth: deviceSize.width * 0.5,
            }}></View>
        </View>
        <View style={{alignItems: 'flex-start'}}>
          <View
            style={{
              marginVertical: 10,
              minHeight: deviceSize.height * 0.05,
              backgroundColor: 'white',
              marginHorizontal: 10,
              borderRadius: 10,
              padding: 5,
              minWidth: deviceSize.width * 0.4,
              maxWidth: deviceSize.width * 0.5,
            }}></View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default Skeleton;
