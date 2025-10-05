import { Text, View } from "react-native";
import { Bar, CartesianChart } from "victory-native";


const DATA = [
    { x: 1, y: 1, day: 'Mon' },
    { x: 2, y: 9, day: 'Tue' },
    { x: 3, y: 3, day: 'Wed' },
    { x: 4, y: 2, day: 'Thu' },
    { x: 5, y: 4, day: 'Fri' },
    { x: 6, y: 8, day: 'Sat' },
    { x: 7, y: 5, day: 'Sun' }
];


export default function WeekAverageFocusChart() {
    return (
        <View style={{ width: '100%', height: '100%'}}>
            <CartesianChart
                data={DATA}
                xKey="x"
                yKeys={["y"]}
                domainPadding={30}
            >
                {({ points, chartBounds }) => (
                    <>
                        <Bar
                            points={points.y}
                            chartBounds={chartBounds}
                            color="#6366f1"
                            roundedCorners={{ topLeft: 10, topRight: 10 }}
                        />
                    </>
                )}
            </CartesianChart>
            <View className="flex-row justify-between px-[15px]">
                {DATA.map(item => {
                    return (
                        <Text className="font-semibold text-slate-500">
                            {item.day}
                        </Text>
                    )
                })}
            </View>
        </View>
    )
}