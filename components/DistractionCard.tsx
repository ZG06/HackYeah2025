import { Text, TouchableOpacity } from "react-native";


type Props = {
    label: string;
    icon: string;
    isSelected: boolean;
    onPress: () => void;
}

export default function DistractionCard({ label, icon, isSelected, onPress }: Props) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`items-center justify-center border-2 rounded-xl gap-y-2 p-4 ${isSelected ? 'border-orange-500 bg-orange-500/5' : 'border-gray-200'}`}
        >
            <Text className={`text-3xl ${isSelected ? '' : ''}`}>{icon}</Text>
            <Text className={`text-base font-semibold ${isSelected && 'text-orange-700'}`}>{label}</Text>
        </TouchableOpacity>
    );
}