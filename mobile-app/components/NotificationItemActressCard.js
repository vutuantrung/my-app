import {
	View,
	Text,
	TouchableOpacity,
} from 'react-native';
import SafeImage from './SafeImage';

// Small visual tag pill
function TagPill({ tag }) {
	if (!tag) return null;

	const isCreated = tag === 'created';
	const bg = isCreated ? '#16a34a' : '#f97316'; // green / orange

	return (
		<View
			style={{
				paddingHorizontal: 8,
				paddingVertical: 2,
				borderRadius: 999,
				backgroundColor: bg,
				alignSelf: 'flex-start',
			}}
		>
			<Text style={{ color: '#ffffff', fontSize: 11, fontWeight: '600' }}>
				{tag.toUpperCase()}
			</Text>
		</View>
	);
}

export default function NotificationItemActressCard(item, kindMeta, markAsRead, navigation) {
	const BASE_URL = 'http://192.168.1.77:3123';
	const DEFAULT_AVATAR = `${BASE_URL}/images/default-poster.jpg`;

	const n = item;
	const data = n.data.idol || {};
	const name = data.name || n.title || 'Unknown actress';
	const title = item.title;
	const avatar = `${BASE_URL}/images/idol-avatars/${name}-avatar.jpg`;

	const dateStr = n.createdAt
		? new Date(n.createdAt).toLocaleString()
		: '';

	return (
		<TouchableOpacity
			onPress={() => {
				markAsRead(n.id);
				if (data.name) {
					navigation.navigate('ActressDetail', { actressName: data.name });
				}
			}}
			style={{
				marginHorizontal: 16,
				marginBottom: 10,
				borderRadius: 12,
				borderWidth: 1,
				borderColor: '#1e2430',
				backgroundColor: n.read ? '#0f1115' : '#151922',
				flexDirection: 'row',
				padding: 10,
			}}
		>
			{/* Avatar */}
			<SafeImage
				uri={avatar}
				style={{
					width: 70,
					height: 70,
					borderRadius: 35,
					backgroundColor: '#111827',
					marginLeft: 20,
					marginRight: 30,
				}}
				defaultSource={DEFAULT_AVATAR}
			/>

			{/* Info */}
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginBottom: 4,
					}} >
					<Text
						style={{
							color: '#e7ecf3',
							fontSize: 15,
							fontWeight: '600',
							flexShrink: 1,
						}}
						numberOfLines={1} >
						{title}
					</Text>
				</View>
				<TagPill tag={kindMeta.tag} />
				<Text style={{ color: '#9aa4b2', fontSize: 11, marginTop: 10 }}>{dateStr}</Text>
			</View>
		</TouchableOpacity>
	);
}
