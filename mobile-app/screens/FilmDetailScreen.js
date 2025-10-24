// FilmDetailScreen.js
import { Ionicons } from '@expo/vector-icons';
import {
	View, Text, StyleSheet, Image, ScrollView,
	FlatList, Pressable, Dimensions
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { VideoView, useVideoPlayer } from 'expo-video';

const { width } = Dimensions.get('window');

function Stars({ value = 0 }) {
	const v = Math.max(0, Math.min(5, value));
	return <Text style={{ color: '#f7a000' }}>{'★'.repeat(v)}{'☆'.repeat(5 - v)}</Text>;
}
const Chip = ({ children }) => (
	<View style={styles.chip}><Text style={styles.chipText}>{children}</Text></View>
);

export default function FilmDetailScreen() {
	const navigation = useNavigation();
	const route = useRoute();
	const { film } = (route?.params ?? {});

	const player = useVideoPlayer('https://fourhoi.com/ipx-906/preview.mp4', (p) => {
		p.loop = true;
		p.muted = true;
		p.play()
	});

	const renderSceneThumb = ({ item, index }) => (
		<Pressable
			onPress={() =>
				navigation.navigate('ScenesLightbox', {
					scenes: film?.scenes || [],
					index,
					title: film?.title ?? 'Scenes',
				})
			}
			style={{ marginRight: 8 }}
		>
			<Image source={{ uri: item.uri }} style={styles.sceneThumb} />
		</Pressable>
	);

	return (
		<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
			{/* Poster */}
			<Image source={{ uri: film?.image }} style={styles.poster} />

			{/* Video preview */}
			<View style={{ paddingHorizontal: 16, marginTop: 12 }}>
				<VideoView
					player={player}
					nativeControls
					allowsFullscreen
					allowsPictureInPicture
					contentFit="contain"
					style={styles.video}
				/>
			</View>

			{/* Code / Title / Stars */}
			<View style={{ paddingHorizontal: 16, marginTop: 12 }}>
				<Text style={styles.code}>{film?.code}</Text>
				<Text style={styles.title}>{film?.title}</Text>
				<Stars value={film?.rating || 0} />
			</View>

			{/* Meta */}
			<View style={styles.metaRow}>
				<View style={styles.metaItemRow}>
					<Ionicons name="calendar-outline" size={16} color="#9aa4b2" style={styles.metaIcon} />
					<Text style={styles.metaItemText}>{film?.releaseDate || '—'}</Text>
				</View>
				<View style={styles.metaItemRow}>
					<Ionicons name="time-outline" size={16} color="#9aa4b2" style={styles.metaIcon} />
					<Text style={styles.metaItemText}>{film?.runtime ? `${film.runtime} min` : '—'}</Text>
				</View>
			</View>


			{/* Tags */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Tags</Text>
				<View style={styles.chipsWrap}>
					{(film?.tags || []).map((t, i) => <Chip key={`${t}-${i}`}>{t}</Chip>)}
				</View>
			</View>

			{/* Actresses */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Actresses</Text>
				<View style={styles.chipsWrap}>
					{(film?.actresses || []).map((a, i) => <Chip key={`${a}-${i}`}>{a}</Chip>)}
				</View>
			</View>

			{/* Scenes */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Scenes</Text>
				<FlatList
					data={film?.scenes || []}
					keyExtractor={(s) => s.id}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 12 }}
					renderItem={renderSceneThumb}
				/>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#0f1115' },
	poster: { width: '100%', aspectRatio: 16 / 9, backgroundColor: '#151922' },
	video: {
		width: '100%',
		height: Math.round(width * 9 / 16),
		backgroundColor: '#151922',
		borderRadius: 10,
	},
	code: { color: '#9aa4b2' },
	title: { color: '#e7ecf3', fontSize: 22, fontWeight: '800', marginTop: 4 },
	metaRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 10 },
	metaItemRow: { flexDirection: 'row', alignItems: 'center' },
	metaIcon: { marginRight: 6 },
	metaItemText: { color: '#9aa4b2' },
	section: { marginTop: 16 },
	sectionTitle: { color: '#e7ecf3', fontSize: 16, fontWeight: '700', paddingHorizontal: 16, marginBottom: 8 },
	chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 16 },
	chip: {
		paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999,
		backgroundColor: '#151922', borderWidth: 1, borderColor: '#1f2430',
		marginRight: 8, marginBottom: 8,
	},
	chipText: { color: '#e7ecf3', fontSize: 12 },
	sceneThumb: { width: 180, height: 100, borderRadius: 10, backgroundColor: '#151922' },
});
