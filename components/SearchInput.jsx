import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import { icons } from "../constants";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-12 px-4 bg-gray-800 rounded-xl border-2 border-black-200 focus:border-primary">
      <TextInput
        className="text-sm mt-0.5 text-gray-400 flex-1 font-pregular"
        value={query}
        placeholder="Search a smoothie flavor"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          // if (query === "")
          //   return Alert.alert(
          //     "Missing Query",
          //     "Please input something to search for your flavor."
          //   );

          // if (pathname.startsWith("/search")) router.setParams({ query });
          // else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;