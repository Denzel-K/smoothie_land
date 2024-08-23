import { View, Text, Image } from 'react-native';
import { Tabs, Redirect } from 'expo-router';

import HomeIcon from "@/assets/icons/home.svg";
import CartIcon from "@/assets/icons/cart-filled.svg";
import ProfileIcon from "@/assets/icons/profile.svg";

import { CartProvider } from '@/context/CartProvider';

const TabIcon = ({IconComponent, color, name, focused}) => {
  return (
    <View className="flex items-center justify-center gap-1">
      <IconComponent width={24} height={24} fill={color} />
      <Text className={`text-gray-500 ${focused ? 'font-psemibold text-blue-400' : 'font-pregular'} text-xs`}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
   <CartProvider>
    <Tabs 
      screenOptions = {{
        tabBarActiveTintColor: "#009d38",
        tabBarInactiveTintColor: "#002d00",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 64,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              IconComponent={HomeIcon}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              IconComponent={CartIcon}
              color={color}
              name="Cart"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              IconComponent={ProfileIcon}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
   </CartProvider>
  )
}

export default TabsLayout;