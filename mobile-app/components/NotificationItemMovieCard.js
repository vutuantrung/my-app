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

export default function NotificationItemMovieCard(item, kindMeta, markAsRead, navigation) {
	const BASE_URL = 'http://192.168.1.77:3123';
	const DEFAULT_POSTER = `${BASE_URL}/images/system-assets/default-poster.jpg`;

	const data = item.data.movie || {};
	const code = data.code || 'Unknown movie';
	const title = item.title;
	const thumbs = data.contentId ? `${BASE_URL}/images/movie-thumbs/${data.contentId}-thumbs-full.jpg` : null;

	const dateStr = item.createdAt
		? new Date(item.createdAt).toLocaleString()
		: '';

	return (
		<TouchableOpacity
			onPress={() => {
				markAsRead(item.id);
				// Navigate to FilmDetail if you have movie code
				if (code) {
					navigation.navigate('FilmDetail', { code: code, contentId: data.contentId });
				}
			}}
			style={{
				marginHorizontal: 16,
				marginBottom: 10,
				borderRadius: 12,
				borderWidth: 1,
				borderColor: '#1e2430',
				backgroundColor: item.read ? '#0f1115' : '#151922',
				flexDirection: 'row',
				alignContent: 'center',
				padding: 10,
			}}
		>
			{/* Thumbnail */}
			<SafeImage
				uri={thumbs}
				style={{
					width: 110,
					height: 70,
					borderRadius: 8,
					backgroundColor: '#111827',
					marginRight: 12,
				}}
				defaultSource={DEFAULT_POSTER}
			/>

			{/* Info */}
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginBottom: 4,
					}}
				>
					<Text
						style={{
							color: '#e7ecf3',
							fontSize: 15,
							fontWeight: '600',
							flexShrink: 1,
						}}
						numberOfLines={1}
					>
						{title}
					</Text>
				</View>
				<TagPill tag={kindMeta.tag} />
				<Text style={{ color: '#9aa4b2', fontSize: 11, marginTop: 10 }}>{dateStr}</Text>
			</View>
		</TouchableOpacity>
	);
}
