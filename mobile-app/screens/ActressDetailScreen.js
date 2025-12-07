// screens/ActressDetailScreen.js
import { useState, useEffect, useRef } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
	Dimensions,
	FlatList,
	Pressable,
	Linking,
	Animated,
	ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { formatName } from '../helper';

const { width } = Dimensions.get('window');
const COVER_H = Math.round(width * 9 / 16);
const AVATAR_SIZE = 120;
const FILM_GAP = 10;
const FILM_CARD_W = 140;

const BASE_URL = 'http://192.168.1.77:3123';
const SEARCH_URL = BASE_URL + '/api/idol/searchExact'; // ← your API

/* ----------- helpers: parse & map server record to UI model ----------- */
function parseMeta(input) {
	if (!input) return {};
	if (typeof input === 'object') return input;
	try { return JSON.parse(input); } catch { return {}; }
}
function parseMeasurements(str) {
	if (!str || typeof str !== 'string') return {};
	const [b, w, h] = str.split(/[^0-9.]+/).filter(Boolean);
	return { bust: b || '', waist: w || '', hips: h || '' };
}
function parseHeight(h) {
	if (!h || typeof h !== 'string') return h || '';
	const m = h.match(/([\d.]+)/);
	return m ? m[1] : h;
}
function parseTags(meta) {
	const raw = meta?.tags;
	if (!raw) return [];
	return String(raw)
		.split('|')
		.map(kv => {
			const [k, v] = kv.split(':');
			// console.log(k)
			if (['debut_age', 'birth_year', 'debut_year', 'birthplace', 'starsign', 'blood_type', 'height'].includes(k?.toLowerCase())) return null;
			if (k === 'cup_size') return v.toUpperCase() + ("(Cup size)")
			return (v || k || '').split(',')[0];
		})
		.filter(Boolean)
		.map(s => s.trim());
}
function parseRating(note) {
	// examples: "4.27/5", "(No Ratings Yet)"
	if (!note) return null;
	const m = String(note).match(/([\d.]+)\s*\/\s*5/);
	return m ? Math.max(0, Math.min(5, parseFloat(m[1]))) : null;
}
function toIntMaybe(x) {
	const n = parseInt(String(x), 10);
	return Number.isFinite(n) ? n : null;
}

function mapServerToActress(rec) {
	const meta = parseMeta(rec?.metadata);
	const name = rec?.name || rec?.jp || 'Unknown';
	const avatar = rec.avatar
		? BASE_URL + rec.avatar
		: `https://picsum.photos/seed/idol_${encodeURIComponent(rec?.id ?? name)}/400/400`;
	const cover = rec.cover
		? BASE_URL + rec.cover
		: `https://picsum.photos/seed/cover_${encodeURIComponent(rec?.id ?? name)}/1200/675`;

	const m = parseMeasurements(rec?.measurements);
	const height = parseHeight(rec?.height);
	const rating = parseRating(rec?.note);
	const favorites = toIntMaybe(rec?.favorite);
	const jjgirlData = meta?.jjGirlImg || null;

	return {
		id: String(rec?.id ?? name),
		name,
		jp: rec?.jp || null,
		avatar,
		cover,
		bio: rec?.note || '',
		socials: meta?.socials || {},
		tags: parseTags(meta),
		dob: rec?.dob || null,
		debut: meta?.debut || null,
		videosCount: toIntMaybe(rec?.movies_count) ?? 0,
		rating,         // <- numeric 0..5 or null
		favorites,      // <- integer or null
		measurements: {
			bust: m.bust || (rec?.cup || ''),
			waist: m.waist || '',
			hips: m.hips || '',
			height,
			weight: meta?.weight || '',
		},
		country: rec?.country || '',
		films: rec?.movies || [],       // keep if you later include in metadata
		pictures: rec?.pictures || [],
		jjgirlData: jjgirlData
	};
}

/* ----------- Pictures item with preserved aspect ratio ----------- */
const DEFAULT_RATIO = 3 / 4;
function PictureItem({ uri }) {
	const [ratio, setRatio] = useState(DEFAULT_RATIO);
	useEffect(() => {
		let mounted = true;
		if (!uri) return;
		Image.getSize(
			uri,
			(w, h) => { if (mounted && w && h) setRatio(w / h); },
			() => { }
		);
		return () => { mounted = false; };
	}, [uri]);

	return (
		<View style={[styles.pictureBox, { aspectRatio: ratio }]}>
			<Image source={{ uri }} style={styles.pictureImg} />
		</View>
	);
}

/* ========================== Screen =========================== */
export default function ActressDetailScreen() {
	const navigation = useNavigation();
	const route = useRoute();
	const { actressName } = route?.params ?? {};

	const [state, setState] = useState({
		loading: true,
		error: null,
		actress: null,
	});
	const [updatingFavorite, setUpdatingFavorite] = useState(false);
	const scaleAnim = useRef(new Animated.Value(1)).current;

	const [hasJJGirlGallery] = useState(false); // set true later when you have real condition

	// Fetch on mount/by name
	useEffect(() => {
		let cancelled = false;
		const controller = new AbortController();

		async function run() {
			setState((s) => ({ ...s, loading: true, error: null }));
			try {
				// TODO: define your real request body. Example below searches by exact name:
				const url = SEARCH_URL + "?name=" + encodeURIComponent(actressName);
				const res = await fetch(url, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
					// body: JSON.stringify(body),
					// signal: controller.signal,
				});
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const actressData = await res.json(); // single object per your sample
				// const actressData = jsonData.data[0];
				// console.log('[actressData]', actressData)
				if (!actressData) throw new Error('Not found');

				const actress = mapServerToActress(actressData);
				// console.log('[actress]', actress)
				// setActressData(actress)
				if (!cancelled) setState({ loading: false, error: null, actress });
			} catch (e) {
				if (cancelled) return;
				setState({ loading: false, error: e?.message || 'Failed to load', actress: null });
			}
		}
		run();

		return () => {
			cancelled = true;
			controller.abort();
		};
	}, [actressName]);

	const { loading, error, actress } = state;

	/* -------- UI skeletons -------- */
	if (loading) {
		return (
			<View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
				<ActivityIndicator color="#5b9cff" size="large" />
				<Text style={{ color: '#9aa4b2', marginTop: 12 }}>Loading {actressName}…</Text>
			</View>
		);
	}
	if (error) {
		return (
			<View style={[styles.container, { alignItems: 'center', justifyContent: 'center', padding: 16 }]}>
				<Text style={{ color: '#e7ecf3', fontSize: 16, fontWeight: '700', marginBottom: 8 }}>
					Couldn’t load {actressName}
				</Text>
				<Text style={{ color: '#9aa4b2', textAlign: 'center' }}>{String(error)}</Text>
				<Pressable
					onPress={() => {
						// quick retry: re-run effect by toggling local state
						// simplest is to set loading and trigger effect with same name (we rely on abort+refetch on mount)
						// here we hack by resetting state then letting effect run again (change key via name)
						setState((s) => ({ ...s, loading: true })); // triggers spinner; effect depends on actressName and will re-run on remount
					}}
					style={{ marginTop: 16, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8, borderColor: '#1f2430', borderWidth: 1 }}
				>
					<Text style={{ color: '#5b9cff', fontWeight: '700' }}>Retry</Text>
				</Pressable>
			</View>
		);
	}
	if (!actress) {
		return (
			<View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
				<Text style={{ color: '#9aa4b2' }}>No result for “{actressName}”.</Text>
			</View>
		);
	}

	// Derive capped lists
	// console.log('[actress]', actress.films)
	const filmsTop = (actress.films || []).slice(0, 8);
	const pictures = (actress.pictures || []).slice(0, 10);

	/* --------- Films renderer (tappable to FilmDetail) --------- */
	const renderFilmCard = ({ item }) => {
		const filmPayload = {
			id: item.id,
			code: item.code,
			title: item.title,
			image: item.cover,
			previewUrl: item.previewUrl || 'https://cdn.coverr.co/videos/coverr-misty-mountains-7655/1080p.mp4',
			rating: item.rating || 4,
			releaseDate: item.releaseDate || '2021-01-01',
			runtime: item.runtime || 95,
			tags: item.tags || ['Drama'],
			actresses: [actress.name],
			scenes: item.scenes || Array.from({ length: 6 }).map((_, i) => ({
				id: `${item.id}-sc-${i + 1}`,
				uri: `https://picsum.photos/seed/${item.id}_sc_${i + 1}/800/450`,
			})),
		};
		return (
			<Pressable
				key={item.code}
				style={styles.filmCard}
				onPress={() => navigation.navigate('FilmDetail', { film: filmPayload })}
			>
				<Image source={{ uri: item.thumb }} style={styles.filmCover} />
				{/* <Text style={styles.filmTitle} numberOfLines={1}>{item.title}</Text> */}
				<Text style={styles.filmCode}>{item.code.toUpperCase()}</Text>
			</Pressable>
		);
	};

	const renderPicture = ({ item }) => { return <PictureItem key={item} uri={"http://192.168.1.77:3123" + item} /> };

	const openUrl = async (url) => {
		try { if (url && (await Linking.canOpenURL(url))) await Linking.openURL(url); } catch { }
	};

	const runFavoriteAnim = () => {
		Animated.sequence([
			Animated.timing(scaleAnim, {
				toValue: 1.3,
				duration: 120,
				useNativeDriver: true,
			}),
			Animated.spring(scaleAnim, {
				toValue: 1,
				friction: 4,
				useNativeDriver: true,
			}),
		]).start();
	};


	const handleToggleFavorite = async () => {
		if (!actress) return;

		const current = actress.my_favorite;
		const newValue = !current;

		// Optimistic update
		setState((prev) => ({
			...prev,
			actress: {
				...prev.actress,
				my_favorite: newValue,
			},
		}));

		// Run heart animation
		runFavoriteAnim();

		try {
			setUpdatingFavorite(true);

			// replace URL and body with your real API
			const updateResult = await fetch('http://192.168.1.77:3123/api/idol/my-favorite', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id: actress.id,      // or name, contentId... depending on your backend
					myFavValue: newValue ? 1 : 0,
				}),
			});
			if (updateResult.ok) {
				const result = await updateResult.json();
				console.log(result)
				setState((prev) => ({
					...prev,
					actress: {
						...prev.actress,
						my_favorite: Number(result.valueUpdated),
					},
				}));
			}
		} catch (e) {
			// Revert on failure
			setState((prev) => ({
				...prev,
				actress: {
					...prev.actress,
					my_favorite: current,
				},
			}));
		} finally {
			setUpdatingFavorite(false);
		}
	};
	return (
		<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
			{/* Cover */}
			<Image source={{ uri: actress.cover }} style={styles.cover} />

			{/* Avatar */}
			<View style={styles.avatarWrap}>
				<Image source={{ uri: actress.avatar }} style={styles.avatar} />
				<Pressable
					style={styles.favoriteButton}
					onPress={handleToggleFavorite}
					disabled={updatingFavorite}
				>
					<Animated.Text
						style={[
							styles.favoriteIcon,
							actress.my_favorite === 1 ? styles.favoriteIconActive : styles.favoriteIconInactive,
							{ transform: [{ scale: scaleAnim }] }, // <--- animation
						]}
					>
						♥
					</Animated.Text>
				</Pressable>
			</View>

			{/* Name */}
			<Text style={styles.name}>{actress.name}</Text>

			{actress.jjgirlData && (
				<View style={{ paddingHorizontal: 16, marginTop: 10 }}>
					<Pressable
						style={styles.jjgirlButton}
						onPress={() =>
							navigation.navigate('ActressDetailJJGirl', {
								actressName: actress.name,
								data: actress.jjgirlData
							})
						}
					>
						<Text style={styles.jjgirlButtonText}>View JJGirl Gallery</Text>
					</Pressable>
				</View>
			)}

			{/* About */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>About</Text>
				<Text style={styles.body}>{actress.bio || '—'}</Text>
			</View>

			{/* Social */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Social</Text>
				<View style={styles.socialRow}>
					<Pressable style={styles.socialBtn} onPress={() => openUrl(actress.socials.twitter)}>
						<Ionicons name="logo-twitter" size={18} color="#e7ecf3" />
						<Text style={styles.socialText}>Twitter</Text>
					</Pressable>
					<Pressable style={styles.socialBtn} onPress={() => openUrl(actress.socials.instagram)}>
						<Ionicons name="logo-instagram" size={18} color="#e7ecf3" />
						<Text style={styles.socialText}>Instagram</Text>
					</Pressable>
					<Pressable style={styles.socialBtn} onPress={() => openUrl(actress.socials.website)}>
						<Ionicons name="globe-outline" size={18} color="#e7ecf3" />
						<Text style={styles.socialText}>Website</Text>
					</Pressable>
				</View>
			</View>

			{/* Tags */}
			{Array.isArray(actress.tags) && actress.tags.length > 0 && (
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Tags</Text>
					<View style={styles.tagsWrap}>
						{actress.tags.map((t, i) => (
							<View key={`${t}-${i}`} style={styles.chip}><Text style={styles.chipText}>{t}</Text></View>
						))}
					</View>
				</View>
			)}

			{/* Profile stats */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Profile</Text>
				<View style={styles.statsCard}>
					{actress.jp ? (
						<View style={styles.statsRow}>
							<Text style={styles.statLabel}>JP</Text>
							<Text style={styles.statValue}>{actress.jp}</Text>
						</View>
					) : null}

					<View style={styles.statsRow}>
						<Text style={styles.statLabel}>Date of birth</Text>
						<Text style={styles.statValue}>{actress.dob || '—'}</Text>
					</View>

					<View style={styles.statsRow}>
						<Text style={styles.statLabel}>Date of debut</Text>
						<Text style={styles.statValue}>{actress.debut || '—'}</Text>
					</View>

					<View style={styles.statsRow}>
						<Text style={styles.statLabel}>Movies count</Text>
						<Text style={styles.statValue}>{actress.videosCount ?? '—'}</Text>
					</View>

					{actress.favorites != null ? (
						<View style={styles.statsRow}>
							<Text style={styles.statLabel}>Favorites</Text>
							<Text style={styles.statValue}>{actress.favorites}</Text>
						</View>
					) : null}

					{actress.rating != null ? (
						<View style={styles.statsRow}>
							<Text style={styles.statLabel}>Rating</Text>
							<Text style={styles.statValue}>
								{actress.rating.toFixed(2)} / 5
							</Text>
						</View>
					) : null}

					<View style={[styles.statsRow, { alignItems: 'flex-start' }]}>
						<Text style={styles.statLabel}>Measurements</Text>
						<Text style={styles.statValue}>
							{[
								actress.measurements?.bust && `B${actress.measurements.bust}`,
								actress.measurements?.waist && `W${actress.measurements.waist}`,
								actress.measurements?.hips && `H${actress.measurements.hips}`,
							].filter(Boolean).join('–') || '—'}
							{'\n'}
							{[
								actress.measurements?.height && `Ht ${actress.measurements.height} cm`,
								actress.measurements?.weight && `Wt ${actress.measurements.weight} kg`,
							].filter(Boolean).join(' · ') || ''}
						</Text>
					</View>
				</View>
			</View>

			{/* Films (horizontal, up to 8) */}
			{filmsTop.length > 0 && (
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Films</Text>
						<Pressable
							onPress={() =>
								navigation.navigate('ActressFilm', {
									actressName: actress.name,
									films: actress.films,
								})
							}
							hitSlop={8}
						>
							<Text style={styles.link}>See more</Text>
						</Pressable>
					</View>
					<FlatList
						data={filmsTop}
						keyExtractor={(f) => f.code}
						renderItem={renderFilmCard}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ paddingHorizontal: 16 }}
						ItemSeparatorComponent={() => <View style={{ width: FILM_GAP }} />}
						snapToInterval={FILM_CARD_W + FILM_GAP}
						decelerationRate="fast"
					/>
				</View>
			)}

			{/* Pictures (vertical, ratio preserved, up to 10) */}
			{pictures.length > 0 && (
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Pictures</Text>
					<FlatList
						data={pictures}
						keyExtractor={(item, index) => index.toString()}
						renderItem={renderPicture}
						ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
						contentContainerStyle={{ paddingHorizontal: 16 }}
						scrollEnabled={false}
					/>
				</View>
			)}
		</ScrollView>
	);
}

/* ---------------------- styles ---------------------- */
const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#0f1115' },

	cover: { width, height: COVER_H, backgroundColor: '#151922' },

	avatarWrap: {
		marginTop: -AVATAR_SIZE / 2,
		paddingHorizontal: 16,
		alignItems: 'flex-start',
	},
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
		borderWidth: 3,
		borderColor: '#0f1115',
		backgroundColor: '#151922',
	},

	name: { color: '#e7ecf3', fontSize: 24, fontWeight: '800', paddingHorizontal: 16, marginTop: 8 },

	section: { marginTop: 16 },
	sectionHeader: {
		flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
		paddingHorizontal: 16, marginBottom: 8,
	},
	sectionTitle: { color: '#e7ecf3', fontSize: 16, fontWeight: '700' },
	link: { color: '#5b9cff', fontWeight: '700', fontSize: 13 },

	body: { color: '#c0c7d1', paddingHorizontal: 16, lineHeight: 20 },

	socialRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, flexWrap: 'wrap' },
	socialBtn: {
		flexDirection: 'row', alignItems: 'center', gap: 6,
		paddingHorizontal: 10, paddingVertical: 8, borderRadius: 999,
		backgroundColor: '#151922', borderWidth: 1, borderColor: '#1f2430',
	},
	socialText: { color: '#e7ecf3', fontSize: 12 },

	tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 16 },
	chip: {
		paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999,
		backgroundColor: '#151922', borderWidth: 1, borderColor: '#1f2430',
	},
	chipText: { color: '#e7ecf3', fontSize: 12 },

	statsCard: {
		marginHorizontal: 16, borderRadius: 12, backgroundColor: '#0f131b',
		borderWidth: 1, borderColor: '#1f2430', padding: 12,
	},
	statsRow: {
		flexDirection: 'row', justifyContent: 'space-between',
		paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#1f2430',
	},
	statLabel: { color: '#9aa4b2' },
	statValue: { color: '#e7ecf3', marginLeft: 12, textAlign: 'right', flexShrink: 1 },

	// Films horizontal
	filmCard: { width: FILM_CARD_W },
	filmCover: {
		width: FILM_CARD_W, height: Math.round(FILM_CARD_W * 3 / 2),
		borderRadius: 10, backgroundColor: '#151922',
	},
	filmTitle: { color: '#e7ecf3', fontSize: 13, fontWeight: '700', marginTop: 6 },
	filmCode: { color: '#9aa4b2', fontSize: 12, marginTop: 2 },

	// Pictures with aspect ratio
	pictureBox: { width: '100%', borderRadius: 10, overflow: 'hidden', backgroundColor: '#151922' },
	pictureImg: { width: '100%', height: '100%' },
	nameRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	favoriteButton: {
		paddingLeft: 5,
		paddingTop: 3,
		borderWidth: 2,
		borderColor: '#000000',
		borderRadius: 50,
		backgroundColor: "#ffffffff",
		position: "absolute",
		top: 90, left: 90
	},
	favoriteIcon: {
		fontSize: 17,
		width: 25,
		height: 26
	},
	favoriteIconActive: {
		color: '#ef4444', // red when favorite
	},
	favoriteIconInactive: {
		color: '#000000', // red when favorite
	},
	jjgirlButton: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#1f2430',
		backgroundColor: '#151922',
		paddingVertical: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	jjgirlButtonText: {
		color: '#5b9cff',
		fontWeight: '700',
		fontSize: 13,
	},
});
