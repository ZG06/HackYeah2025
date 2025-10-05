import TodayFocusTimeline from "@/components/TodayFocusTimeline";
import WeekAverageFocusChart from "@/components/WeekAverageFocusChart";
import { FocusEntry } from "@/types/FocusEntry";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";


export default function Dashboard() {
    const [todayEntries, setTodayEntries] = useState<FocusEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const calculateTopDistraction = () => {
        if (todayEntries.length === 0) return null;
    
        // Flatten all distractions and count occurrences
        const distractionCounts = todayEntries
            .flatMap(entry => entry.distractions || [])
            .reduce((acc, distraction) => {
                acc[distraction] = (acc[distraction] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);
    
        // Find the distraction with the highest count
        const [topDistraction, count] = Object.entries(distractionCounts).reduce(
            (top, [distraction, currentCount]) => 
                currentCount > top[1] ? [distraction, currentCount] : top,
            ['', 0]
        );
    
        return count > 0 ? { name: topDistraction, count } : null;
    };

    const createTodayTimelineData = () => {
        const data: { time: string; focus: number}[] = [];

        todayEntries.forEach(entry => {
            const date = new Date(entry.timestamp).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).toLowerCase();

            data.push({
                time: date,
                focus: entry.focusLevel,
            });
        });

        return data;
    }

    const createWeeklyData = () => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const today = new Date();
        const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
        
        // Calculate the most recent Monday
        const monday = new Date(today);
        monday.setDate(today.getDate() - ((currentDay + 6) % 7));
        
        // Create data for each day of the week (Monday to Sunday)
        const weeklyData = Array(7).fill(0).map((_, i) => {
            const currentDate = new Date(monday);
            currentDate.setDate(monday.getDate() + i);
            const dateString = currentDate.toISOString().split('T')[0];
            
            const dayEntries = todayEntries.filter(entry => 
                entry.timestamp.startsWith(dateString)
            );
            
            const avgFocus = dayEntries.length > 0
                ? dayEntries.reduce((sum, entry) => sum + entry.focusLevel, 0) / dayEntries.length
                : 0;
    
            return {
                day: days[i], // Use the day name from our array
                focus: parseFloat(avgFocus.toFixed(1))
            };
        });
    
        return weeklyData;
    };

    useFocusEffect(
        useCallback(() => {
        const loadTodayEntries = async () => {
            try {
                const today = new Date().toISOString().split('T')[0]; // Get YYYY-MM-DD
                const storedEntries = await AsyncStorage.getItem('@FocusTracker:entries');
                
                if (storedEntries) {
                    const allEntries: FocusEntry[] = JSON.parse(storedEntries);
                    const todayData = allEntries.filter(entry => 
                        entry.timestamp.startsWith(today)
                    );
                    setTodayEntries(todayData);
                }
            } catch (error) {
                console.error('Error loading entries:', error);
            } finally {
                setIsLoading(false);
            }
        };
    
        loadTodayEntries();
    }, []));

    const averageFocus = todayEntries.length > 0
    ? (todayEntries.reduce((sum, entry) => sum + entry.focusLevel, 0) / todayEntries.length).toFixed(1)
    : 'N/A';

    const totalFocusTime = todayEntries.length * 25;

    const topDistraction = calculateTopDistraction();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <ScrollView className="flex-1 p-6 bg-gray-100">
                {/* Header */}
                <View>
                    <Text className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 tracking-tight">Your Focus Dashboard</Text>
                    <Text className="text-slate-500 text-xl">Track your patterns and see your progress</Text>
                </View>

                <View
                    className="flex-row items-center justify-between bg-indigo-50 rounded-lg elevation-lg mt-8 p-8"
                >
                    <View>
                        <Text className="text-[15px] font-semibold text-slate-600 mb-3">
                            Today's Average
                        </Text>
                        <Text className="text-blue-700 text-6xl font-extrabold">
                            {averageFocus}
                        </Text>
                    </View>
                    <View className='items-center justify-center bg-white p-4 rounded-3xl elevation-md'>
                        <MaterialCommunityIcons name="chart-areaspline" size={28} color="#1d4ed8" />
                    </View>
                </View>

                <View
                    className="flex-row items-center justify-between bg-orange-100 rounded-lg elevation-lg mt-8 p-8"
                >
                    <View>
                        <Text className="text-[15px] font-semibold text-slate-600 mb-3">
                            Entries Today
                        </Text>
                        <Text className="text-orange-700 text-6xl font-extrabold">
                            {todayEntries.length}
                        </Text>
                    </View>
                    <View className='items-center justify-center bg-white p-4 rounded-3xl elevation-md'>
                        <MaterialCommunityIcons name="calendar-blank-outline" size={28} color="#c2410c" />
                    </View>
                </View>

                <View
                    className="flex-row items-center justify-between bg-red-100 rounded-lg elevation-lg mt-8 p-8"
                >
                    <View>
                        <Text className="text-[15px] font-semibold text-slate-600 mb-3">
                            Top Distraction
                        </Text>
                        <Text className="text-red-700 text-3xl font-extrabold">
                            {topDistraction?.name}
                        </Text>
                    </View>
                    <View className='items-center justify-center bg-white p-4 rounded-3xl elevation-md'>
                        <MaterialCommunityIcons name="alert-circle-outline" size={28} color="#c2410c" />
                    </View>
                </View>

                <View className="bg-white rounded-md elevation-md gap-y-6 mt-6 mb-6 p-6">
                    <Text className="text-2xl font-bold">
                        Today's Focus Timeline
                    </Text>
                    <View className="w-full h-[300px]">
                        <TodayFocusTimeline data={createTodayTimelineData()} />
                    </View>
                </View>

                <View className="bg-white rounded-md elevation-md gap-y-6 mt-3 mb-12 p-6">
                    <Text className="text-2xl font-bold">
                    Weekly Average Focus
                    </Text>
                    <View className="w-full h-[300px]">
                        <WeekAverageFocusChart data={createWeeklyData()} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}