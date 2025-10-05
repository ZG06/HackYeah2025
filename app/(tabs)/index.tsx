import TodayFocusTimeline from "@/components/TodayFocusTimeline";
import WeekAverageFocusChart from "@/components/WeekAverageFocusChart";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";


export default function Dashboard() {

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
                            7.5
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
                            2
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
                            Social Media
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
                        <TodayFocusTimeline />
                    </View>
                </View>

                <View className="bg-white rounded-md elevation-md gap-y-6 mt-3 mb-12 p-6">
                    <Text className="text-2xl font-bold">
                    Weekly Average Focus
                    </Text>
                    <View className="w-full h-[300px]">
                        <WeekAverageFocusChart />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}