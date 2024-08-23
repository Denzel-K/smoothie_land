import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from 'expo-status-bar';

import { icons } from "@/constants";
import { signOut } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import InfoBox from "@/components/InfoBox";
import Transaction from "@/components/Transaction";
import History from '@/assets/icons/history.svg';
import EmptyFolder from '@/assets/icons/emptyFolder.svg';

const Profile = () => {
  const { user, setUser, setIsLoggedIn, transactions } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign_in");
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'start' }}
      >
        <View className="w-full flex justify-center items-center pt-6 pb-12 px-4">
          <View className="w-full flex flex-row justify-between align-middle">
            <Text className="text-2xl text-price font-psemibold">My Profile</Text>

            <TouchableOpacity onPress={logout} activeOpacity={0.7}>
              <Image source={icons.logout} resizeMode="contain" className="w-6 h-6" />
            </TouchableOpacity>
          </View>

          <View className="w-16 h-16 rounded-full flex justify-center items-center mt-6">
            <Image source={{ uri: user?.avatar }} className="w-[90%] h-[90%] rounded-full" resizeMode="cover" />
          </View>

          <InfoBox title={`${user?.username}`} subtitle={`${user?.email}`} containerStyles="mt-2" />

          <View className="flex flex-col w-full align-middle justify-start items-center mt-8">
            <View className="w-full flex flex-row justify-between align-middle items-center">
              <Text className="text-lg font-psemibold text-blue-400 text-left">Order History</Text>
              <History width={28} height={28} />
            </View>

            {transactions.length === 0 ? (
              <View className="flex flex-col align-middle justify-center items-center w-full h-[140px] mt-2 bg-gray-950 rounded-xl px-2">
                <EmptyFolder width={34} height={34} />
                <Text className="text-sm font-psemibold text-slate-500 mt-4">Transactions will appear here</Text>
                <Text className="text-xs font-pregular text-gray-700 text-center">Explore flavors, add items to cart, then place an order.</Text>
              </View>
            ) : (
              transactions.map((transaction) => (
                <Transaction 
                  key={transaction.$id}
                  date={transaction.createdAt}
                  items={transaction.items}
                  total={transaction.total}
                  status={transaction.status}
                />
              ))
            )}
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="black" style="light" />
    </SafeAreaView>
  );
};

export default Profile;