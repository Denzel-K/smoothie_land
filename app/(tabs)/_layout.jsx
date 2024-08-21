import { View, Text, Image } from 'react-native';
import { Tabs, Redirect } from 'expo-router';

import HomeIcon from "@/assets/icons/home.svg";
import CartIcon from "@/assets/icons/cart-filled.svg";
import ProfileIcon from "@/assets/icons/profile.svg";

const TabIcon = ({IconComponent, color, name, focused}) => {
  return (
    <View className="flex items-center justify-center gap-1">
      <IconComponent width={24} height={24} fill={color} />
      <Text className={`text-gray-400 ${focused ? 'font-psemibold text-blue-300' : 'font-pregular'} text-xs`}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
   <>
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
   </>
  )
}

export default TabsLayout;


// const TabIcon = ({icon, color, name, focused}) => {
//   return (
//     <View className="flex items-center justify-center gap-1">
//       <Image 
//         source = {icon}
//         resizeMode='contain'
//         tintColor={color}
//         className="w-6 h-6"
//       />
//       <Text className={`text-drkGreen ${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}>
//         {name}
//       </Text>
//     </View>
//   )
// }

// const TabsLayout = () => {
//   return (
//    <>
//     <Tabs 
//       screenOptions = {{
//         tabBarActiveTintColor: "#009d38",
//         tabBarInactiveTintColor: "#002d00",
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           backgroundColor: "#f1edff",
//           borderTopWidth: 1,
//           // borderTopColor: "#232533",
//           height: 64,
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="home"
//         options={{
//           title: "Home",
//           headerShown: false,
//           tabBarIcon: ({ color, focused }) => (
//             <TabIcon
//               icon={icons.home}
//               color={color}
//               name="Home"
//               focused={focused}
//             />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="cart"
//         options={{
//           title: "Cart",
//           headerShown: false,
//           tabBarIcon: ({ color, focused }) => (
//             <TabIcon
//               icon={icons.cart}
//               color={color}
//               name="Cart"
//               focused={focused}
//             />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           headerShown: false,
//           tabBarIcon: ({ color, focused }) => (
//             <TabIcon
//               icon={icons.profile}
//               color={color}
//               name="Profile"
//               focused={focused}
//             />
//           ),
//         }}
//       />
//     </Tabs>
//    </>
//   )
// }

//export default TabsLayout;