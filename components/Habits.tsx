import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import useHabitStore from "../store/useHabitStore";
import { Feather } from "@expo/vector-icons";
import DeleteHabitButton from './DeleteHabitButton';

interface Habit {
  id: string;
  name: string;
  type: 'build' | 'quit';
  createdAt: string;
}

const Habits = () => {
  const { habits, loadHabits } = useHabitStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHabits = async () => {
      await loadHabits();
      setIsLoading(false);
    };
    fetchHabits();
  }, []);

  const renderHabitItem = ({ item }: { item: Habit }) => (
    <View className="bg-gray-800 rounded-lg p-4 mb-3 flex-row items-center">
      <View
        className={`w-2 h-12 rounded-full mr-4 ${
          item.type === "build" ? "bg-green-500" : "bg-red-500"
        }`}
      />
      <View className="flex-1">
        <Text className="text-white font-bold text-lg mb-1">{item.name}</Text>
        <Text className="text-gray-400 text-sm">
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <View
        className={`px-2 py-1 rounded mr-2 ${
          item.type === "build" ? "bg-green-700" : "bg-red-700"
        }`}
      >
        <Text className="text-white text-xs font-semibold uppercase">
          {item.type}
        </Text>
      </View>
      <DeleteHabitButton habitId={item.id} />
    </View>
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-lg">Loading habits...</Text>
      </View>
    );
  }

  if (habits.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Feather name="inbox" size={64} color="#4B5563" />
        <Text className="text-gray-500 text-lg mt-4 text-center">
          No habits added yet.{"\n"}Start by adding a new habit!
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Text className="text-white text-2xl font-bold mt-6 mb-4">My Habits</Text>
      {habits.map((item) => (
        <View key={item.id}>{renderHabitItem({ item })}</View>
      ))}
    </View>
  );
};

export default Habits;
