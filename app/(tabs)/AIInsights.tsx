import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function AIInsights() {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <ScrollView className="flex-1 p-6 bg-gray-100">
                {/* Header */}
                <View className="mb-6">
                    <View className="flex-row gap-x-3">
                        <MaterialCommunityIcons name="star-four-points-outline" size={38} color="#9333ea" />
                        <Text className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 tracking-tight">AI Insights</Text>
                    </View>
                    <Text className="text-slate-500 text-xl">Your personalized focus coach powered by AI</Text>
                </View>

                <View className="items-center justify-center bg-white rounded-md elevation-md gap-y-6 p-12">
                    <View className="items-center justify-center rounded-3xl bg-purple-500 p-4">
                        <MaterialCommunityIcons name="star-four-points-outline" size={48} color="white" />
                    </View>
                    <Text className="text-3xl font-bold text-slate-900">
                        Ready for AI Analysis
                    </Text>
                    <Text numberOfLines={3} className="text-center text-slate-600 text-xl mb-8">
                        You have 15 focus entries. Generate personalized insights and recommendations now.
                    </Text>
                    <TouchableOpacity
                        className="w-full flex-row items-center justify-center bg-purple-500 elevation-md gap-x-4 p-4 rounded-md"
                    >
                        <MaterialCommunityIcons name="star-four-points-outline" size={18} color="white" />
                        <Text className="text-white font-semibold text-xl">
                            Generate AI Insights
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}