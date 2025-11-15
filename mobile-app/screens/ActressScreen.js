// screens/ActressScreen.js
import * as React from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Image,
	Pressable,
	TextInput,
	Dimensions,
	ActivityIndicator,
	RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 3;
const GUTTER = 8;
const H_PADDING = 12;
const CARD_W = Math.floor((width - H_PADDING * 2 - GUTTER * (NUM_COLUMNS - 1)) / NUM_COLUMNS);

const PAGE_SIZE = 15;
const BASE_LIST_URL = 'http://192.168.1.77:3123/api/idol';
const BASE_SEARCH_URL = 'http://192.168.1.77:3123/api/idol/search';
const BASE_SEARCH_NOT_FOUND = 'http://192.168.1.77:3123/api/idol/search';

/* --------------------- helpers --------------------- */
function parseMeta(input) {
	if (!input) return {};
	if (typeof input === 'object') return input;
	try {
		return JSON.parse(input);
	} catch {
		return {};
	}
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
		.map((kv) => {
			const [k, v] = kv.split(':');
			return (v || k || '').split(',')[0];
		})
		.map((s) => s.trim())
		.filter(Boolean);
}
function mapIdolToActress(item) {
	const meta = parseMeta(item?.metadata);
	const name = item?.name || item?.jp || 'Unknown';
	const avatar = `http://192.168.1.77:3123/images/idol-avatars/${name}-avatar.jpg`;
	const m = parseMeasurements(item?.measurements);
	const height = parseHeight(item?.height);

	return {
		id: String(item.id),
		name,
		avatar,
		videosCount: item?.movies_count ? Number(item.movies_count) : 0,
		bio: item?.note || '',
		cover:
			meta.cover ||
			`https://picsum.photos/seed/cover_${encodeURIComponent(item?.id ?? 'x')}/1200/675`,
		tags: parseTags(meta),
		socials: meta?.socials || {},
		dob: item?.dob || null,
		debut: meta?.debut || null,
		measurements: {
			bust: m.bust || (item?.cup || ''),
			waist: m.waist || '',
			hips: m.hips || '',
			height,
			weight: meta?.weight || '',
		},
		country: item?.country || '',
		films: meta?.films || [],
		pictures: meta?.pictures || [],
	};
}

/* ===================================================== */
export default function ActressScreen() {
	const navigation = useNavigation();

	// paged list data (from GET /api/idol?page=..)
	const [items, setItems] = React.useState([]);
	const [page, setPage] = React.useState(1);
	const [loading, setLoading] = React.useState(false);
	const loadingRef = React.useRef(false);
	const [refreshing, setRefreshing] = React.useState(false);
	const [hasMore, setHasMore] = React.useState(true);

	// search
	const [query, setQuery] = React.useState('');
	const [remoteResults, setRemoteResults] = React.useState([]); // results from POST /api/idol/search
	const [searchLoading, setSearchLoading] = React.useState(false);
	const [externalLoading, setExternalLoading] = React.useState(false);
	const [externalError, setExternalError] = React.useState(null);

	const abortRef = React.useRef(null);

	/* --------------------- fetch paged list --------------------- */
	const fetchPage = React.useCallback(async (nextPage, replace = false) => {
		if (loadingRef.current) return;
		setLoading(true);
		loadingRef.current = true;

		console.log(`Fetching idols page ${nextPage}...`);

		if (abortRef.current) abortRef.current.abort();
		const controller = new AbortController();
		abortRef.current = controller;

		try {
			const url = `${BASE_LIST_URL}?page=${nextPage}&pageSize=${PAGE_SIZE}`;
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

	React.useEffect(() => {
		fetchPage(1, true);
	}, [fetchPage]);

	/* --------------------- remote search --------------------- */
	const remoteSearch = React.useCallback(
		async (q) => {
			if (!q || !q.trim()) {
				setRemoteResults([]);
				return;
			}
			setSearchLoading(true);
			try {
				const url = `${BASE_SEARCH_URL}?name=${encodeURIComponent(q.trim())}`;
				const res = await fetch(url, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
					// adjust this body to your real search format
					// body: JSON.stringify({ name: q.trim() }),
				});
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const arr = await res.json();
				console.log(arr.data)
				const mapped = (arr.data || []).map(mapIdolToActress);
				setRemoteResults(mapped);
			} catch (e) {
				console.warn('Search failed:', e?.message || e);
				setRemoteResults([]);
			} finally {
				setSearchLoading(false);
			}
		},
		[]
	);

	// called when text changes
	const onSearchTextChange = (text) => {
		setQuery(text);
		// we do NOT immediately call remote here;
		// we first let the user finish typing and try local first.
	};

	// when user submits search (keyboard search button), do remote
	const onSubmitSearch = () => {
		const q = query.trim();
		// if local has no matches or user explicitly searches, hit API
		remoteSearch(q);
	};

	// local filter over loaded pages
	const localFiltered = React.useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return items;
		return items.filter((a) => (a.name || '').toLowerCase().includes(q));
	}, [items, query]);

	// final list to render:
	// if we have remote results for the current query, show them
	// otherwise, show local filtered
	const dataToRender =
		query.trim().length > 0 && remoteResults.length > 0 ? remoteResults : localFiltered;

	const onEndReached = () => {
		// only paginate base list when not searching or when showing local results
		const isSearching = query.trim().length > 0;
		const showingRemote = isSearching && remoteResults.length > 0;
		if (!loading && hasMore && !showingRemote) {
			fetchPage(page + 1, false);
		}
	};

	const onRefresh = () => {
		setRefreshing(true);
		setRemoteResults([]); // clear remote on refresh
		fetchPage(1, true);
	};

	const openDetail = (actress) => {
		// now we only need name to fetch full data in ActressDetailScreen
		navigation.navigate('ActressDetail', { actressName: actress.name });
	};

	// ---- External fetch: when nothing found, try internet ----
	const fetchFromInternet = async () => {
		const q = query.trim();
		if (!q) return;
		setExternalLoading(true);
		setExternalError(null);
		try {
			const res = await fetch(BASE_SEARCH_NOT_FOUND, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				// Adjust this body to your contract (e.g., { query: q } or { name: q })
				body: JSON.stringify({
					"name": q,
					"updateRecord": true,
					"reuseSavedFile": true,
					"displayType": "json"
				}),
			});
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const payload = await res.json();
			const record = Array.isArray(payload) ? payload[0] : payload;
			const name = record?.name || record?.jp || null;
			if (name) {
				// hand off to detail screen — it will fetch full profile by name
				navigation.navigate('ActressDetail', { actressName: name });
			} else {
				setExternalError('Not found from external sources.');
			}
		} catch (e) {
			setExternalError(e?.message || 'External fetch failed.');
		} finally {
			setExternalLoading(false);
		}
	};

	const renderItem = ({ item }) => (
		<Pressable style={styles.card} onPress={() => openDetail(item)}>
			<Image source={{ uri: item.avatar }} style={styles.avatar} />
			<Text style={styles.name} numberOfLines={1}>
				{item.name}
			</Text>
			<Text style={styles.meta}>{item.videosCount} videos</Text>
		</Pressable>
	);

	const ListFooter = () => {
		// show footer only when base list is loading and we're not in remote mode
		if (searchLoading) return null;
		if (!loading || query.trim().length > 0) return null;
		return (
			<View style={{ paddingVertical: 16 }}>
				<ActivityIndicator color="#5b9cff" />
			</View>
		);
	};

	return (
		<View style={styles.container}>
			{/* Search */}
			<View style={styles.searchWrap}>
				<TextInput
					style={styles.search}
					placeholder="Search actresses..."
					placeholderTextColor="#9aa4b2"
					value={query}
					onChangeText={onSearchTextChange}
					returnKeyType="search"
					onSubmitEditing={onSubmitSearch}
				/>
			</View>

			{/* Optional search spinner */}
			{searchLoading ? (
				<View style={{ paddingHorizontal: 12, paddingBottom: 4 }}>
					<Text style={{ color: '#9aa4b2', fontSize: 12 }}>Searching in database…</Text>
				</View>
			) : null}

			{/* Grid */}
			{/* <FlatList
				key={`grid-${NUM_COLUMNS}`}
				data={dataToRender}
				keyExtractor={(item) => item.id}
				numColumns={NUM_COLUMNS}
				renderItem={renderItem}
				columnWrapperStyle={{ columnGap: GUTTER, paddingHorizontal: H_PADDING }}
				contentContainerStyle={{ rowGap: GUTTER, paddingBottom: 24 }}
				onEndReachedThreshold={0.4}
				onEndReached={onEndReached}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor="#5b9cff"
					/>
				}
				ListFooterComponent={ListFooter}
			/> */}

			{/* Results or empty state with external fetch */}
			{query.trim().length > 0 && !searchLoading && dataToRender.length === 0 ? (
				<View style={styles.emptyWrap}>
					{!searchLoading && <Text style={styles.emptyText}>Actress not found</Text>}
					<Pressable
						style={[styles.externalBtn, externalLoading && { opacity: 0.7 }]}
						onPress={fetchFromInternet}
						disabled={externalLoading}
					>
						<Text style={styles.externalBtnText}>
							{externalLoading ? 'Searching on internet…' : 'Search on internet'}
						</Text>
					</Pressable>
					{externalError ? (
						<Text style={styles.errorText}>{externalError}</Text>
					) : null}
				</View>
			) : (
				<FlatList
					key={`grid-${NUM_COLUMNS}`}
					data={dataToRender}
					keyExtractor={(item) => item.id}
					numColumns={NUM_COLUMNS}
					renderItem={renderItem}
					columnWrapperStyle={{ columnGap: GUTTER, paddingHorizontal: H_PADDING }}
					contentContainerStyle={{ rowGap: GUTTER, paddingBottom: 24 }}
					onEndReachedThreshold={0.4}
					onEndReached={onEndReached}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							tintColor="#5b9cff"
						/>
					}
					ListFooterComponent={ListFooter}
				/>
			)}
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
	},
	card: { width: CARD_W, alignItems: 'center' },
	avatar: {
		width: CARD_W,
		height: CARD_W,
		borderRadius: 12,
		backgroundColor: '#151922',
	},
	name: {
		color: '#e7ecf3',
		fontSize: 13,
		fontWeight: '700',
		marginTop: 6,
		textAlign: 'center',
		width: '100%',
	},
	meta: { color: '#9aa4b2', fontSize: 12, marginTop: 2, textAlign: 'center' },
	// Empty state + external search
	emptyWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
		paddingTop: 24,
	},
	emptyText: { color: '#e7ecf3', fontSize: 16, fontWeight: '700', marginBottom: 10 },
	externalBtn: {
		paddingVertical: 10,
		paddingHorizontal: 14,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#1f2430',
		backgroundColor: '#151922',
	},
	externalBtnText: { color: '#5b9cff', fontWeight: '700' },
	errorText: { color: '#ff7b7b', marginTop: 10 },
});

// a beatiful woman with long hair and big breats, nude completely, laying on bed, squeezing her breasts and spreading her legs, in bed room, high quality, realistic, photorealistic, 8k --ar 3:4 --v 5 --q 2