import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, TouchableOpacity, View } from 'react-native';


const Drawer = createDrawerNavigator();

function CustomDrawerContent({ state, navigation }: { state: any, navigation: any }) {
    const menuItems = [
        { label: 'Log Focus', icon: 'plus', route: 'LogFocus' },
        { label: 'Dashboard', icon: 'chart-bar', route: 'index' },
        { label: 'AI Insights', icon: 'star-four-points', route: 'AIInsights' },
    ];

    const activeRoute = state.routes[state.index].name;

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className='flex-row border-b border-gray-200 items-center p-4 gap-x-4'>
                <View className='bg-purple-600 p-3 rounded-[18px]'>
                    <MaterialCommunityIcons name="chart-areaspline" size={22} color="white" />
                </View>
                <View>
                    <Text className="font-bold text-slate-900 text-2xl tracking-tight">FocusFlow</Text>
                    <Text className="text-sm text-slate-500">Your AI Focus Coach</Text>
                </View>
            </View>
  
            {/* Menu Items */}
            <View className="flex-1 p-4">
                {menuItems.map((item, index) => {
                    const isActive = activeRoute === item.route;

                    return (
                        <TouchableOpacity
                            key={item.label}
                            onPress={() => {
                                navigation.navigate(item.route);
                                navigation.closeDrawer();
                            }}
                            className={`flex-row items-center p-3 rounded-lg mb-2 gap-x-4 ${isActive ? 'bg-purple-600' : ''}`}
                        >
                            <MaterialCommunityIcons
                                name={item.icon}
                                size={18}
                                color={`${isActive ? 'white' : '#6b7280'}`}
                            />
                            <Text className={`text-slate-900 font-semibold text-lg ${isActive ? 'text-white' : 'text-gray-700'}`}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
  
            {/* Footer */}
            <View className="items-center justify-center p-4 border-t border-gray-100">
                <Text className="text-slate-500">
                    Track. Analyze. Improve
                </Text>
            </View>
        </View>
    );
}

export default function DrawerLayout() {
  return (
    <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation }) => ({
            headerShown: true,
            headerTintColor: '#0f172a',
            drawerActiveTintColor: '#0f172a',
            drawerInactiveTintColor: '#0f172a',
            drawerStyle: {
                backgroundColor: '#ffffff',
                width: '80%',
            },
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => navigation.toggleDrawer()}
                    style={{ marginLeft: 20 }}
                >
                    <MaterialCommunityIcons name="menu" size={28} color="#0f172a" />
                </TouchableOpacity>
            ),
            headerTitleStyle: {
                marginLeft: 20,
                fontSize: 24,
                fontWeight: '900',
            }
        })}
    >
        <Drawer.Screen 
            name="LogFocus" 
            options={{ 
                title: 'FocusFlow',
                drawerIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="plus-circle" size={size} color={color} />
                )
            }}
            component={require('./LogFocus').default}
        />
        <Drawer.Screen 
            name="index" 
            options={{ 
                title: 'FocusFlow',
                drawerIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="view-dashboard" size={size} color={color} />
                )
            }}
            component={require('./index').default}
        />
        
        <Drawer.Screen 
            name="AIInsights" 
            options={{ 
                title: 'FocusFlow',
                drawerIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="robot" size={size} color={color} />
                )
            }}
            component={require('./AIInsights').default}
        />
    </Drawer.Navigator>
  );
}