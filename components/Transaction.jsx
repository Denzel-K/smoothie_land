import { View, Text, TouchableOpacity } from 'react-native';

import DropDown from '@/assets/icons/arrow-down.svg';
import ArrowUp from '@/assets/icons/arrow-up.svg';
import { useState } from 'react';

const Transaction = ({ date, items, total, status }) => {
  const [inactive, setInactive] = useState(true);

  return (
    <View className="w-full flex flex-col align-middle justify-start rounded-xl bg-gray-900 mt-2 py-2 px-2">
      <View  className="w-full flex flex-row align-middle justify-between items-center mt-2">
        <View className="flex flex-row align-middle justify-start items-center">
          <TouchableOpacity
            activeOpacity={0.7}
            className={`flex align-middle justify-center items-center w-[26px] h-[26px] rounded-full mt-[-4px] ${!inactive ? `bg-minus`: `bg-btnAdd`}`}
            onPress={() => {
              setInactive(!inactive);
            }}
          >
            {inactive ? (
              <DropDown width={22} height={22} />
            ):(
              <ArrowUp width={22} height={22} />
            )}
          </TouchableOpacity>
          <Text className="text-sm font-psemibold text-gray-400 ml-2">{new Date(date).toLocaleString()}</Text>
        </View>
        <Text className="text-sm font-pbold text-slate-300">${total}</Text>
      </View>

      {!inactive && (
        <View className="mt-4 px-2 bg-gray-950 rounded-xl py-2">
          {items.map((item, index) => (
            <View key={index} className="flex flex-row align-middle justify-between items-center">
              <Text className="text-sm font-pregular text-gray-500 ml-2">{item.flavor}</Text>
              <Text className="text-sm font-psemibold text-gray-400">${item.price}</Text>
            </View>
          ))}

          <View className="flex flex-row align-middle justify-between items-center border-t-2 border-gray-900 mt-1 pt-2">
            <Text className="text-sm font-psemibold text-blue-300">Status</Text>
            <Text className="text-sm font-psemibold text-yellow-600">{status}</Text>
          </View>
        </View>
      )}

    </View>
  )
}

export default Transaction;