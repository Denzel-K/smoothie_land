import { View, Text } from "react-native";

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-gray-400 text-center text-xl font-psemibold`}>
        {title}
      </Text>
      <Text className="text-sm text-gray-500 text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;