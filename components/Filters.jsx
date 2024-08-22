import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';

import Filter from "@/assets/icons/filter.svg";

//Reusable filter button
const FilterButton = ({ title, btnStyles, onPress, isActive }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`flex items-center justify-center align-middle border-[1.5px] rounded-3xl px-[12px] py-[3px] mr-2 ${
        isActive ? 'bg-blue-500 border-blue-500' : 'bg-gray-800 border-blue-400'
      } ${btnStyles}`}
      onPress={onPress}
    >
      <Text className="text-xs text-gray-300">{title}</Text>
    </TouchableOpacity>
  );
}

const Filters = ({ onFilterChange }) => {
  const [inactive, setInactive] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    mainIngredient: null,
    nutritionalContent: [],
    flavorProfile: [],
    benefits: []
  });

  function handleShowFilters() {
    setInactive(!inactive);
  }

  const handleFilterSelect = (type, value) => {
    setSelectedFilters((prev) => {
      let updatedFilters = { ...prev };

      if (type === 'mainIngredient') {
        updatedFilters.mainIngredient = value === prev.mainIngredient ? null : value;
      } 
      else {
        const isSelected = prev[type].includes(value);
        updatedFilters[type] = isSelected
          ? prev[type].filter((item) => item !== value)
          : [...prev[type], value];
      }

      onFilterChange(updatedFilters);

      return updatedFilters;
    });
  };

  return (
    <View className="flex flex-col align-middle justify-center items-center mt-4 bg-gray-900 p-2 rounded-xl">
      <View className="w-full flex flex-row align-middle justify-between items-center">
        <Text className="text-base font-psemibold text-blue-400">Filters</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-[28px] h-[28px] flex items-center justify-center align-middle bg-price rounded-lg"
          onPress={handleShowFilters}
        >
          <Filter width={18} height={18}/>
        </TouchableOpacity>
      </View>

      {!inactive && (
        <View className="flex w-full mt-2">

          {/* Main Ingredient Filter */}
          <View className="w-full flex flex-col mt-4">
            <Text className="text-xs text-primary font-pregular text-left w-full mb-1">Main Ingredient</Text>
            <FlatList
              data={['Fruit', 'Vegetable']}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <FilterButton
                  title={item}
                  isActive={selectedFilters.mainIngredient === item}
                  onPress={() => handleFilterSelect('mainIngredient', item)}
                />
              )}
            />
          </View>

          {/* Nutritional Content Filter */}
          <View className="w-full flex flex-col mt-4">
            <Text className="text-xs text-primary font-pregular text-left w-full mb-1">Nutritional Content</Text>
            <FlatList
              data={['Low-Calorie', 'High-Fiber', 'Antioxidant-Rich', 'Healthy Fats']}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <FilterButton
                  title={item}
                  isActive={selectedFilters.nutritionalContent.includes(item)}
                  onPress={() => handleFilterSelect('nutritionalContent', item)}
                />
              )}
            />
          </View>

          {/* Benefits Filter */}
          <View className="w-full flex flex-col mt-4">
            <Text className="text-xs text-primary font-pregular text-left w-full mb-1">Benefits</Text>
            <FlatList
              data={['Energy-Boosting', 'Immune-Boosting', 'Detoxifying']}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <FilterButton
                  title={item}
                  isActive={selectedFilters.benefits.includes(item)}
                  onPress={() => handleFilterSelect('benefits', item)}
                />
              )}
            />
          </View>

          {/* flavorProfile Filter */}
          <View className="w-full flex flex-col mt-4">
            <Text className="text-xs text-primary font-pregular text-left w-full mb-1">Flavor Profile</Text>
            <FlatList
              data={["Sweet", "Tangy", "Savory", "Nutty", "Fresh", "Spiced", "Earthy", "Herbal", "Spicy"]}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <FilterButton
                  title={item}
                  isActive={selectedFilters.flavorProfile.includes(item)}
                  onPress={() => handleFilterSelect('flavorProfile', item)}
                />
              )}
            />
          </View>
        </View>
      )}
    </View>
  )
}

export default Filters;
