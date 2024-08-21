import { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import {Redirect, router} from 'expo-router';

//import { icons } from "@/constants";
import CartAdd from '@/assets/icons/cart-add.svg';
import images from "@/data/imageMapping";

const SmoothieCard = ({ flavor, ingredients, price}) => {
  const imageSource = images[flavor];

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
        <View className="flex  justify-between flex-row items-center w-full">
          <Text className="text-title font-psemibold text-base">{flavor}</Text>

          <TouchableOpacity 
            activeOpacity={0.7}
            className="flex align-middle justify-center items-center w-[30px] h-[30px] rounded-full bg-btnAdd mr-2 mt-[-4px]"
            onPress={() => {
              
            }}
          >
            <CartAdd width={18} height={18} />
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
}

export default SmoothieCard;