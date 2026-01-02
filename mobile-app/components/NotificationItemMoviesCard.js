import {
	View,
	Text,
} from 'react-native';
import NotificationItemOtherCard from './NotificationItemOtherCard';
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

export default function NotificationItemMoviesCard(item, kindMeta, markAsRead) {
	const BASE_URL = 'http://192.168.1.77:3123';
	const DEFAULT_POSTER = `${BASE_URL}/images/system-assets/default-poster.jpg`;

	const data = item.data.movieSamples || {};
	const movies = Array.isArray(data) ? data : [];

	if (movies.length === 0) {
		return NotificationItemOtherCard(item, markAsRead);
	}

	const total = item.data.totalMoviesCount;
	const MAX_DISPLAY = 5;

	const displayMovies = movies.slice(0, MAX_DISPLAY);
	const remaining = total - displayMovies.length;

	const codes = displayMovies
		.map((m) => m.code || 'Unknown')
		.filter(Boolean);

	const codeText =
		codes.join(', ') + (remaining > 0 ? ` +${remaining} more` : '');

	const thumbs = displayMovies.map((m) =>
		m.contentId
			? `https://pics.dmm.co.jp/digital/video/${m.contentId}/${m.contentId}pl.jpg`
			// ? `${BASE_URL}/images/movie-thumbs/${m.contentId}-thumbs-full.jpg`
			: null,
	);

	const dateStr = item.createdAt
		? new Date(item.createdAt).toLocaleString()
		: '';

	return (
		<View style={{
			marginHorizontal: 16,
			marginBottom: 10,
			borderRadius: 12,
			borderWidth: 1,
			borderColor: '#1e2430',
			backgroundColor: item.read ? '#0f1115' : '#151922',
			padding: 10,
		}}>
			{/* <View style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginBottom: 6,
			}}>
				<Text style={{
					color: '#e7ecf3',
					fontSize: 15,
					fontWeight: '600',
				}} >
					{total} movies
				</Text>
				<TagPill tag={kindMeta.tag} />
			</View> */}

			{/* Codes */}
			<Text
				numberOfLines={2}
				style={{
					color: '#9aa4b2',
					fontSize: 13,
					marginBottom: 6,
				}} >
				{item.title || codeText}
			</Text>

			{/* Thumbnails row */}
			<View style={{
				flexDirection: 'row',
				alignItems: 'center',
				marginBottom: 6,
				display: 'flex',
				flexWrap: 'wrap',
			}} >
				{thumbs.map((uri, index) => (
					<View key={`${uri || 'thumb'}-${index}`} style={{ marginRight: 6 }}>
						<SafeImage
							uri={uri}
							defaultSource={DEFAULT_POSTER}
							style={{
								width: 60,
								height: 40,
								borderRadius: 6,
								backgroundColor: '#111827',
							}}
						/>
					</View>
				))}
				{remaining > 0 && (
					<Text style={{
						color: '#9aa4b2',
						fontSize: 12,
						marginLeft: 4,
					}} >
						+{remaining} more
					</Text>
				)}
			</View>

			<Text style={{ color: '#9aa4b2', fontSize: 11 }}>{dateStr}</Text>
		</View>
	);
};
