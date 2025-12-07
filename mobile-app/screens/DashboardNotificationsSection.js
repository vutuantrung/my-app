import { View, Text, TouchableOpacity } from 'react-native';
import { useNotifications } from '../contexts/NotificationContext';
import { useNavigation } from '@react-navigation/native';

const MAX_DASHBOARD_NOTIFS = 3;

function DashboardNotificationsSection() {
	const { notifications, unreadCount } = useNotifications();
	const navigation = useNavigation();

	const latest = notifications.slice(0, MAX_DASHBOARD_NOTIFS);

	if (notifications.length === 0) {
		return null;
	}

	return (
		<View
			style={{
				marginHorizontal: 16,
				marginTop: 16,
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: 8,
				}}
			>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>New Updates</Text>
					{unreadCount > 0 && (
						<View
							style={{
								marginLeft: 8,
								paddingHorizontal: 6,
								paddingVertical: 2,
								borderRadius: 10,
								backgroundColor: 'red',
							}}
						>
							<Text style={{ color: 'white', fontSize: 12 }}>{unreadCount}</Text>
						</View>
					)}
				</View>

				<TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
					<Text style={{ fontSize: 13, color: '#007AFF' }}>View all</Text>
				</TouchableOpacity>
			</View>

			{/* ✅ No FlatList here – just render a few items directly */}
			{latest.map((item) => (
				<View key={item.id} style={{ marginLeft: 10 }}>
					<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
						<Text style={{ fontSize: 14, fontWeight: '500', color: 'white' }}>{item.title}</Text>
						<Text style={{ fontSize: 14, fontWeight: '500', color: '#5b5b5bff' }}>{new Date(item.createdAt).toLocaleString()}</Text>
					</View>
					{/* <Text style={{ fontSize: 12, color: '#666' }} numberOfLines={2}>
						{item.message}
					</Text> */}
				</View>
			))}
		</View>
	);
}

export default DashboardNotificationsSection;
