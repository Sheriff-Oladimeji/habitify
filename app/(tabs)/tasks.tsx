import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const Tasks = () => {
  return (
    <View>
      <SafeAreaView style={{margin: 50}}>
        <Text className="text-white bg-blue-500">tasks</Text>
      </SafeAreaView>
    </View>
  );
}

export default Tasks