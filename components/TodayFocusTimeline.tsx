import { View } from "react-native";
import { CartesianChart, Line } from "victory-native";

const DATA = [
    { x: 1, y: 1 },
    { x: 2, y: 9 },
    { x: 3, y: 3 },
    { x: 4, y: 2 },
    { x: 5, y: 4 },
    { x: 6, y: 8 },
    { x: 7, y: 5 },
    { x: 8, y: 6 },
    { x: 9, y: 10 },
    { x: 10, y: 7 },
]


export default function TodayFocusTimeline() {
    return (
        <View style={{ width: '100%', height: '100%'}}>
            <CartesianChart
                data={DATA}
                xKey="x"
                yKeys={["y"]}
                domainPadding={10}
            >
                {({ points }) => (
                    <Line
                        points={points.y}
                        color="#6366f1"
                        strokeWidth={3}
                        animate={{ type: "timing", duration: 300 }}
                        curveType="natural"
                    />
                )}
            </CartesianChart>
        </View>
    )
}