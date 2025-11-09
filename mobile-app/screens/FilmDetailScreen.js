// screens/FilmDetailScreen.js
import * as React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
	Dimensions,
	FlatList,
	Pressable,
	ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { VideoView, useVideoPlayer } from 'expo-video';

const { width } = Dimensions.get('window');
const BASE_URL = 'http://192.168.1.77:3123';

// small helper to keep ratio per image
const DEFAULT_RATIO = 16 / 9;
function SceneItem({ uri, onPress }) {
	const [ratio, setRatio] = React.useState(DEFAULT_RATIO);

	React.useEffect(() => {
		let mounted = true;
		if (!uri) return;
		Image.getSize(
			uri,
			(w, h) => {
				if (mounted && w && h) setRatio(w / h);
			},
			() => { }
		);
		return () => {
			mounted = false;
		};
	}, [uri]);

	return (
		<Pressable onPress={onPress} style={styles.sceneBox}>
			<View style={[styles.sceneImgWrap, { aspectRatio: ratio }]}>
				<Image source={{ uri }} style={styles.sceneImg} />
			</View>
		</Pressable>
	);
}

function safeParseJSON(str) {
	if (!str) return {};
	if (typeof str === 'object') return str;
	try {
		return JSON.parse(str);
	} catch {
		return {};
	}
}
function normalizeRuntime(rt) {
	if (!rt) return null;
	if (rt.toLowerCase().includes('undefined')) return null;
	return rt;
}
function splitImages(images) {
	if (!images) return [];
	return String(images)
		.split('|')
		.map((s) => s.trim())
		.filter(Boolean);
}

export default function FilmDetailScreen() {
	const navigation = useNavigation();
	const route = useRoute();
	const { contentId, code } = route?.params;
	console.log(contentId, code)

	const [state, setState] = React.useState({
		loading: true,
		error: null,
		film: null,
	});

	// preview video - you will set real URL later
	// for now, we just keep it separately so we can show the block
	const PREVIEW_URL_PLACEHOLDER = null; // e.g. 'https://.../preview.mp4'

	// we still create a player (expo-video); if you set previewUrl later it will show
	const player = useVideoPlayer(`${BASE_URL}/videos/movie-thumbs/${contentId}-preview.mp4`, (p) => {
		p.loop = true;
		p.muted = true;
		p.play();
	});

	React.useEffect(() => {
		let cancelled = false;
		const controller = new AbortController();

		async function fetchFilm() {
			setState((s) => ({ ...s, loading: true, error: null }));
			try {
				const url = `${BASE_URL}/api/movie/contentId?contentId=${contentId || ''}&code=${code || ''}`;
				const res = await fetch(url, { signal: controller.signal });
				if (!res.ok) {
					throw new Error(`HTTP ${res.status}`);
				}
				console.log('[raw]', movieData)
				const raw = await res.json();
				const movieData = raw.data[0];

				const meta = safeParseJSON(movieData.metadata);
				const images = splitImages(movieData.images);

				const film = {
					id: movieData.id,
					code: movieData.code,
					title: movieData.title,
					studio: movieData.studio,
					releaseDate: movieData.release_date,
					runtime: normalizeRuntime(movieData.runtime),
					note: movieData.note,
					favorite: movieData.favorite,
					myFavorite: movieData.my_favorite,
					poster: movieData.thumbs || images[0] || `https://picsum.photos/seed/film_${movieData.id}/1200/675`,
					images,
					metadata: meta,
					genres: meta.genres
						? String(meta.genres).split('|').map((g) => g.trim()).filter(Boolean)
						: [],
					director: meta.director || null,
					// if backend later gives us video url, put it here
					previewUrl: `${BASE_URL}/videos/movie-thumbs/${contentId}-preview.mp4`,
				};

				// console.log(film.previewUrl)

				if (!cancelled) {
					setState({ loading: false, error: null, film });
				}
			} catch (e) {
				if (!cancelled) {
					setState({ loading: false, error: e?.message || 'Failed to load film', film: null });
				}
			}
		}

		fetchFilm();
		return () => {
			cancelled = true;
			controller.abort();
		};
	}, [contentId, code]);

	const { loading, error, film } = state;

	if (loading) {
		return (
			<View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
				<ActivityIndicator color="#5b9cff" size="large" />
				<Text style={{ color: '#9aa4b2', marginTop: 12 }}>Loading film…</Text>
			</View>
		);
	}

	if (error || !film) {
		return (
			<View style={[styles.container, { alignItems: 'center', justifyContent: 'center', padding: 16 }]}>
				<Text style={{ color: '#e7ecf3', fontSize: 16, fontWeight: '700', marginBottom: 8 }}>
					Couldn’t load film
				</Text>
				<Text style={{ color: '#9aa4b2', textAlign: 'center' }}>
					{String(error || 'Unknown error')}
				</Text>
			</View>
		);
	}

	const scenes = film.images;

	return (
		<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
			{/* Poster */}
			<View style={{ width: '100%' }}>
				<Image source={{ uri: film.poster }} style={styles.poster} />
			</View>

			{/* Preview video section (you'll set film.previewUrl later) */}
			{film.previewUrl ? (
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
			) : null}

			{/* Code / Title / Studio */}
			<View style={{ paddingHorizontal: 16, marginTop: 12 }}>
				<Text style={styles.code}>{film.code.toUpperCase() + " / " + contentId}</Text>
				<Text style={styles.title}>{film.title}</Text>
				{film.studio ? <Text style={styles.studio}>{film.studio}</Text> : null}
			</View>

			{/* Meta row */}
			<View style={styles.metaRow}>
				<View style={styles.metaItemRow}>
					{/* use icons before if you imported Ionicons */}
					<Text style={styles.metaIcon}>📅</Text>
					<Text style={styles.metaItemText}>{film.releaseDate || '—'}</Text>
				</View>
				<View style={styles.metaItemRow}>
					<Text style={styles.metaIcon}>⏱</Text>
					<Text style={styles.metaItemText}>{film.runtime || '—'}</Text>
				</View>
			</View>

			{/* Genres */}
			{film.genres.length > 0 && (
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Genres</Text>
					<View style={styles.chipsWrap}>
						{film.genres.map((g, i) => (
							<View key={`${g}-${i}`} style={styles.chip}>
								<Text style={styles.chipText}>{g}</Text>
							</View>
						))}
					</View>
				</View>
			)}

			{/* Director */}
			{film.director ? (
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Director</Text>
					<Text style={styles.body}>{film.director}</Text>
				</View>
			) : null}

			{/* Scenes – vertical, ratio-respecting, zoom on press */}
			{scenes.length > 0 && (
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Scenes</Text>
					<FlatList
						data={scenes}
						keyExtractor={(uri, idx) => `${uri}-${idx}`}
						renderItem={({ item, index }) => (
							<SceneItem
								uri={item}
								onPress={() =>
									navigation.navigate('FilmSceneViewer', {
										images: scenes,
										index,
										title: film.title,
									})
								}
							/>
						)}
						ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
						scrollEnabled={false} // let outer ScrollView handle scrolling
						contentContainerStyle={{ paddingHorizontal: 16 }}
					/>
				</View>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#0f1115' },
	poster: {
		width: '100%', minHeight: 300, maxHeight: 500, backgroundColor: '#151922'
	},
	video: {
		width: '100%',
		height: Math.round(width * 9 / 16),
	},
	code: { color: '#9aa4b2' },
	title: { color: '#e7ecf3', fontSize: 22, fontWeight: '800', marginTop: 4 },
	studio: { color: '#9aa4b2', marginTop: 2 },
	metaRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		marginTop: 10,
	},
	metaItemRow: { flexDirection: 'row', alignItems: 'center' },
	metaIcon: { marginRight: 6 },
	metaItemText: { color: '#9aa4b2' },

	section: { marginTop: 16 },
	sectionTitle: { color: '#e7ecf3', fontSize: 16, fontWeight: '700', paddingHorizontal: 16, marginBottom: 8 },
	body: { color: '#c0c7d1', paddingHorizontal: 16 },

	chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 16 },
	chip: {
		paddingVertical: 6,
		paddingHorizontal: 10,
		borderRadius: 999,
		backgroundColor: '#151922',
		borderWidth: 1,
		borderColor: '#1f2430',
		marginRight: 8,
		marginBottom: 8,
	},
	chipText: { color: '#e7ecf3', fontSize: 12 },

	// scenes
	sceneBox: {
		width: '100%',
	},
	sceneImgWrap: {
		width: '100%',
		borderRadius: 10,
		overflow: 'hidden',
		backgroundColor: '#151922',
	},
	sceneImg: {
		width: '100%',
		height: '100%',
	},
});
