import { create } from 'zustand';
import { getItem, storeItem } from '../utils/storage';
import { startOfDay } from 'date-fns';

export type RepeatFrequency = 'daily' | 'weekly' | 'monthly';
export type TimeOfDay = 'anytime' | 'morning' | 'afternoon' | 'evening';

interface Habit {
  id: string;
  name: string;
  type: 'build' | 'quit';
  startDate: string;
  createdAt: string;
  repeatFrequency: RepeatFrequency;
  timeOfDay: TimeOfDay;
  reminderTime: string;
  endDate: string | null;
}

interface HabitStore {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt'>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  loadHabits: () => Promise<void>;
  getHabitsForDate: (date: Date) => Habit[];
}

const useHabitStore = create<HabitStore>((set, get) => ({
  habits: [],
  addHabit: async (habit) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updatedHabits = [...get().habits, newHabit];
    await storeItem('habits', JSON.stringify(updatedHabits));
    set({ habits: updatedHabits });
  },
  deleteHabit: async (id: string) => {
    const updatedHabits = get().habits.filter(habit => habit.id !== id);
    await storeItem('habits', JSON.stringify(updatedHabits));
    set({ habits: updatedHabits });
  },
  loadHabits: async () => {
    const storedHabits = await getItem('habits');
    if (storedHabits) {
      const parsedHabits = JSON.parse(storedHabits);
      set({ habits: parsedHabits });
    }
  },
  getHabitsForDate: (date: Date) => {
    const startOfDayDate = startOfDay(date);
    return get().habits.filter(habit => {
      const habitStartDate = startOfDay(new Date(habit.startDate));
      return habitStartDate <= startOfDayDate;
    });
  },
}));

export default useHabitStore;
