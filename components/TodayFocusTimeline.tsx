import { Text, View } from "react-native";
import { CartesianChart, Line } from "victory-native";


export default function TodayFocusTimeline({ data }: { data: { time: string; focus: number}[] }) {
    return (
        <View style={{ width: '100%', height: '100%'}}>
            <CartesianChart
                data={data}
                xKey="time"
                yKeys={["focus"]}
                domainPadding={10}
            >
                {({ points }) => (
                    <Line
                        points={points.focus}
                        color="#6366f1"
                        strokeWidth={3}
                        animate={{ type: "timing", duration: 300 }}
                    />
                )}
            </CartesianChart>
            <View className="flex-row justify-between px-[15px]">
                {data.map(item => {
                    return (
                        <Text className="font-semibold text-slate-500">
                            {item.time}
                        </Text>
                    )
                })}
            </View>
        </View>
    )
}