// screens/DashboardScreen.js
import { useEffect, useState, useRef } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ScrollView,
	Pressable,
	Image,
	FlatList,
	ActivityIndicator,
	Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatName } from '../helper';
import DashboardNotificationsSection from './DashboardNotificationsSection';

const CATEGORIES = ['All', 'Action', 'Drama', 'Comedy', 'Sci-Fi', 'Romance', 'Thriller'];

// adjust to your real endpoints
const TOP_ACTRESS_URL = 'http://192.168.1.77:3123/api/idol/top?limit=7';
const TOP_MOVIE_URL = 'http://192.168.1.77:3123/api/movie/top?limit=10';

export default function DashboardScreen() {
	const navigation = useNavigation();
	const [query, setQuery] = useState('');
	const [activeCategory, setActiveCategory] = useState('All');

	// ---- fetch top movies from server ----
	const [topMovies, setTopMovies] = useState([]);
	const [loadingMovies, setLoadingMovies] = useState(false);

	const { width: SCREEN_WIDTH } = Dimensions.get('window');

	// TODO: replace these with your real image URLs
	//'https://picsum.photos/seed/hero1/1200/600',
	const HERO_IMAGES = [
		'http://192.168.1.77:3123/images/system-assets/wall_1.jpg',
		'http://192.168.1.77:3123/images/system-assets/wall_2.png',
		'http://192.168.1.77:3123/images/system-assets/wall_3.png',
		'http://192.168.1.77:3123/images/system-assets/wall_4.png',
		'http://192.168.1.77:3123/images/system-assets/wall_5.jpg',
		'http://192.168.1.77:3123/images/system-assets/wall_6.gif',
		'http://192.168.1.77:3123/images/system-assets/wall_7.webp',
		'http://192.168.1.77:3123/images/system-assets/wall_11.png',
	];

	const [heroIndex, setHeroIndex] = useState(0);
	const heroScrollRef = useRef(null);

	useEffect(() => {
		if (!heroScrollRef.current || HERO_IMAGES.length === 0) return;

		const interval = setInterval(() => {
			setHeroIndex(prev => {
				const next = (prev + 1) % HERO_IMAGES.length;
				if (heroScrollRef.current) {
					heroScrollRef.current.scrollTo({
						x: next * SCREEN_WIDTH,
						y: 0,
						animated: true,
					});
				}
				return next;
			});
		}, 10_000); // 4s per slide

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		let cancelled = false;
		const controller = new AbortController();

		async function loadMovies() {
			setLoadingMovies(true);
			try {
				const res = await fetch(TOP_MOVIE_URL, { signal: controller.signal });
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const json = await res.json(); // expecting array of {id,code,title,thumbs,thumbs_short}
				const mapped = (Array.isArray(json) ? json : []).map((item) => ({
					id: String(item.id),
					code: item.code,
					title: item.title,
					contentId: item.contentId,
					// prefer thumbs, fallback to thumbs_short, finally to placeholder
					image:
						item.thumbs ||
						item.thumbs_short ||
						`https://picsum.photos/seed/movie_${encodeURIComponent(item.id)}/600/360`,
				}));
				if (!cancelled) setTopMovies(mapped);
			} catch (e) {
				if (!cancelled) {
					console.warn('Failed to load top movies:', e?.message || e);
					setTopMovies([]);
				}
			} finally {
				if (!cancelled) setLoadingMovies(false);
			}
		}

		loadMovies();
		return () => {
			cancelled = true;
			controller.abort();
		};
	}, []);

	// ---- fetch top actress from server ----
	const [topActress, setTopActress] = useState([]);
	const [loadingActress, setLoadingActress] = useState(false);

	useEffect(() => {
		let cancelled = false;
		const controller = new AbortController();

		async function loadActresses() {
			setLoadingActress(true);
			try {
				const res = await fetch(TOP_ACTRESS_URL, { signal: controller.signal });
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const json = await res.json();
				const mapped = (Array.isArray(json) ? json : []).map((item) => ({
					id: String(item.id),
					name: item.name,
					image: `http://192.168.1.77:3123/images/idol-avatars/${item.name}-avatar.jpg`,
				}));
				if (!cancelled) setTopActress(mapped);
			} catch (e) {
				if (!cancelled) {
					console.warn('Failed to load top actress:', e?.message || e);
					setTopActress([]);
				}
			} finally {
				if (!cancelled) setLoadingActress(false);
			}
		}

		loadActresses();
		return () => {
			cancelled = true;
			controller.abort();
		};
	}, []);

	// simple client-side filter for movies by query
	const filteredMovies =
		query.trim().length === 0
			? topMovies
			: topMovies.filter((m) =>
				(m.title || '').toLowerCase().includes(query.trim().toLowerCase()) ||
				(m.code || '').toLowerCase().includes(query.trim().toLowerCase())
			);

	return (
		<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 28 }}>
			{/* Auto-scroll hero slider */}
			<View style={{ marginTop: -20 }}>
				<ScrollView
					ref={heroScrollRef}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					scrollEventThrottle={16}
				>
					{HERO_IMAGES.map((uri, index) => (
						<View key={index} style={{ width: SCREEN_WIDTH }}>
							<Image
								source={{ uri }}
								style={{
									width: '100%',
									height: 300,
									borderRadius: 12,
									marginHorizontal: 0
								}}
							/>
						</View>
					))}
				</ScrollView>

				{/* Dots indicator */}
				{/* <View
					style={{
						position: 'absolute',
						bottom: 10,
						left: 0,
						right: 0,
						flexDirection: 'row',
						justifyContent: 'center',
						gap: 6,
					}}
				>
					{HERO_IMAGES.map((_, i) => (
						<View
							key={i}
							style={{
								width: i === heroIndex ? 10 : 6,
								height: i === heroIndex ? 10 : 6,
								borderRadius: 999,
								backgroundColor: i === heroIndex ? '#ffffff' : 'rgba(255,255,255,0.4)',
							}}
						/>
					))}
				</View> */}
			</View>

			{/* New notification section */}
			<DashboardNotificationsSection />

			{/* Search bar */}
			<View style={styles.searchWrap}>
				<TextInput
					style={styles.search}
					placeholder="Search movies, actresses..."
					placeholderTextColor="#9aa4b2"
					value={query}
					onChangeText={setQuery}
					returnKeyType="search"
				/>
			</View>

			{/* Category chips */}
			<View style={styles.chipsRow}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 16 }}
				>
					{CATEGORIES.map((c) => {
						const active = c === activeCategory;
						return (
							<Pressable
								key={c}
								onPress={() => setActiveCategory(c)}
								style={[styles.chip, active && styles.chipActive]}
								hitSlop={6}
							>
								<Text style={[styles.chipText, active && styles.chipTextActive]}>{c}</Text>
							</Pressable>
						);
					})}
				</ScrollView>
			</View>

			{/* Today Top movies (from API) */}
			<SectionHeader
				title="Today Top movies"
				onSeeMore={() =>
					navigation.navigate('ActressFilm', {
						actressName: 'All',
						films: filteredMovies.map((m) => ({
							id: m.id,
							code: m.code,
							title: m.title,
							cover: m.image,
						})),
					})
				}
			/>
			{loadingMovies ? (
				<View style={{ paddingVertical: 16 }}>
					<ActivityIndicator color="#5b9cff" />
				</View>
			) : (
				<FlatList
					data={filteredMovies}
					horizontal
					keyExtractor={(item) => item.id}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 16 }}
					ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
					renderItem={({ item }) => (
						<Pressable
							style={styles.cardMovie}
							onPress={() =>
								navigation.navigate('FilmDetail', {
									id: item.id,
									code: item.code,
									contentId: item.contentId,
								})
							}
						>
							<Text style={styles.movieCode} numberOfLines={1}>
								{item.code.toUpperCase()}
							</Text>
							<Image source={{ uri: item.image }} style={styles.movieImage} />
							<Text style={styles.movieTitle} numberOfLines={1}>
								{item.title}
							</Text>
						</Pressable>
					)}
				/>
			)}

			{/* Today Top actress (from API) */}
			<SectionHeader
				title="Today Top actress"
				onSeeMore={() => navigation.navigate('Actress')}
			/>
			{loadingActress ? (
				<View style={{ paddingVertical: 16 }}>
					<ActivityIndicator color="#5b9cff" />
				</View>
			) : (
				<FlatList
					data={topActress}
					horizontal
					keyExtractor={(item) => item.id}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 16 }}
					ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
					renderItem={({ item }) => (
						<Pressable
							style={styles.cardActress}
							onPress={() => navigation.navigate('ActressDetail', { actressName: item.name })}
						>
							<Image source={{ uri: item.image }} style={styles.actressImage} />
							<Text style={styles.actressName} numberOfLines={1}>
								{formatName(item.name)}
							</Text>
						</Pressable>
					)}
				/>
			)}
		</ScrollView>
	);
}

function SectionHeader({ title, onSeeMore }) {
	return (
		<View style={styles.sectionHeader}>
			<Text style={styles.sectionTitle}>{title}</Text>
			<Pressable onPress={onSeeMore} hitSlop={6}>
				<Text style={styles.link}>See more</Text>
			</Pressable>
		</View>
	);
}

const CARD_H_W = 380;
const CARD_H_H = 250;
const CARD_V_W = 160;
const CARD_V_H = 160;

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#0f1115' },

	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingTop: 12,
	},
	logo: { width: 28, height: 28, borderRadius: 6, backgroundColor: '#151922' },
	appName: { marginLeft: 8, color: '#e7ecf3', fontSize: 18, fontWeight: '800' },

	searchWrap: { padding: 16, paddingBottom: 8 },
	search: {
		backgroundColor: '#151922',
		color: '#e7ecf3',
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 10,
		borderWidth: 1,
		borderColor: '#1f2430',
	},

	chipsRow: { marginTop: 4, marginBottom: 8 },
	chip: {
		paddingVertical: 6,
		paddingHorizontal: 10,
		borderRadius: 999,
		backgroundColor: '#151922',
		borderWidth: 1,
		borderColor: '#1f2430',
		marginRight: 8,
	},
	chipActive: { backgroundColor: '#1b2230', borderColor: '#3a4760' },
	chipText: { color: '#9aa4b2', fontSize: 12 },
	chipTextActive: { color: '#e7ecf3' },

	sectionHeader: {
		marginTop: 10,
		paddingHorizontal: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	sectionTitle: { color: '#e7ecf3', fontSize: 16, fontWeight: '700' },
	link: { color: '#5b9cff', fontWeight: '700', fontSize: 13 },

	// Movies row
	cardMovie: { width: CARD_H_W },
	movieImage: {
		width: CARD_H_W,
		height: CARD_H_H,
		borderRadius: 10,
		backgroundColor: '#151922',
	},
	movieTitle: { color: '#e7ecf3', fontSize: 13, fontWeight: '700', marginTop: 6 },
	movieCode: { color: '#9aa4b2', fontSize: 11, marginTop: 4 },

	// Actress row
	cardActress: { width: CARD_V_W },
	actressImage: {
		width: CARD_V_W,
		height: CARD_V_W,
		borderRadius: 10,
		backgroundColor: '#151922',
	},
	actressName: { color: '#9aa4b2', fontSize: 12, marginTop: 6, width: CARD_H_W, textAlign: 'left' },
});
