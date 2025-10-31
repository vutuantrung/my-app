// screens/ActressScreen.js
import * as React from 'react';
import {
	View, Text, StyleSheet, FlatList, Image, Pressable,
	TextInput, Dimensions, ActivityIndicator, RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatName } from '../helper';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 3;
const GUTTER = 8;
const H_PADDING = 12;
const CARD_W = Math.floor((width - H_PADDING * 2 - GUTTER * (NUM_COLUMNS - 1)) / NUM_COLUMNS);

const PAGE_SIZE = 15;
const BASE_URL = 'http://192.168.1.77:3123'; // ✅ your local API
const IDOL_ENDPOINT = `${BASE_URL}/api/idol`;

/** Utilities */
function parseMeta(input) {
	if (!input) return {};
	if (typeof input === 'object') return input;
	try { return JSON.parse(input); } catch { return {}; }
}
function parseMeasurements(m) {
	if (!m || typeof m !== 'string') return {};
	const [b, w, h] = m.split(/[^0-9.]+/).filter(Boolean);
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
			if (k === 'cup') return "Cup " + v.toUpperCase()
			return (v || k || '').split(',')[0];
		})
		.filter(Boolean)
		.map(s => formatName(s.trim()));
}

function parseMetaData(metaData) {
	const debutTime = metaData?.debut;
	const sign = metaData?.sign;
	const blood = metaData?.blood;
	const shoeSize = metaData?.shoe_size;
	const hairLength = metaData?.hair_length;
	const hairColor = metaData?.hair_color;
	const jjgirlData = metaData?.jjGirlImg;

	const raw = metaData?.tags;
	if (!raw) return [];
	const tags = String(raw)
		.split('|')
		.map(kv => {
			const [k, v] = kv.split(':');
			// console.log(k)
			if (k.toLowerCase() === 'cup_size') return ("Cup " + v.toUpperCase())
			return (v || k || '').split(',')[0];
		})
		.filter(Boolean)
		.map(s => s.trim());

	return {
		debutTime,
		sign,
		blood,
		shoeSize,
		hairLength,
		hairColor,
		jjgirlData,
		tags
	};
}

/** Map server idol -> Actress list item */
function mapIdolToActress(item) {
	const meta = parseMeta(item?.metadata);
	const name = item?.name || item?.jp || 'Unknown';
	const avatar = `http://192.168.1.77:3123/images/idol-avatars/${name}-avatar.jpg`;

	// const m = parseMeasurements(item?.measurements);
	// const height = parseHeight(item?.height);

	return {
		id: String(item.id),
		name,
		avatar,
		videosCount: item?.movies_count ?? 0,
		bio: item?.note || '',
		cover: meta.cover || `https://picsum.photos/seed/cover_${encodeURIComponent(item?.id ?? 'x')}/1200/675`,
		tags: parseTags(meta),
		socials: meta?.socials || {},
		dob: item?.dob || null,
		debut: meta?.debut || null,
		measurements: meta?.measurements || "",
		country: item?.country || '',
		films: meta?.films || [],
		pictures: meta?.pictures || [],
	};
}

export default function ActressScreen() {
	const navigation = useNavigation();

	const [items, setItems] = React.useState([]);
	const [page, setPage] = React.useState(1);
	const [loading, setLoading] = React.useState(false);
	const loadingRef = React.useRef(false);
	const [refreshing, setRefreshing] = React.useState(false);
	const [hasMore, setHasMore] = React.useState(true);
	const [query, setQuery] = React.useState('');

	const abortRef = React.useRef(null);

	const fetchPage = React.useCallback(async (nextPage, replace = false) => {
		if (loadingRef.current) return;
		setLoading(true);
		loadingRef.current = true;

		console.log(`Fetching idols page ${nextPage}...`);

		if (abortRef.current) abortRef.current.abort();
		const controller = new AbortController();
		abortRef.current = controller;

		try {
			const url = `${IDOL_ENDPOINT}?page=${nextPage}&pageSize=${PAGE_SIZE}`;
			const res = await fetch(url, { signal: controller.signal });
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const json = await res.json();                // ✅ server returns { data: [...] }
			const arr = Array.isArray(json?.data) ? json.data : [];
			const mapped = arr.map(mapIdolToActress);

			setItems(prev => (replace ? mapped : [...prev, ...mapped]));
			setPage(nextPage);
			setHasMore(arr.length === PAGE_SIZE);
		} catch (e) {
			if (e?.name !== 'AbortError') console.warn('Failed to fetch idols:', e?.message || e);
		} finally {
			setLoading(false);
			loadingRef.current = false;
			setRefreshing(false);
		}
	}, []);

	// React.useEffect(() => { fetchPage(1, true); }, [fetchPage]);
	const didInit = React.useRef(false);
	React.useEffect(() => {
		if (didInit.current) return;      // guard StrictMode/dev double-run
		didInit.current = true;
		fetchPage(1, true);
	}, [fetchPage]);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		fetchPage(1, true);
	}, [fetchPage]);

	const onEndLock = React.useRef(false);
	const onEndReached = () => {
		if (onEndLock.current) return;
		if (!loadingRef.current && hasMore && query.trim().length === 0) {
			onEndLock.current = true;
			fetchPage(page + 1, false);
		}
	};

	const filtered = React.useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return items;
		return items.filter(a => (a.name || '').toLowerCase().includes(q));
	}, [items, query]);

	const openDetail = (actress) => navigation.navigate('ActressDetail', { actressName: actress.name });

	const renderItem = ({ item }) => {
		// console.log(item.avatar)
		return (
			<Pressable key={item.id} style={styles.card} onPress={() => openDetail(item)}>
				<Image source={{ uri: item.avatar }} style={styles.avatar} />
				<Text style={styles.name} numberOfLines={1}>{formatName(item.name)}</Text>
				<Text style={styles.meta}>{item.videosCount} video(s)</Text>
			</Pressable>
		)
	};

	const ListFooter = () =>
		!loading || query.trim().length > 0 ? null : (
			<View style={{ paddingVertical: 16 }}>
				<ActivityIndicator color="#5b9cff" />
			</View>
		);

	return (
		<View style={styles.container}>
			<View style={styles.searchWrap}>
				<TextInput
					style={styles.search}
					placeholder="Search actresses..."
					placeholderTextColor="#9aa4b2"
					value={query}
					onChangeText={setQuery}
					returnKeyType="search"
				/>
			</View>

			<FlatList
				key={`grid-${NUM_COLUMNS}`}
				data={filtered}
				keyExtractor={(item) => item.id}
				numColumns={NUM_COLUMNS}
				renderItem={renderItem}
				columnWrapperStyle={{ columnGap: GUTTER, paddingHorizontal: H_PADDING }}
				contentContainerStyle={{ rowGap: GUTTER, paddingBottom: 24 }}
				onMomentumScrollBegin={() => { onEndLock.current = false; }}
				onEndReachedThreshold={0.4}
				onEndReached={onEndReached}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#5b9cff" />
				}
				ListFooterComponent={ListFooter}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#0f1115' },
	searchWrap: { padding: 12 },
	search: {
		backgroundColor: '#151922',
		color: '#e7ecf3',
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 10,
		borderWidth: 1,
		borderColor: '#1f2430',
		marginTop: 20
	},
	card: { width: CARD_W, alignItems: 'center' },
	avatar: {
		width: CARD_W, height: CARD_W, borderRadius: 12, backgroundColor: '#151922',
	},
	name: {
		color: '#e7ecf3', fontSize: 13, fontWeight: '700', marginTop: 6, textAlign: 'center', width: '100%',
	},
	meta: { color: '#9aa4b2', fontSize: 12, marginTop: 2, textAlign: 'center' },
});
//lets add a new feature in Search actress in ActressScreen: 