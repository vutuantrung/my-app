// screens/ActressScreen.js
import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
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
	const [items, setItems] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	// search
	const [query, setQuery] = useState('');
	const [remoteResults, setRemoteResults] = useState([]); // results from POST /api/idol/search
	const [searchLoading, setSearchLoading] = useState(false);
	const [externalLoading, setExternalLoading] = useState(false);
	const [externalError, setExternalError] = useState(null);

	// Filter + Order
	// filter: 'none' | 'my_favorite'
	const [filter, setFilter] = useState('none');
	// orderBy: 'none' | 'created_time' | 'release_time'
	const [orderBy, setOrderBy] = useState('none');
	// order direction: 'asc' | 'desc'
	const [orderDirection, setOrderDirection] = useState('desc');

	// dropdown open flags
	const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
	const [orderDropdownOpen, setOrderDropdownOpen] = useState(false);

	const loadingRef = useRef(false);
	const abortRef = useRef(null);

	/* --------------------- fetch paged list --------------------- */
	const fetchIdolData = useCallback(
		async (nextPage, replace = false) => {
			if (loadingRef.current) return;
			setLoading(true);
			loadingRef.current = true;

			if (abortRef.current) abortRef.current.abort();
			const controller = new AbortController();
			abortRef.current = controller;

			try {
				let url = `${BASE_LIST_URL}?page=${nextPage}&pageSize=${PAGE_SIZE}`;

				// filter (My Favorite)
				if (filter === 'my_favorite') {
					url += '&my_favorite=1';
				}

				// order (Created time / Release time)
				if (orderBy !== 'none') {
					if (orderBy === 'created_time') url += "&sortBy=created_time";
					if (orderBy === 'movies_count') url += "&sortBy=movies_count";
					if (orderBy === 'cup') url += "&sortBy=cup"
					if (orderBy === 'note') url += "&sortBy=note"
				}
				url += `&sortOrder=${orderDirection}`;

				const res = await fetch(url, { signal: controller.signal });
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const json = await res.json(); // server returns { data: [...] }
				const arr = Array.isArray(json?.data) ? json.data : [];
				const mapped = arr.map(mapIdolToActress);

				setItems(prev => (replace ? mapped : [...prev, ...mapped]));
				setPage(nextPage);
				setHasMore(arr.length === PAGE_SIZE);
			} catch (e) {
				console.error('Error fetching idols:', e);
				if (e?.name !== 'AbortError')
					console.warn('Failed to fetch idols:', e?.message || e);
			} finally {
				setLoading(false);
				loadingRef.current = false;
				setRefreshing(false);
			}
		},
		[filter, orderBy, orderDirection]
	);

	useEffect(() => {
		fetchIdolData(1, true);
	}, [fetchIdolData]);

	// Reload when filter/order changes
	useEffect(() => {
		setRemoteResults([]);
		fetchIdolData(1, true);
	}, [filter, orderBy, orderDirection, fetchIdolData]);

	/* --------------------- remote search --------------------- */
	const remoteSearch = useCallback(
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
					// If your backend expects POST:
					// body: JSON.stringify({ name: q.trim() }),
				});
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const arr = await res.json();
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
		// no immediate remote search; only on submit
	};

	// when user submits search (keyboard search button), do remote
	const onSubmitSearch = () => {
		const q = query.trim();
		remoteSearch(q);
	};

	// local filter over loaded pages
	const localFiltered = useMemo(() => {
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
		// only paginate base list when not showing remote results
		const isSearching = query.trim().length > 0;
		const showingRemote = isSearching && remoteResults.length > 0;
		if (!loading && hasMore && !showingRemote) {
			fetchIdolData(page + 1, false);
		}
	};

	const onRefresh = () => {
		setRefreshing(true);
		setRemoteResults([]); // clear remote on refresh
		fetchIdolData(1, true);
	};

	const openDetail = (actress) => {
		// we only need name to fetch full data in ActressDetailScreen
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
				body: JSON.stringify({
					name: q,
					updateRecord: true,
					reuseSavedFile: true,
					displayType: 'json',
				}),
			});
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const payload = await res.json();
			const record = Array.isArray(payload) ? payload[0] : payload;
			const name = record?.name || record?.jp || null;
			if (name) {
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

	const currentFilterLabel = filter === 'none' ? 'None' : 'My Favorite';

	let currentOrderLabel = 'None';
	if (orderBy === "created_time") currentOrderLabel = "Cre.Time";
	if (orderBy === "cup") currentOrderLabel = "Cup";
	if (orderBy === "movies_count") currentOrderLabel = "M.Count";
	if (orderBy === "Note") currentOrderLabel = "Note";

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

			{/* Filter + Order row */}
			<View style={styles.filterRow}>
				{/* Filter dropdown */}
				<View style={styles.filterWrap}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Pressable
							style={[styles.filterButton, { flex: 1 }]}
							onPress={() => {
								setFilterDropdownOpen(open => !open);
								setOrderDropdownOpen(false);
							}}
						>
							<Text style={styles.filterLabel}>Filter:</Text>
							<Text style={styles.filterValue}>{currentFilterLabel}</Text>
							<Text style={styles.filterChevron}>
								{filterDropdownOpen ? '▲' : '▼'}
							</Text>
						</Pressable>
					</View>

					{filterDropdownOpen && (
						<View style={styles.filterDropdown}>
							<Pressable
								style={styles.filterOption}
								onPress={() => {
									setFilter('none');
									setFilterDropdownOpen(false);
								}}
							>
								<Text style={[
									styles.filterOptionText,
									filter === 'none' &&
									styles.filterOptionTextActive,
								]}>
									None
								</Text>
							</Pressable>
							<Pressable
								style={styles.filterOption}
								onPress={() => {
									setFilter('my_favorite');
									setFilterDropdownOpen(false);
								}}
							>
								<Text style={[
									styles.filterOptionText,
									filter === 'my_favorite' &&
									styles.filterOptionTextActive,
								]}>
									My Favorite
								</Text>
							</Pressable>
						</View>
					)}
				</View>

				{/* Order by dropdown + ASC/DESC icon */}
				<View style={styles.filterWrap}>
					<View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
						<Pressable
							style={[styles.filterButton, { flex: 1 }]}
							onPress={() => {
								setOrderDropdownOpen(open => !open);
								setFilterDropdownOpen(false);
							}}
						>
							<Text style={styles.filterLabel}>Order by:</Text>
							<Text style={styles.filterValue}>{currentOrderLabel}</Text>
							<Text style={styles.filterChevron}>
								{orderDropdownOpen ? '▲' : '▼'}
							</Text>
						</Pressable>

						{/* ASC/DESC toggle */}
						<Pressable
							style={styles.orderDirButton}
							onPress={() =>
								setOrderDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
							}
						>
							<Text style={styles.orderDirText}>
								{orderDirection === 'asc' ? '↑' : '↓'}
							</Text>
						</Pressable>
					</View>

					{orderDropdownOpen && (
						<View style={styles.filterDropdown}>
							<Pressable
								style={styles.filterOption}
								onPress={() => {
									setOrderBy('none');
									setOrderDropdownOpen(false);
								}}>
								<Text style={[
									styles.filterOptionText,
									orderBy === 'none' &&
									styles.filterOptionTextActive
								]}>
									None
								</Text>
							</Pressable>
							<Pressable
								style={styles.filterOption}
								onPress={() => {
									setOrderBy('created_time');
									setOrderDropdownOpen(false);
								}}>
								<Text style={[
									styles.filterOptionText,
									orderBy === 'created_time' &&
									styles.filterOptionTextActive,
								]}>
									Created time
								</Text>
							</Pressable>
							<Pressable
								style={styles.filterOption}
								onPress={() => {
									setOrderBy('movies_count');
									setOrderDropdownOpen(false);
								}}>
								<Text style={[
									styles.filterOptionText,
									orderBy === 'movies_count' &&
									styles.filterOptionTextActive,
								]}>
									Movies count
								</Text>
							</Pressable>
							<Pressable
								style={styles.filterOption}
								onPress={() => {
									setOrderBy('cup');
									setOrderDropdownOpen(false);
								}}>
								<Text style={[
									styles.filterOptionText,
									orderBy === 'cup' &&
									styles.filterOptionTextActive,
								]}>
									Cup
								</Text>
							</Pressable>
							<Pressable
								style={styles.filterOption}
								onPress={() => {
									setOrderBy('note');
									setOrderDropdownOpen(false);
								}}>
								<Text style={[
									styles.filterOptionText,
									orderBy === 'note' &&
									styles.filterOptionTextActive,
								]}>
									Note
								</Text>
							</Pressable>
						</View>
					)}
				</View>
			</View>

			{/* Optional search spinner */}
			{searchLoading && (
				<View style={{ paddingHorizontal: 12, paddingBottom: 4 }}>
					<Text style={{ color: '#9aa4b2', fontSize: 12 }}>
						Searching in database…
					</Text>
				</View>
			)}

			{/* Results or empty state with external fetch */}
			{query.trim().length > 0 && !searchLoading && dataToRender.length === 0 ? (
				<View style={styles.emptyWrap}>
					{!searchLoading && (
						<Text style={styles.emptyText}>Actress not found</Text>
					)}
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

	/* Filter + Order */
	filterRow: {
		flexDirection: 'row',
		paddingHorizontal: 12,
		gap: 8,
		marginBottom: 4,
	},
	filterWrap: {
		flex: 1,
		position: 'relative', // for overlay dropdown
	},
	filterButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#151922',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#1f2430',
		paddingHorizontal: 10,
		paddingVertical: 8,
	},
	filterLabel: {
		color: '#9aa4b2',
		fontSize: 13,
		marginRight: 6,
	},
	filterValue: {
		color: '#e7ecf3',
		fontSize: 13,
		fontWeight: '600',
		flex: 1,
	},
	filterChevron: {
		color: '#9aa4b2',
		fontSize: 12,
	},
	filterDropdown: {
		position: 'absolute',
		top: '100%',
		left: 0,
		right: 0,
		marginTop: 4,
		backgroundColor: '#151922',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#1f2430',
		overflow: 'hidden',
		zIndex: 20,
		elevation: 4,
	},
	filterOption: {
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	filterOptionText: {
		color: '#9aa4b2',
		fontSize: 13,
	},
	filterOptionTextActive: {
		color: '#e7ecf3',
		fontWeight: '700',
	},
	orderDirButton: {
		width: 32,
		height: 32,
		borderRadius: 8,
		backgroundColor: '#151922',
		borderWidth: 1,
		borderColor: '#1f2430',
		alignItems: 'center',
		justifyContent: 'center',
	},
	orderDirText: {
		color: '#e7ecf3',
		fontSize: 14,
		fontWeight: '700',
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
