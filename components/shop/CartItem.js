import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = props => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData1}>
        <Text style={styles.quantity}>{props.quantity} </Text>
      </View>
      <View style={styles.itemData2}>
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
      <View style={styles.itemData3}>
        <Text style={styles.price}>𝙀{props.amount.toFixed(2)}</Text>
        {props.deletable && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.deleteButton}
          >
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 20,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: 'center',
    marginHorizontal: 10,
  },
  itemData1: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  itemData2: {
    flex: 5,
    marginHorizontal: 7,
  },
  itemData3: {
    flex: 3,
    marginHorizontal: 10,
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
  },
  mainText: {
    fontFamily: "open-sans-bold",
    fontSize: 16
  },
  price: {
    fontFamily: "open-sans-bold",
    fontSize: 16
  },
  deleteButton: { marginLeft: 20 }
});

export default CartItem;
