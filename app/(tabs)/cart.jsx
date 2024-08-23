import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useContext } from 'react';
import {router} from 'expo-router';

import Draft from "@/assets/icons/draft.svg";
import Minus from '@/assets/icons/minus.svg';
import { images } from "@/constants";
import CustomButton from '@/components/CustomButton';

import { CartContext } from "@/context/CartProvider";
import { useGlobalContext } from '@/context/GlobalProvider';
import {createOrder} from '@/lib/appwrite';

const Cart = () => {
  const { cartItems, total, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useGlobalContext();

  const handlePlaceOrder = async () => {
    try {
      if (!user) {
        Alert.alert("Error", "You need to be logged in to place an order.");
        return;
      }

      const itemsNoTimestamp = cartItems.map(({ timestamp, ...item }) => item);

      const response = await createOrder(user.$id, itemsNoTimestamp, total);

      if (response) {
        Alert.alert("Success", "Order placed successfully!");
        clearCart();
      }
    } 
    catch (error) {
      Alert.alert("Error", "Failed to place the order. Please try again.");
    }
  };


  return (
    <SafeAreaView className="h-full bg-black">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'start' }}
      >
        <View className="w-full flex justify-center items-center pt-6 pb-12 px-4">
          <Text className="text-2xl text-price font-psemibold">My Cart</Text>

          <View className="w-full flex flex-col align-middle justify-start rounded-xl bg-gray-900 mt-8 pt-4 pb-2 px-2">
            <View className="w-full flex flex-row align-middle justify-between items-center">
              <Text className="text-lg font-psemibold text-blue-300">Draft</Text>
              <Draft width={22} height={22} />
            </View>

            {cartItems.length !== 0 ? (
              <View className="w-full rounded-xl bg-gray-950 pt-4 pb-6 mt-4">
                <View className="w-full flex flex-row align-middle justify-between items-center border-b-2 border-gray-900 pb-2 px-2">
                  <Text className="text-sm font-pbold text-primary">Item</Text>
                  <Text className="text-sm font-pbold text-primary">Price</Text>
                </View>

                <View className="mt-4 px-2">
                  {cartItems.map((item, index) => (
                    <View key={index} className="w-full flex flex-row align-middle justify-between items-center mt-2">
                      <View className="flex flex-row align-middle justify-start items-center">
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => removeFromCart(item.flavor)}
                        >
                          <Minus width={22} height={22} />
                        </TouchableOpacity>
                        <Text className="text-sm font-pregular text-gray-500 ml-2">{item.flavor}</Text>
                      </View>
                      <Text className="text-sm font-psemibold text-gray-400">${item.price}</Text>
                    </View>
                  ))}
                </View>

                <View className="mt-6 px-2 border-t-2 border-gray-900 pt-2">
                  <View className="w-full flex flex-row align-middle justify-between items-center">
                    <Text className="text-base font-pbold text-gray-400">Total</Text>
                    <Text className="text-base font-pbold text-gray-300">${total.toFixed(2)}</Text>
                  </View>
                </View>

                <CustomButton 
                  title="Place Order"
                  handlePress={handlePlaceOrder}
                  containerStyles="w-[80%] m-auto mt-10 bg-btnAdd"
                />
              </View>) : (
              <View className="w-full rounded-xl bg-gray-950 pt-4 pb-6 mt-4 flex flex-col align-middle justify-center items-center">
                <Image 
                  source={images.ShoppingCart}
                  className="w-[200px] h-[200px]"
                  resizeMode="contain"
                />
                <Text className="text-center text-base font-psemibold text-purple-400 opacity-75">Add items to cart to view draft</Text>
              </View>
              )
            }

            {cartItems.length !== 0 && (
              <Text className="text-xs text-center font-psemibold text-gradientEnd mt-4">Note: This draft will be deleted in 12hrs</Text>
            )}
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="black" style="light"/>
    </SafeAreaView>
  );
};

export default Cart;
