import {
	Text,
	TouchableOpacity,
} from 'react-native';
import SafeImage from './SafeImage';

export default function NotificationItemOtherCard(item, markAsRead) {
	const n = item;
	const dateStr = n.createdAt
		? new Date(n.createdAt).toLocaleString()
		: '';

	return (
		<TouchableOpacity
			onPress={() => markAsRead(n.id)}
			style={{
				marginHorizontal: 16,
				marginBottom: 10,
				borderRadius: 12,
				borderWidth: 1,
				borderColor: '#1e2430',
				backgroundColor: n.read ? '#0f1115' : '#151922',
				padding: 10,
			}}
		>
			<Text
				style={{
					color: '#e7ecf3',
					fontSize: 15,
					fontWeight: '600',
					marginBottom: 4,
				}}
			>
				{n.title || 'Notification'}
			</Text>
			{n.message ? (
				<Text
					style={{
						color: '#9aa4b2',
						fontSize: 13,
						marginBottom: 4,
					}}
				>
					{n.message}
				</Text>
			) : null}
			<Text style={{ color: '#9aa4b2', fontSize: 11 }}>{dateStr}</Text>
		</TouchableOpacity>
	);
}
