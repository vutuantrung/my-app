import React from 'react';
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	SafeAreaView,
} from 'react-native';
import { useNotifications } from '../contexts/NotificationContext';

function NotificationsScreen() {
	const { notifications, markAllAsRead, markAsRead } = useNotifications();

	const renderItem = ({ item }) => (
		<TouchableOpacity
			style={{
				paddingHorizontal: 16,
				paddingVertical: 10,
				backgroundColor: item.read ? 'white' : '#f7f9ff',
			}}
			onPress={() => {
				markAsRead(item.id);
				// TODO: deep-link to movie/actress based on item.data if you want
			}}
		>
			<Text style={{ fontSize: 15, fontWeight: '600' }}>{item.title}</Text>
			<Text style={{ fontSize: 13, color: '#666', marginTop: 2 }}>
				{item.message}
			</Text>
			<Text style={{ fontSize: 11, color: '#999', marginTop: 4 }}>
				{new Date(item.createdAt).toLocaleString()}
			</Text>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View
				style={{
					paddingHorizontal: 16,
					paddingVertical: 12,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Text style={{ fontSize: 18, fontWeight: '700' }}>Notifications</Text>
				{notifications.length > 0 && (
					<TouchableOpacity onPress={markAllAsRead}>
						<Text style={{ fontSize: 13, color: '#007AFF' }}>
							Mark all read
						</Text>
					</TouchableOpacity>
				)}
			</View>

			<FlatList
				data={notifications}
				keyExtractor={(item) => item.id}
				ItemSeparatorComponent={() => (
					<View style={{ height: 1, backgroundColor: '#eee' }} />
				)}
				renderItem={renderItem}
			/>
		</SafeAreaView>
	);
}

export default NotificationsScreen;
