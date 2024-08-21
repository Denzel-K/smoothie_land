import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';

import { icons } from "@/constants";
import { signOut } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

//import EmptyState from "@/components/EmptyState";
import InfoBox from "@/components/InfoBox";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  //const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign_in");
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="w-full flex justify-center items-center pt-6 pb-12 px-4">
        <View className="w-full flex flex-row justify-between align-middle">
          <Text className="text-2xl text-price font-psemibold">My Profile</Text>

          <TouchableOpacity
            onPress={logout}
            activeOpacity={0.7}
          >
            <Image
              source={icons.logout}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>

        <View className="w-16 h-16 rounded-full flex justify-center items-center mt-12">
          <Image
            source={{ uri: user?.avatar }}
            className="w-[90%] h-[90%] rounded-full"
            resizeMode="cover"
          />
        </View>

        <InfoBox
          title={`${user?.username}`}
          subtitle={`${user?.email}`}
          containerStyles="mt-2"
        />
      </View>
    
      <StatusBar backgroundColor="black" style="light"/>
    </SafeAreaView>
  );
};

export default Profile;