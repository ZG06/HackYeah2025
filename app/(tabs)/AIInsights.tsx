
import { generateInsights } from "@/lib/huggingface";
import { FocusEntry } from "@/types/FocusEntry";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function AIInsights() {
    const [todayEntries, setTodayEntries] = useState<FocusEntry[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [insights, setInsights] = useState(null);

    const handleGenerateInsights = async () => {
        if (todayEntries.length === 0) {
          return;
        }
      
        try {
          setIsLoading(true);
          const result = await generateInsights(todayEntries);
      
          setInsights({
            summary: result.summary || "No summary available",
            peak_focus_time: result.peak_performance?.time_window || "Not enough data",
            top_distraction: result.distraction_analysis?.top_distraction || "No distractions logged",
            focus_trend: result.trend_analysis?.current_trend || "stable",
            recommendations: [
              ...(result.personalized_recommendations || []),
              ...(result.trend_analysis?.suggested_actions || [])
            ].slice(0, 5)
          });
        } catch (error) {
          console.error("Error generating insights:", error);
          setInsights(null);
        } finally {
          setIsLoading(false);
        }
    };
      

    useEffect(() => {
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
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <ScrollView className="flex-1 p-6 bg-gray-100">
                {/* Header */}
                <View className="mb-8">
                    <View className="flex-row gap-x-3">
                        <MaterialCommunityIcons name="star-four-points-outline" size={38} color="#9333ea" />
                        <Text className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 tracking-tight">AI Insights</Text>
                    </View>
                    <Text className="text-slate-500 text-xl">Your personalized focus coach powered by AI</Text>
                </View>
                {insights ? (
                    <View className="gap-y-6">
                        {/* Summary Card */}
                        <View className="p-6 rounded-xl elevation-sm bg-green-100">
                            <Text className="text-lg font-semibold mb-3">Summary</Text>
                            <Text className="text-gray-800 text-lg">Mixed focus sessions with reading showing the highest focus levels, while studying had the lowest.</Text>
                        </View>

                        <View className="px-2">
                            <View className="p-4 rounded-xl  elevation-sm bg-indigo-100">
                                <Text className="text-lg font-semibold mb-3">Peak Focus Time</Text>
                                <Text className="text-gray-800 text-lg">Stable</Text>
                            </View>
                        </View>
                        <View className="px-2">
                            <View className="p-4 rounded-xl elevation-sm bg-orange-100">
                                <Text className="text-lg font-semibold mb-3">Top Distraction</Text>
                                <Text className="text-gray-800 text-lg">
                                Explore potential distractions during studying to improve focus
                                </Text>
                            </View>
                        </View>

                        {/* Recommendations */}
                        <View className="p-6 rounded-xl elevation-sm bg-green-100 mb-12">
                            <Text className="text-lg font-semibold mb-3">Recommendations</Text>
                            <View className="gap-y-3">
                                {insights.recommendations.map((rec, index) => (
                                    <View key={index} className="flex-row items-start">
                                        <Text className="text-gray-800 text-lg">{rec}</Text>
                                    </View>
                                    ))}
                            </View>
                        </View>
                    </View>
                 ) : (
                    <View className="items-center justify-center bg-white rounded-md elevation-md gap-y-6 p-12">
                        <View className="items-center justify-center rounded-3xl bg-purple-500 p-4">
                            <MaterialCommunityIcons name="star-four-points-outline" size={48} color="white" />
                        </View>
                        <Text className="text-3xl font-bold text-slate-900">
                            Ready for AI Analysis
                        </Text>
                        <Text numberOfLines={3} className="text-center text-slate-600 text-xl mb-8">
                            You have {todayEntries.length} focus entries. Generate personalized insights and recommendations now.
                        </Text>
                        <TouchableOpacity
                            className={`w-full flex-row items-center justify-center bg-purple-500 elevation-md gap-x-4 p-4 rounded-md ${isLoading && 'opacity-50'}`}
                            disabled={isLoading}
                            onPress={handleGenerateInsights}
                        >
                            <MaterialCommunityIcons name="star-four-points-outline" size={18} color="white" />
                            {isLoading ? (
                                <Text className="text-white font-semibold text-xl">
                                    Generating...
                                </Text>
                            ) : (
                                <Text className="text-white font-semibold text-xl">
                                    Generate AI Insights
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}