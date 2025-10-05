import DistractionCard from "@/components/DistractionCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from '@react-native-community/slider';
import { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";


const DISTRACTION_OPTIONS = [
    { label: "Social Media", icon: "📱" },
    { label: "Meetings", icon: "👥" },
    { label: "Noise", icon: "🔊" },
    { label: "Email", icon: "📧" },
    { label: "Phone Calls", icon: "☎️" },
    { label: "Interruptions", icon: "🚪" },
    { label: "Tiredness", icon: "😴" },
    { label: "Multitasking", icon: "⚡" },
    { label: "Other", icon: "❓" }
];

export default function LogFocus() {
    const [focusLevel, setFocusLevel] = useState(5);
    const [activity, setActivity] = useState('');
    const [distractions, setDistractions] = useState<number[]>([]);

    const getFocusLevelText = () => {
        if (focusLevel <= 3) return 'Highly Distracted'
        if (focusLevel >= 4 && focusLevel <= 6) return 'Moderate Focus'
        if (focusLevel >= 7 && focusLevel <= 8) return 'Good Focus'
        return 'Deep Focus'
    }

    const getFocusLevelColor = (type: 'bg' | 'text' | 'rgb') => {
        if (focusLevel <= 3) return type === 'bg' ? 'bg-red-500' : type === 'text' ? 'text-red-500' : '#ef4444'
        if (focusLevel >= 4 && focusLevel <= 6) return type === 'bg' ? 'bg-orange-500' : type === 'text' ? 'text-orange-500' : '#f59e0b'
        if (focusLevel >= 7 && focusLevel <= 8) return type === 'bg' ? 'bg-green-500' : type === 'text' ? 'text-green-500' : '#10b981'
        return type === 'bg' ? 'bg-emerald-500' : type === 'text' ? 'text-emerald-500' : '#059669'
    }

    const toggleDistraction = (index: number) => {
        setDistractions(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const StepMarker = (value: number) => {
        return (
            <Text className="text-center text-slate-700 font-light text-sm mt-6">
                {value}
            </Text>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >

            <ScrollView className="flex-1 bg-gray-100">
                {/* Header */}
                <View className="p-6">
                    <Text className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 tracking-tight">How's Your Focus?</Text>
                    <Text className="text-slate-500 text-xl">Take a moment to check in with yourself</Text>
                </View>

                {/* Body */}
                <View className="p-6 m-6 bg-white">
                    
                    <View className="flex-row items-center gap-x-2">
                        <MaterialCommunityIcons name="lightning-bolt-outline" size={34} color="blue" />
                        <Text className="font-bold text-3xl">Focus Level</Text>
                    </View>
                    
                    {/* Focus level */}
                    <View className="flex-row items-center justify-between my-6">
                        <View className="flex-row items-center gap-x-2">
                            <Text className={`text-7xl font-bold ${getFocusLevelColor('text')}`}>
                                {focusLevel}
                            </Text>
                            <Text className="text-2xl text-slate-400 font-light">
                                /10
                            </Text>
                        </View>

                        <TouchableOpacity
                            className={`${getFocusLevelColor('bg')} px-4 py-2.5 rounded-full`}
                        >
                            <Text className="text-white font-semibold">
                                {getFocusLevelText()}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Focus level slider */}
                    <Slider
                        style={{width: '100%', }}
                        minimumValue={1}
                        maximumValue={10}
                        step={1}
                        minimumTrackTintColor={getFocusLevelColor('rgb')}
                        maximumTrackTintColor="#e2e8f0"
                        thumbTintColor={getFocusLevelColor('rgb')}
                        StepMarker={(props) => StepMarker(props.index)}
                        value={focusLevel}
                        onValueChange={(value) => setFocusLevel(Math.round(value))}
                    />

                    {/* Input field where user enters what they're working on */}
                    <View className="gap-y-4 mt-14">
                        <Text className="text-lg font-semibold text-slate-900">What are you working on?</Text>
                        <TextInput
                            placeholder="e.g., Project presentation, coding, reading..."
                            value={activity}
                            onChangeText={setActivity}
                            className="text-base border border-slate-300 focus:border-indigo-400 rounded-md transition-colors"
                            placeholderClassName="p-4"
                        />
                    </View>

                    {/* Flatlist with distracting things */}
                    <View className="gap-y-4 mt-6">
                        <Text className="text-lg font-semibold text-slate-900">What's distracting you?</Text>
                        <FlatList
                            keyExtractor={(item) => item.label}
                            data={DISTRACTION_OPTIONS}
                            numColumns={2}
                            scrollEnabled={false}
                            columnWrapperStyle={{
                                gap: 12,
                                paddingHorizontal: 4,
                                marginBottom: 12
                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <View className="flex-1">
                                        <DistractionCard
                                            label={item.label}
                                            icon={item.icon}
                                            isSelected={distractions.includes(index)}
                                            onPress={() => toggleDistraction(index)}
                                        />
                                    </View>
                                )
                            }}
                        />
                    </View>

                    {/* Input field where user enters additional information about their activities and distractions*/}
                    <View className="gap-y-4 mt-6">
                        <Text className="text-lg font-semibold text-slate-900">Notes (optional)</Text>
                        <TextInput
                            multiline={true}
                            maxLength={100}
                            placeholder="Any additional thoughts or context..."
                            value={activity}
                            onChangeText={setActivity}
                            className="h-24 text-base border border-slate-300 focus:border-indigo-400 rounded-md transition-colors"
                            placeholderClassName="p-4"
                        />
                    </View>

                    <TouchableOpacity
                        className="items-center justify-center h-16 mt-8 bg-purple-600 rounded-lg"
                    >
                        <Text className="text-white font-bold text-xl">
                            Log Focus Entry
                        </Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}