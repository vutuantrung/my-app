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
import { formatName } from '../helper';
import SafeImage from '../components/SafeImage';

const { width } = Dimensions.get('window');
const BASE_URL = 'http://192.168.1.77:3123';
const DEFAULT_AVATAR = `${BASE_URL}/images/idol-avatars/default-avatar.jpg`;

const DEFAULT_RATIO = 16 / 9;

/* ---------------- Helper components / utils ---------------- */

function SceneItem({ uri, onPress }) {
	const [ratio, setRatio] = React.useState(DEFAULT_RATIO);

	React.useEffect(() => {
		let mounted = true;
		if (!uri) return;
		Image.getSize(
			uri,
			(w, h) => {
				if (mounted && w && h) {
					setRatio(w / h);
				}
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
	if (String(rt).toLowerCase().includes('undefined')) return null;
	return rt;
}

function splitImages(images) {
	if (!images) return [];
	return String(images)
		.split('|')
		.map((s) => s.trim())
		.filter(Boolean);
}

// Extract actress names from metadata using common keys
function extractActresses(meta) {
	if (!meta || typeof meta !== 'object') return [];

	const candidate =
		meta.idols ||
		meta.actresses ||
		meta.actress ||
		meta.cast ||
		meta.actors;

	if (!candidate) return [];

	let list = String(candidate).split('|');
	if (list.length === 1) {
		// maybe comma separated
		list = list[0].split(',');
	}

	const cleaned = list
		.map((s) => s.trim())
		.filter(Boolean);

	return Array.from(new Set(cleaned)); // unique
}

/* ---------------------- Screen component ---------------------- */

export default function FilmDetailScreen() {
	const navigation = useNavigation();
	const route = useRoute();
	// console.log('[route.params]', route.params.film)
	const [code, setCode] = React.useState(code || null);
	const [contentId, setContentId] = React.useState(contentId || null);

	const [state, setState] = React.useState({
		loading: true,
		error: null,
		film: null,
	});

	// For "Update Film" action
	const [updating, setUpdating] = React.useState(false);
	const [updateError, setUpdateError] = React.useState(null);

	// Preview video (always prepared, even if title is missing)
	const previewUrl = `${BASE_URL}/videos/movie-thumbs/${contentId}-preview.mp4`;

	const player = useVideoPlayer(previewUrl, (p) => {
		p.loop = true;
		p.muted = true;
		p.play();
	});

	// Load film detail from API
	const loadFilm = React.useCallback(async () => {
		setState((s) => ({ ...s, loading: true, error: null }));
		try {
			const url = `${BASE_URL}/api/movie/contentId?contentId=${contentId || ''}&code=${code || ''}`;
			const res = await fetch(url);
			if (!res.ok) {
				throw new Error(`HTTP ${res.status}`);
			}
			const movieData = await res.json();

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
				poster:
					movieData.thumbs ||
					images[0] ||
					`https://picsum.photos/seed/film_${movieData.id}/1200/675`,
				images,
				metadata: meta,
				genres: meta.genres
					? String(meta.genres)
						.split('|')
						.map((g) => g.trim())
						.filter(Boolean)
					: [],
				director: meta.director || null,
				actresses: movieData.idols.map(name => ({
					name: name,
					avatar: `${BASE_URL}/images/idol-avatars/${name}-avatar.jpg`
				})),
				previewUrl,
			};
			setState({ loading: false, error: null, film });
		} catch (e) {
			setState({
				loading: false,
				error: e?.message || 'Failed to load film',
				film: null,
			});
		}
	}, [contentId, code, previewUrl]);

	React.useEffect(() => {
		loadFilm();
	}, [loadFilm]);

	const { loading, error, film } = state;

	/* ---------------------- Update Film (external fetch) ---------------------- */
	const handleUpdateFilm = async () => {
		console.log('Updating film with', { code, contentId });
		if (!code && !contentId) {
			console.log('No code or contentId provided for update');
			return;
		}

		setUpdating(true);
		setUpdateError(null);

		try {
			// This mirrors the "Search on internet" save behavior in FilmScreen:
			// hitting the movie search endpoint with updateRecord to force external fetch + save.
			const res = await fetch(`${BASE_URL}/api/identify/search`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					identify: code || contentId || '',
					updateRecord: true,
					reuseSavedFile: true,
					displayType: 'json',
				}),
			});

			if (!res.ok) {
				console.log("not ok")
				throw new Error(`HTTP ${res.status}`);
			}

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			setCode(data.code || code);
			setContentId(data.contentId || contentId);

			// We don't need the body here, but you can inspect if needed:
			// const payload = await res.json();

			// After saving/refreshing on server, reload film detail
			await loadFilm();
		} catch (e) {
			setUpdateError(e?.message || 'Update failed');
		} finally {
			setUpdating(false);
		}
	};

	/* ---------------------- Loading / error states ---------------------- */

	if (loading) {
		return (
			<View
				style={[
					styles.container,
					{ alignItems: 'center', justifyContent: 'center' },
				]}
			>
				<ActivityIndicator color="#5b9cff" size="large" />
				<Text style={{ color: '#9aa4b2', marginTop: 12 }}>
					Loading film…
				</Text>
			</View>
		);
	}

	if (error || !film) {
		return (
			<View
				style={[
					styles.container,
					{ alignItems: 'center', justifyContent: 'center', padding: 16 },
				]}
			>
				<Text
					style={{
						color: '#e7ecf3',
						fontSize: 16,
						fontWeight: '700',
						marginBottom: 8,
					}}
				>
					Couldn’t load film
				</Text>
				<Text style={{ color: '#9aa4b2', textAlign: 'center' }}>
					{String(error || 'Unknown error')}
				</Text>
			</View>
		);
	}

	const scenes = film.images || [];
	const isTitleMissing =
		!film.title ||
		!String(film.title).trim() ||
		film.title === 'undefined';

	/* ---------------------- Special case: title missing ---------------------- */
	if (isTitleMissing) {
		return (
			<ScrollView
				style={styles.container}
				contentContainerStyle={{ paddingBottom: 40 }}
			>
				{/* Poster only */}
				<View style={{ width: '100%' }}>
					<Image source={{ uri: film.poster }} style={styles.poster} />
				</View>

				{/* Update Film button */}
				<View style={{ paddingHorizontal: 16, marginTop: 16 }}>
					<Pressable
						style={[
							styles.updateButton,
							updating && { opacity: 0.7 },
						]}
						onPress={handleUpdateFilm}
						disabled={updating}
					>
						<Text style={styles.updateButtonText}>
							{updating ? 'Updating…' : 'Update Film'}
						</Text>
					</Pressable>
					{updating && (
						<View style={{ marginTop: 8 }}>
							<ActivityIndicator color="#5b9cff" />
						</View>
					)}
					{updateError ? (
						<Text style={styles.updateErrorText}>{updateError}</Text>
					) : null}
				</View>
			</ScrollView>
		);
	}

	/* ---------------------- Normal full-detail layout ---------------------- */
	console.log('[actresses]', film.actresses)
	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={{ paddingBottom: 40 }}
		>
			{/* Poster */}
			<View style={{ width: '100%' }}>
				<Image source={{ uri: film.poster }} style={styles.poster} />
			</View>

			{/* Preview video */}
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
				<Text style={styles.code}>
					{(film.code || '').toUpperCase() +
						(contentId ? ` / ${contentId}` : '')}
				</Text>
				<Text style={styles.title}>{film.title}</Text>
				{film.studio ? (
					<Text style={styles.studio}>{film.studio}</Text>
				) : null}
			</View>

			{/* Actress(es) */}
			{film.actresses && film.actresses.length > 0 && (
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Actress(es)</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.actressAvatarRow}
					>
						{film.actresses.map((actress, index) => (
							<Pressable
								key={`${actress.name}-${index}`}
								style={styles.actressAvatarWrap}
								onPress={() =>
									navigation.navigate('ActressDetail', {
										actressName: actress.name,
									})
								}
								hitSlop={8}
							>
								<SafeImage
									uri={actress.avatar}
									style={styles.actressAvatar}
									defaultSource={DEFAULT_AVATAR}
								/>
								<Text style={styles.actressName} numberOfLines={1}>
									{formatName(actress.name)}
								</Text>
							</Pressable>
						))}
					</ScrollView>
				</View>
			)}

			{/* Meta row */}
			<View style={styles.metaRow}>
				<View style={styles.metaItemRow}>
					<Text style={styles.metaIcon}>📅</Text>
					<Text style={styles.metaItemText}>
						{film.releaseDate || '—'}
					</Text>
				</View>
				<View style={styles.metaItemRow}>
					<Text style={styles.metaIcon}>⏱</Text>
					<Text style={styles.metaItemText}>{film.runtime || '—'}</Text>
				</View>
			</View>

			{/* Genres */}
			{film.genres && film.genres.length > 0 && (
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
					<View style={styles.chipsWrap}>
						<View style={styles.chip}>
							<Text style={styles.body}>{film.director}</Text>
						</View>
					</View>
				</View>
			) : null}


			{/* Scenes – vertical list with preserved ratios */}
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
						scrollEnabled={false}
						contentContainerStyle={{ paddingHorizontal: 16 }}
					/>
				</View>
			)}
		</ScrollView>
	);
}

/* ---------------------- Styles ---------------------- */

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#0f1115' },

	poster: {
		width: '100%',
		minHeight: 300,
		maxHeight: 500,
		backgroundColor: '#151922',
	},
	video: {
		width: '100%',
		height: Math.round((width * 9) / 16),
	},

	code: { color: '#9aa4b2' },
	title: {
		color: '#e7ecf3',
		fontSize: 22,
		fontWeight: '800',
		marginTop: 4,
	},
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
	sectionTitle: {
		color: '#e7ecf3',
		fontSize: 16,
		fontWeight: '700',
		paddingHorizontal: 16,
		marginBottom: 8,
	},
	body: { color: '#c0c7d1', paddingHorizontal: 16 },

	chipsWrap: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingHorizontal: 16,
	},
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

	// Update Film
	updateButton: {
		paddingVertical: 12,
		borderRadius: 10,
		backgroundColor: '#1d4ed8',
		alignItems: 'center',
		justifyContent: 'center',
	},
	updateButtonText: {
		color: '#ffffff',
		fontWeight: '700',
		fontSize: 15,
	},
	updateErrorText: {
		color: '#f97373',
		marginTop: 8,
	},
	actressAvatarRow: {
		paddingHorizontal: 16,
		paddingVertical: 4,
		alignItems: 'center',
	},
	actressAvatarWrap: {
		marginRight: 10,
		alignItems: 'center',
	},
	actressAvatar: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: '#151922',
	},
	actressName: {
		color: '#e7ecf3',
		fontSize: 12,
		marginTop: 6,
		maxWidth: 80,
	},
});
