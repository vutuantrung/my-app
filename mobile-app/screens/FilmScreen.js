// screens/FilmScreen.js
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Image,
	Pressable,
	TextInput,
	ActivityIndicator,
	RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PAGE_SIZE = 15;
const BASE_LIST_URL = 'http://192.168.1.77:3123/api/movie';
const BASE_SEARCH_URL = 'http://192.168.1.77:3123/api/movie/search';
const BASE_SEARCH_NOT_FOUND = 'http://192.168.1.77:3123/api/movie/search';

const SEARCH_SUGGESTIONS = [
	'IPZZ', 'MIDE', 'CAWD', 'STAR', 'JUY', 'SNIS', 'SSIS', 'ADN', 'WANZ', 'SONE', 'MEYD', "MDTM", "HMN"
];

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

function mapMovieToFilm(item) {
	const meta = parseMeta(item?.metadata);
	const code = item?.code || '';
	const title = item?.title || 'Unknown';
	const poster =
		item?.thumbs ||
		item?.thumbs_short ||
		meta.poster ||
		`https://picsum.photos/seed/movie_${encodeURIComponent(code || String(item?.id ?? 'x'))}/800/1200`;

	const rating =
		item?.rating != null
			? Number(item.rating)
			: meta?.rating != null
				? Number(meta.rating)
				: 0;

	return {
		id: String((item?.id ?? code) || Math.random().toString(36).slice(2)),
		code,
		title,
		poster,
		rating,
		runtime: meta?.runtime || item?.runtime || null,
		studio: meta?.studio || item?.studio || '',
		tags: parseTags(meta),
		raw: item,
	};
}

/* ===================================================== */
export default function FilmScreen() {
	const navigation = useNavigation();

	// paged list data
	const [items, setItems] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	// search
	const [query, setQuery] = useState('');
	const [remoteResults, setRemoteResults] = useState([]);
	const [searchLoading, setSearchLoading] = useState(false);
	const [externalLoading, setExternalLoading] = useState(false);
	const [externalError, setExternalError] = useState(null);

	// NEW: separate filter + order states
	// filter: 'none' | 'my_favorite'
	const [filter, setFilter] = useState('none');
	// orderBy: 'none' | 'created_time' | 'release_date'
	const [orderBy, setOrderBy] = useState('none');
	// order direction: 'asc' | 'desc'
	const [orderDirection, setOrderDirection] = useState('desc');

	// dropdown open flags
	const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
	const [orderDropdownOpen, setOrderDropdownOpen] = useState(false);

	const loadingRef = useRef(false);
	const abortRef = useRef(null);

	/* --------------------- fetch paged list (with filter + order) --------------------- */
	const fetchMovieData = useCallback(
		async (nextPage, replace = false) => {
			if (loadingRef.current) return;
			setLoading(true);
			loadingRef.current = true;

			if (abortRef.current) abortRef.current.abort();
			const controller = new AbortController();
			abortRef.current = controller;

			try {
				let url = `${BASE_LIST_URL}?page=${nextPage}&pageSize=${PAGE_SIZE}`;

				// filter
				if (filter === 'my_favorite') {
					// align param name with your backend
					url += '&my_favorite=1';
				}

				// order
				if (orderBy === 'created_time') {
					// adjust key to your API (e.g. sortBy=created_at&order=desc)
					url += '&sortBy=created_time';
				} else if (orderBy === 'release_date') {
					// adjust to match your backend contract
					url += '&sortBy=release_date';
				}
				console.log(orderDirection)
				url += `&sortOrder=${orderDirection}`;

				const res = await fetch(url, { signal: controller.signal });
				if (!res.ok) throw new Error(`HTTP ${res.status}`);

				const json = await res.json();
				const arr = Array.isArray(json?.data) ? json.data : [];
				const mapped = arr.map(mapMovieToFilm);

				setItems((prev) => (replace ? mapped : [...prev, ...mapped]));
				setPage(nextPage);
				setHasMore(arr.length === PAGE_SIZE);
			} catch (e) {
				console.error('Error fetching movies:', e);
				if (e?.name !== 'AbortError') {
					console.warn('Failed to fetch movies:', e?.message || e);
				}
			} finally {
				setLoading(false);
				loadingRef.current = false;
				setRefreshing(false);
			}
		},
		[filter, orderBy, orderDirection]
	);

	// initial load
	useEffect(() => {
		fetchMovieData(1, true);
	}, [fetchMovieData]);

	// reload when filter or orderBy changes
	useEffect(() => {
		setRemoteResults([]);
		fetchMovieData(1, true);
	}, [filter, orderBy, orderDirection, fetchMovieData]);

	/* --------------------- remote search --------------------- */
	const remoteSearch = useCallback(async (q) => {
		if (!q || !q.trim()) {
			setRemoteResults([]);
			return;
		}
		setSearchLoading(true);
		try {
			const url = `${BASE_SEARCH_URL}?code=${encodeURIComponent(q.trim())}`;
			const res = await fetch(url, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const json = await res.json();
			const arr = Array.isArray(json?.data) ? json.data : [];
			const mapped = arr.map(mapMovieToFilm);
			setRemoteResults(mapped);
		} catch (e) {
			console.warn('Movie search failed:', e?.message || e);
			setRemoteResults([]);
		} finally {
			setSearchLoading(false);
		}
	}, []);

	const onSearchTextChange = (text) => {
		setQuery(text);
	};

	const onSubmitSearch = () => {
		const q = query.trim();
		remoteSearch(q);
	};

	/* --------------------- local filter & suggestion text --------------------- */

	const localFiltered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return items;
		return items.filter((m) => {
			const t = (m.title || '').toLowerCase();
			const c = (m.code || '').toLowerCase();
			return t.includes(q) || c.includes(q);
		});
	}, [items, query]);

	const dataToRender =
		query.trim().length > 0 && remoteResults.length > 0
			? remoteResults
			: localFiltered;

	const suggestion = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return '';

		const match = SEARCH_SUGGESTIONS.find((text) =>
			String(text).toLowerCase().startsWith(q)
		);

		console.log('Suggestion match:', match);

		return match || '';
	}, [query]);

	/* --------------------- pagination controls --------------------- */

	const onEndReached = () => {
		const isSearching = query.trim().length > 0;
		const showingRemote = isSearching && remoteResults.length > 0;
		if (!loading && hasMore && !showingRemote) {
			fetchMovieData(page + 1, false);
		}
	};

	const onRefresh = () => {
		setRefreshing(true);
		setRemoteResults([]);
		fetchMovieData(1, true);
	};

	/* --------------------- navigate --------------------- */

	const openDetail = (film) => {
		navigation.navigate('FilmDetail', {
			contentId: film.raw?.contentId,
			code: film.code,
		});
	};

	/* ------------------- External fetch when not found ------------------- */

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
					code: q,
					updateRecord: true,
					reuseSavedFile: true,
					displayType: 'json',
				}),
			});
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const payload = await res.json();
			console.log('[payload]', payload)
			const record = Array.isArray(payload) ? payload[0] : payload;

			const recCode = record?.code || null;
			const recContentId = record?.contentId ?? null;

			if (recCode || recContentId) {
				navigation.navigate('FilmDetail', {
					contentId: recContentId,
					code: recCode,
				});
			} else {
				setExternalError('Not found from external sources.');
			}
		} catch (e) {
			setExternalError(e?.message || 'External fetch failed.');
		} finally {
			setExternalLoading(false);
		}
	};

	/* --------------------- render --------------------- */

	const renderItem = ({ item }) => (
		<Pressable style={styles.card} onPress={() => openDetail(item)}>
			<Image source={{ uri: item.poster }} style={styles.poster} />
			<View style={styles.cardBody}>
				<Text style={styles.code} numberOfLines={1}>
					{item.code || 'No code'}
				</Text>
				<Text style={styles.title} numberOfLines={2}>
					{item.title}
				</Text>
				{item.rating > 0 ? (
					<Text style={styles.rating}>{'★ ' + item.rating.toFixed(1)}</Text>
				) : null}
			</View>
		</Pressable>
	);

	const ListFooter = () => {
		if (searchLoading) return null;
		if (!loading || query.trim().length > 0) return null;
		return (
			<View style={{ paddingVertical: 16 }}>
				<ActivityIndicator color="#5b9cff" />
			</View>
		);
	};

	const currentFilterLabel =
		filter === 'none'
			? 'None'
			: 'My Favorite';

	const currentOrderLabel =
		orderBy === 'none'
			? 'None'
			: orderBy === 'created_time'
				? 'Created time'
				: 'Release time';

	return (
		<View style={styles.container}>
			{/* Search + suggestion */}
			<View style={styles.searchWrap}>
				<View style={styles.searchInner}>
					{suggestion ? (
						<Text style={styles.suggestionText}>{suggestion}</Text>
					) : null}
					<TextInput
						style={styles.search}
						placeholder="Search movies by code or title..."
						placeholderTextColor="#9aa4b2"
						value={query}
						onChangeText={onSearchTextChange}
						returnKeyType="search"
						onSubmitEditing={onSubmitSearch}
					/>
				</View>
			</View>

			{/* NEW: Filter + Order row */}
			<View style={styles.filterRow}>
				{/* Filter dropdown */}
				<View style={styles.filterWrap}>
					<Pressable
						style={styles.filterButton}
						onPress={() => {
							setFilterDropdownOpen((open) => !open);
							setOrderDropdownOpen(false);
						}}
					>
						<Text style={styles.filterLabel}>Filter:</Text>
						<Text style={styles.filterValue}>{currentFilterLabel}</Text>
						<Text style={styles.filterChevron}>
							{filterDropdownOpen ? '▲' : '▼'}
						</Text>
					</Pressable>

					{filterDropdownOpen && (
						<View style={styles.filterDropdown}>
							<Pressable
								style={styles.filterOption}
								onPress={() => {
									setFilter('none');
									setFilterDropdownOpen(false);
								}}
							>
								<Text
									style={[
										styles.filterOptionText,
										filter === 'none' &&
										styles.filterOptionTextActive,
									]}
								>
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
								<Text
									style={[
										styles.filterOptionText,
										filter === 'my_favorite' &&
										styles.filterOptionTextActive,
									]}
								>
									My Favorite
								</Text>
							</Pressable>
						</View>
					)}
				</View>

				{/* Order by dropdown */}
				{/* Order by dropdown + ASC/DESC icon */}
				<View style={styles.filterWrap}>
					<View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
						<Pressable
							style={[styles.filterButton, { flex: 1 }]}
							onPress={() => {
								setOrderDropdownOpen((open) => !open);
								setFilterDropdownOpen(false);
							}}
						>
							<Text style={styles.filterLabel}>Order by:</Text>
							<Text style={styles.filterValue}>{currentOrderLabel}</Text>
							<Text style={styles.filterChevron}>
								{orderDropdownOpen ? '▲' : '▼'}
							</Text>
						</Pressable>

						{/* NEW: ASC/DESC toggle button */}
						<Pressable
							style={styles.orderDirButton}
							onPress={() =>
								setOrderDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
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
								}}
							>
								<Text
									style={[
										styles.filterOptionText,
										orderBy === 'none' && styles.filterOptionTextActive,
									]}
								>
									None
								</Text>
							</Pressable>
							<Pressable
								style={styles.filterOption}
								onPress={() => {
									setOrderBy('created_time');
									setOrderDropdownOpen(false);
								}}
							>
								<Text
									style={[
										styles.filterOptionText,
										orderBy === 'created_time' &&
										styles.filterOptionTextActive,
									]}
								>
									Created time
								</Text>
							</Pressable>
							<Pressable
								style={styles.filterOption}
								onPress={() => {
									setOrderBy('release_date');
									setOrderDropdownOpen(false);
								}}
							>
								<Text
									style={[
										styles.filterOptionText,
										orderBy === 'release_date' &&
										styles.filterOptionTextActive,
									]}
								>
									Release time
								</Text>
							</Pressable>
						</View>
					)}
				</View>

			</View>

			{/* Search loading hint */}
			{searchLoading && (
				<View style={{ paddingHorizontal: 12, paddingBottom: 4 }}>
					<Text style={{ color: '#9aa4b2', fontSize: 12 }}>
						Searching in database…
					</Text>
				</View>
			)}

			{/* Results or empty state with external fetch */}
			{query.trim().length > 0 &&
				!searchLoading &&
				dataToRender.length === 0 ? (
				<View style={styles.emptyWrap}>
					<Text style={styles.emptyText}>Movie not found</Text>
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
					data={dataToRender}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
					contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}
					ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
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

	/* Search */
	searchWrap: { padding: 12 },
	searchInner: {
		position: 'relative',
	},
	search: {
		backgroundColor: '#151922',
		color: '#e7ecf3',
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 10,
		borderWidth: 1,
		borderColor: '#1f2430',
		fontSize: 14,
	},
	suggestionText: {
		position: 'absolute',
		left: 12,
		top: 10,
		color: 'rgba(154,164,178,0.35)',
		fontSize: 14,
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
		position: 'relative',
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

	/* Cards */
	card: {
		borderRadius: 12,
		overflow: 'hidden',
		backgroundColor: '#151922',
		borderWidth: 1,
		borderColor: '#1f2430',
	},
	poster: {
		width: '100%',
		height: 210,
		backgroundColor: '#151922',
	},
	cardBody: {
		paddingHorizontal: 10,
		paddingVertical: 8,
	},
	code: {
		color: '#9aa4b2',
		fontSize: 12,
		marginBottom: 2,
	},
	title: {
		color: '#e7ecf3',
		fontSize: 14,
		fontWeight: '700',
	},
	rating: {
		color: '#facc15',
		fontSize: 12,
		marginTop: 4,
	},

	/* Empty state + external search */
	emptyWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
		paddingTop: 24,
	},
	emptyText: {
		color: '#e7ecf3',
		fontSize: 16,
		fontWeight: '700',
		marginBottom: 10,
	},
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
});
