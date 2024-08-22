import { View, Text, FlatList, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';

//components
import SmoothieCard from '@/components/SmoothieCard';
import SearchInput from '@/components/SearchInput';

//data sample (local testing)
import smoothiesData from '@/data/smoothies.json';

//context/provider
import { useGlobalContext } from '@/context/GlobalProvider';
import Filters from '@/components/Filters';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [smoothies, setSmoothies] = useState([]);
  const [filteredSmoothies, setFilteredSmoothies] = useState([]);

  const { user } = useGlobalContext();

  async function fetchSmoothies() {
    try {
      setSmoothies(smoothiesData);
      setFilteredSmoothies(smoothiesData); // Initialize with all data
    } catch (error) {
      Alert.alert("Fetch error:", "Unable to fetch smoothies");
    }
  }

  useEffect(() => {
    fetchSmoothies();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSmoothies();
    setRefreshing(false);
  };

  const handleFilterChange = (filters) => {
    let filtered = smoothies;

    if (filters.mainIngredient) {
      filtered = filtered.filter((smoothie) => smoothie.mainIngredient === filters.mainIngredient);
    }

    if (filters.nutritionalContent.length > 0) {
      filtered = filtered.filter((smoothie) =>
        filters.nutritionalContent.every((content) => smoothie.nutritionalContent.includes(content))
      );
    }

    if (filters.benefits.length > 0) {
      filtered = filtered.filter((smoothie) =>
        filters.benefits.every((benefit) => smoothie.benefits.includes(benefit))
      );
    }

    if (filters.flavorProfile.length > 0) {
      filtered = filtered.filter((smoothie) =>
        filters.flavorProfile.every((f_Profile) => smoothie.flavorProfile.includes(f_Profile))
      );
    }

    setFilteredSmoothies(filtered);
  };

  return (
    <SafeAreaView className="bg-black h-full pt-6 px-4">
      <FlatList
        data={filteredSmoothies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SmoothieCard
            flavor={item.flavor}
            price={item.price}
            ingredients={item.ingredients}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="mb-6">
              <Text className="text-xl font-psemibold text-blue-300 mb-4 ml-1">Smoothie flavors</Text>

              <SearchInput />

              <Filters onFilterChange={handleFilterChange} />
            </View>
          </>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      <StatusBar backgroundColor="black" style="light" />
    </SafeAreaView>
  );
}

export default Home;
