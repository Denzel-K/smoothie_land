import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import useAppwrite from "@/hooks/useAppwrite";
// import { searchPosts } from "@/lib/appwrite";

// import EmptyState from "@/components/EmptyState";
// import SearchInput from "@/components/SearchInput";
// import VideoCard from "@/components/VideoCard";

const Search = () => {
  const { query } = useLocalSearchParams();
  //const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-black h-full pt-6 px-4">
      <FlatList
        data={smoothies}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <SmoothieCard 
            flavor={item.flavor}
            price={item.price}
            ingredients={item.ingredients}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput initialQuery={query} />
              </View>
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;