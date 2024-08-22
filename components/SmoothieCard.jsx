import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import CartAdd from '@/assets/icons/cart-add.svg';
import Tick from '@/assets/icons/tick.svg';
import images from "@/data/imageMapping";

const SmoothieCard = React.memo(({ flavor, ingredients, price }) => {
  const imageSource = images[flavor];
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const checkCart = async () => {
      try {
        const cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
        const isAdded = cart.some(item => item.flavor === flavor && (new Date().getTime() - item.timestamp) / 1000 / 3600 < 24);
        setAdded(isAdded);
      } catch (error) {
        Alert.alert("Error", "Unable to check cart items");
      }
    };

    checkCart();
  }, [flavor]);

  const handleAddToCart = async () => {
    try {
      const cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
      const itemExists = cart.some(item => item.flavor === flavor);
      if (itemExists) {
        Alert.alert("Item already in cart", "This item is already in your cart.");
        return;
      }

      const newItem = { flavor, ingredients, price, timestamp: new Date().getTime() };
      const updatedCart = [...cart, newItem];
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setAdded(true);
    } catch (error) {
      Alert.alert("Error", "Unable to add item to cart");
    }
  };

  return (
    <View className="flex flex-col items-center p-0 w-full bg-gray-900 mb-4 rounded-xl">
      <View className="w-full h-[140px] overflow-hidden">
        <Image 
          source={imageSource}
          className="w-full h-full rounded-t-xl"
          resizeMode="cover"
        />
      </View>

      <View className="px-2 py-4">
        <View className="flex justify-between flex-row items-center w-full">
          <Text className="text-title font-psemibold text-base">{flavor}</Text>

          <TouchableOpacity 
            activeOpacity={0.7}
            className={`flex align-middle justify-center items-center w-[30px] h-[30px] rounded-full mr-2 mt-[-4px] ${!added ? `bg-btnAdd`: `bg-none`}`}
            onPress={handleAddToCart}
          >
            {!added ? (
              <CartAdd width={18} height={18} />
            ) : (
              <Tick width={28} height={28} />
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-4">
          <View className="flex flex-col align-middle justify-center">
            <Text className="text-xs font-psemibold text-gray-400">Ingredients: </Text>
            <Text className="text-xs text-gray-500 font-pregular">{ingredients.join(', ')}</Text>
          </View>
          <Text className="text-lg font-psemibold text-price mt-2">${price.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
});

export default SmoothieCard;
