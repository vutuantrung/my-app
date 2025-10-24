
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ActressScreen from './screens/ActressScreen';
import ActressFilmScreen from './screens/ActressFilmScreen';
import ActressDetailScreen from './screens/ActressDetailScreen';
import ScenesLightboxScreen from './screens/ScenesLightboxScreen';
import DashboardScreen from './screens/DashboardScreen';
import FilmScreen from './screens/FilmScreen';
import FilmDetailScreen from './screens/FilmDetailScreen';

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
			<Tab.Screen name="Dashboard" component={DashboardScreen} />
			<Tab.Screen name="Actress" component={ActressScreen} />
			<Tab.Screen name="Film" component={FilmScreen} />
		</Tab.Navigator>
	);
}

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Root" component={Tabs} options={{ headerShown: false }} />
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
						options={{ title: 'Actress', headerStyle: { backgroundColor: '#0f1115' }, headerTintColor: '#e7ecf3' }}
					/>
					<Stack.Screen
						name="ActressFilm"
						component={ActressFilmScreen}
						options={{ title: 'Actress • Films', headerStyle: { backgroundColor: '#0f1115' }, headerTintColor: '#e7ecf3' }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</QueryClientProvider>
	);
}
