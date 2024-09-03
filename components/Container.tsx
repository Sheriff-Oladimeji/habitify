import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const Container = ({children}: {children: React.ReactNode}) => {
  return (
    <View className="flex-1 bg-black items-center justify-center">
          <SafeAreaView>
              {children}
      </SafeAreaView>
    </View>
  );
}

export default Container