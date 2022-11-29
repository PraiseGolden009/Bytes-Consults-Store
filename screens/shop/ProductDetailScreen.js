import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, Image, Button, StyleSheet, Dimensions, StatusBar, TouchableOpacity} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SharedElement } from 'react-navigation-shared-element'

import Icon, { Icons } from '../../components/Icons'
import MyHeader from '../../components/MyHeader'
const { width, height } = Dimensions.get('window');

import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const colors = [
  Colors.red,
  Colors.green,
  Colors.yellow,
  Colors.black,
]

const Quantity = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <View style={styles.quantity}>
      <TouchableOpacity style={styles.qtBtn} onPress={() => setQuantity(prev => prev - 1)}>
        <Icon type={Icons.Entypo} name="minus" />
      </TouchableOpacity>
      <Text style={styles.quantityText}>{quantity}</Text>
      <TouchableOpacity style={styles.qtBtn} onPress={() => setQuantity(prev => prev + 1)}>
        <Icon type={Icons.Entypo} name="plus" />
      </TouchableOpacity>
    </View>
  )
}

export default function DetailsScreen({ navigation, route }) {

  const productId = route.params.productId;
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );

  const { item } = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        StatusBar.setBackgroundColor("#ba0000");
        StatusBar.setBarStyle('light-content')
      })
      return () => unsubscribe;
    }, [navigation])
    useEffect(() => {
      const unsubscribe = navigation.addListener('blur', () => {
        StatusBar.setBackgroundColor(Colors.white);
        StatusBar.setBarStyle('dark-content')
      })
      return () => unsubscribe;
    }, [navigation])
  return (
    <View style={[styles.container, { backgroundColor: "#ba0000" }]}>
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title={route.params.productTitle}
        right="more-vertical"
        optionalBtn="shopping-cart"
        headerBg={"#ba0000"}
        iconColor={Colors.white}
        onRightPress={() => console.log('right')}
        optionalBtnPress={() => navigation.navigate("Cart")}
      />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View>
            <Text style={styles.smallText}>{selectedProduct.subtitle}</Text>
            <Text style={styles.bigText}>{selectedProduct.title}</Text>
          </View>
          <View>
            <Text style={styles.smallText}>Price</Text>
            <Text style={styles.bigText}>𝙀{selectedProduct.price}</Text>
          </View>
        </View>
        <SharedElement id={`selectedProduct.${selectedProduct.id}.image`} style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} resizeMode="center" />
        </SharedElement>
        <View style={styles.bottomContainer}>
          {/* <View style={styles.variants}>
            <ColorsSelector />
            <SizeSelector />
          </View> */}
          <ScrollView style={styles.descriptionContainer}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Description</Text>
            <Text>{selectedProduct.description}</Text>
          </ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Quantity />
            <TouchableOpacity style={[styles.favoriteBtn, { backgroundColor: "#ba0000" }]}>
              <Icon type={Icons.AntDesign} name="heart" size={18} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity
              style={[styles.cartBtm, { borderColor: "#ba0000" }]}
              onPress={() => {
                dispatch(cartActions.addToCart(selectedProduct));
                navigation.navigate('Cart', { selectedProduct });
              }}
            >
                <Icon type={Icons.AntDesign} name="shoppingcart" color={"#ba0000"} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, { backgroundColor: "#ba0000" }]}>
              <Text style={styles.btnText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export const screenOptions = navData => {
  return {
    headerShown: false
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    height: height / 3,
    padding: 16,
    justifyContent: 'space-between',
  },
  bottomContainer: {
    padding: 16,
    flex: 1,
    backgroundColor: Colors.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 80,
  },
  bigText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
  },
  smallText: {
    color: Colors.white,
  },
  image: {
    width: width / 1.5,
    height: width / 1.5,
  },
  imageContainer: {
    position: 'absolute',
    zIndex: 999,
    top: 60,
    alignSelf: 'flex-end',
  },
  colorBtn: {
    height: 16,
    width: 16,
    borderRadius: 6,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 6,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  variants: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  qtBtn: {
    borderWidth: 1,
    borderColor: Colors.darkGray,
    borderRadius: 8,
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  favoriteBtn: {
    borderRadius: 17,
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBtm: {
    borderRadius: 10,
    width: 50,
    height: 45,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  btn: {
    flex: 1,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.white,
  },
})
