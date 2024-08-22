import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Draft from "@/assets/icons/draft.svg";
import Minus from '@/assets/icons/minus.svg';
import CustomButton from '@/components/CustomButton';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
        const validCart = cart.filter(item => {
          const diff = (new Date().getTime() - item.timestamp) / 1000 / 3600;
          return diff < 24;
        });
        
        if (validCart.length !== cart.length) {
          await AsyncStorage.setItem('cart', JSON.stringify(validCart));
        }
        
        setCartItems(validCart);
        setTotal(validCart.reduce((sum, item) => sum + item.price, 0));
      } catch (error) {
        Alert.alert("Error", "Unable to fetch cart items");
      }
    };

    fetchCartItems();
  }, []);

  const removeItemFromCart = async (flavorToRemove) => {
    try {
      const cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
      const updatedCart = cart.filter(item => item.flavor !== flavorToRemove);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      setTotal(updatedCart.reduce((sum, item) => sum + item.price, 0));
    } catch (error) {
      Alert.alert("Error", "Unable to remove item from cart");
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

            <View className="w-full rounded-xl bg-black pt-4 pb-6 mt-4">
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
                        onPress={() => removeItemFromCart(item.flavor)}
                      >
                        <Minus width={22} height={22} />
                      </TouchableOpacity>
                      <Text className="text-sm font-pregular text-gray-500 ml-2">{item.flavor}</Text>
                    </View>
                    <Text className="text-sm font-psemibold text-gray-400">${item.price.toFixed(2)}</Text>
                  </View>
                ))}
              </View>

              <View className="mt-6 px-2 border-t-2 border-gray-950 pt-2">
                <View className="w-full flex flex-row align-middle justify-between items-center">
                  <Text className="text-base font-pbold text-gray-400">Total</Text>
                  <Text className="text-base font-pbold text-gray-300">${total.toFixed(2)}</Text>
                </View>
              </View>

              <CustomButton 
                title="Place Order"
                handlePress={() => {
                  // Order functionality
                }}
                containerStyles="w-[80%] m-auto mt-10 bg-btnAdd"
              />
            </View>
          </View>

          {cartItems.length !== 0 && (
            <Text className="text-xs text-center font-psemibold text-gradientEnd mt-4">Note: This draft will be deleted in 24hrs</Text>
          )}
        </View>
      </ScrollView>

      <StatusBar backgroundColor="black" style="light"/>
    </SafeAreaView>
  );
};

export default Cart;
