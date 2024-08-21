import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Redirect, router} from 'expo-router';

import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";

//context/provider
import { useGlobalContext } from "@/context/GlobalProvider";

export default function Welcome() {
  const {isLoading, isLoggedIn} = useGlobalContext();

  if(!isLoading && isLoggedIn){
    return <Redirect href="/home" />
  }

  return (
    <SafeAreaView className="h-full bg-black">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <View className="flex align-middle justify-center items-center px-4 py-8">
          <Image 
            source={images.smoothieland}
            className="w-[250px] h-[280px]"
            resizeMode="contain"
          />

          <View className="flex flex-row align-middle justify-center items-center">
            <Text className="text-3xl font-pbold text-gradientStart">
              Smoothie
            </Text>
            <Text className="text-3xl font-pbold text-gradientEnd">
              Land
            </Text>
          </View>
          
          <Text className="font-psemibold text-base text-gray-400">
            Blend Your Day with Freshness!
          </Text>

          <CustomButton 
            title="Explore Flavors"
            handlePress={() => {
              router.push('/sign_in');
            }}
            containerStyles="w-full mt-6"
          />  
        </View>
      </ScrollView>

      <StatusBar backgroundColor="black" style="light"/>
    </SafeAreaView>
  );
}