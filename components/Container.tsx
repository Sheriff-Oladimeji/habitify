import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const Container = ({children}: {children: React.ReactNode}) => {
  return (
    <View className="flex-1 bg-[#111827] ">
      <SafeAreaView className='mt-8'>{children}</SafeAreaView>
    </View>
  );
}

export default Container