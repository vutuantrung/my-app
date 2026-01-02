import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Image } from 'react-native';
import ActressScreen from './screens/ActressScreen';
import ActressFilmScreen from './screens/ActressFilmScreen';
import ActressDetailScreen from './screens/ActressDetailScreen';
import ScenesLightboxScreen from './screens/ScenesLightboxScreen';
import CoserScreen from './screens/CoserScreen';
import CoserDetailScreen from './screens/CoserDetailScreen';
import DashboardScreen from './screens/DashboardScreen';
import FilmScreen from './screens/FilmScreen';
import FilmDetailScreen from './screens/FilmDetailScreen';
import FilmSceneViewerScreen from './screens/FilmSceneViewerScreen';
import ActressDetailJJGirlScreen from './screens/ActressDetailJJGirlScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import { NotificationProvider } from './contexts/NotificationContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

function Tabs() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: { backgroundColor: '#151922' },
				tabBarActiveTintColor: '#5b9cff',
				tabBarInactiveTintColor: '#9aa4b2',
			}}
		>
			<Tab.Screen name="Dashboard" component={DashboardScreen} options={{
				tabBarIcon: ({ size, focused, color }) => {
					return (
						<Icon
							name={focused ? 'view-dashboard' : 'view-dashboard-outline'}
							size={size}
							color={color}
						/>
					);
				}
			}} />
			<Tab.Screen name="Actress" component={ActressScreen} options={{
				tabBarIcon: ({ size, focused, color }) => {
					return (
						<Icon
							name='human-female'
							size={size}
							color={color}
						/>
					);
				}
			}} />
			<Tab.Screen name="Film" component={FilmScreen} options={{
				tabBarIcon: ({ size, focused, color }) => {
					return (
						<Icon
							name='film'
							size={size}
							color={color}
						/>
					);
				}
			}} />
			<Tab.Screen name="Coser" component={CoserScreen} options={{
				tabBarIcon: ({ size, focused, color }) => {
					return (
						<Icon
							name={focused ? 'diamond' : 'diamond-outline'}
							size={size}
							color={color}
						/>
					);
				}
			}} />
		</Tab.Navigator>
	);
}

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			{/* Wrap everything with NotificationProvider so all screens can use useNotifications() */}
			<NotificationProvider>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							name="Root"
							component={Tabs}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="FilmDetail"
							component={FilmDetailScreen}
							options={{
								title: 'Film',
								headerStyle: { backgroundColor: '#0f1115' },
								headerTintColor: '#e7ecf3',
							}}
						/>
						<Stack.Screen
							name="ScenesLightbox"
							component={ScenesLightboxScreen}
							options={{ headerShown: false, presentation: 'transparentModal' }}
						/>
						<Stack.Screen
							name="ActressDetail"
							component={ActressDetailScreen}
							options={{
								title: 'Actress',
								headerStyle: { backgroundColor: '#0f1115' },
								headerTintColor: '#e7ecf3',
							}}
						/>
						<Stack.Screen
							name="ActressFilm"
							component={ActressFilmScreen}
							options={{
								title: 'Actress • Films',
								headerStyle: { backgroundColor: '#0f1115' },
								headerTintColor: '#e7ecf3',
							}}
						/>
						<Stack.Screen
							name="FilmSceneViewer"
							component={FilmSceneViewerScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="ActressDetailJJGirl"
							component={ActressDetailJJGirlScreen}
							options={{
								title: 'JJGirl Gallery',
								headerStyle: { backgroundColor: '#0f1115' },
								headerTintColor: '#e7ecf3',
							}}
						/>
						<Stack.Screen
							name="Notifications"
							component={NotificationsScreen}
							options={{
								title: 'Notifications',
								headerStyle: { backgroundColor: '#0f1115' },
								headerTintColor: '#e7ecf3',
							}}
						/>
						<Stack.Screen
							name="CoserDetail"
							component={CoserDetailScreen}
							options={{
								title: 'Coser',
								headerStyle: { backgroundColor: '#0f1115' },
								headerTintColor: '#e7ecf3',
							}}
						/>

					</Stack.Navigator>
				</NavigationContainer>
			</NotificationProvider>
		</QueryClientProvider>
	);
}
