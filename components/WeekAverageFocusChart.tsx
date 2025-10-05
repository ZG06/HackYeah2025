import { Text, View } from "react-native";
import { Bar, CartesianChart } from "victory-native";


export default function WeekAverageFocusChart({ data }: { data: { day: string; focus: number;}[] }) {
    return (
        <View style={{ width: '100%', height: '100%'}}>
            <CartesianChart
                data={data}
                xKey="day"
                yKeys={["focus"]}
                domainPadding={30}
            >
                {({ points, chartBounds }) => (
                    <>
                        <Bar
                            points={points.focus}
                            chartBounds={chartBounds}
                            color="#6366f1"
                            roundedCorners={{ topLeft: 10, topRight: 10 }}
                        />
                    </>
                )}
            </CartesianChart>
            <View className="flex-row justify-between px-[15px]">
                {data.map(item => {
                    return (
                        <Text
                            key={item.day}
                            className="font-semibold text-slate-500"
                        >
                            {item.day}
                        </Text>
                    )
                })}
            </View>
        </View>
    )
}