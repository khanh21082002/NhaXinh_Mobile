import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from '../../../components/UI/CustomText';
import Colors from '../../../utils/Colors';
import NumberFormat from '../../../components/UI/NumberFormat';
import {StarRating} from './StarRating';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

export const DetailBody = ({item, color}) => {
  console.log('item', item);
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <>
        <Animatable.View
          animation="lightSpeedIn"
          delay={500}
          style={styles.footer_header}>
          <CustomText selectable={true} style={{...styles.title, color}}>
            {item.name}
          </CustomText>
          <NumberFormat
            style={{color: '#fff', fontSize: 13}}
            price={item.price}
            color={color}
          />
        </Animatable.View>

        {/* <View style={{ flexDirection: "row", marginTop: 10 }}>
            <StarRating rating={item.rating.rate} color={color} />
          </View> */}
        {item.model3DUrl && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AR', {model3D: item.model3DUrl})
            }
            style={styles.arButton}>
            <AntDesign name="camera" size={20} color="#fff" />
            <CustomText style={styles.arButtonText}>Xem AR</CustomText>
          </TouchableOpacity>
        )}

        <Animatable.View
          animation="fadeInUpBig"
          delay={500}
          style={styles.description}>
          <CustomText
            style={{
              ...styles.title,
              fontWeight: '500',
              marginTop: 20,
              marginBottom: 10,
              textDecorationLine: 'underline',
            }}>
            Chi tiết
          </CustomText>
          <View style={styles.infoContainer}>
            <CustomText>Chiều dài: </CustomText>
            <CustomText style={{color: color}}>
              {item.dimensionsLength} cm
            </CustomText>
          </View>
          <View style={styles.infoContainer}>
            <CustomText>Chiều rộng: </CustomText>
            <CustomText style={{color: color}}>
              {item.dimensionsWidth} cm
            </CustomText>
          </View>
          <View style={styles.infoContainer}>
            <CustomText>Chiều cao: </CustomText>
            <CustomText style={{color: color}}>
              {item.dimensionsHeight} cm
            </CustomText>
          </View>
          <View style={styles.infoContainer}>
            <CustomText>Chất liệu: </CustomText>
            <CustomText>{item.materialName}</CustomText>
          </View>
          <View style={styles.infoContainer}>
            <CustomText>Danh mục sản phẩm: </CustomText>
            <CustomText>{item.categoryName}</CustomText>
          </View>
          <View style={styles.infoContainer}>
            <CustomText>Danh mục phụ: </CustomText>
            <CustomText>{item.subCategoryName}</CustomText>
          </View>
          <View style={styles.infoContainer}>
            <CustomText>Bộ sưu tập: </CustomText>
            <CustomText>{item.collectionName}</CustomText>
          </View>
          <View style={styles.infoContainer}>
            <CustomText>Yêu cầu lắp ráp: </CustomText>
            {item.assemblyRequired ? (
              <CustomText style={{color: color}}>Yêu cầu</CustomText>
            ) : (
              <CustomText style={{color: color}}>Không yêu cầu</CustomText>
            )}
          </View>
          <CustomText
            style={{
              ...styles.title,
              textDecorationLine: 'underline',
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Miêu tả
          </CustomText>
          <CustomText selectable={true} style={styles.detail}>
            {item.description}
          </CustomText>
        </Animatable.View>
      </>
      {/* ) : (
        <ARViewerOptimized 
          modelUrl={
            Platform.select({
              android: "https://github.com/riderodd/react-native-ar/blob/main/example/src/dice.glb?raw=true",
              ios: "https://github.com/riderodd/react-native-ar/blob/main/example/src/dice.usdz?raw=true",
            })
          }
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
    marginTop: 200,
    borderRadius: 30,
  },
  footer_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
    color: Colors.text,
  },
  detail: {
    fontSize: 15,
    lineHeight: 20,
  },
  description: {
    marginTop: 10,
  },
  infoContainer: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  arButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  arButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
  },
});
