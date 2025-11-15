import React, { useCallback, useEffect, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	FlatList,
	Image,
	ActivityIndicator,
	Pressable,
	StyleSheet,
	RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PAGE_SIZE = 10;

const FilmScreen = () => {
	const navigation = useNavigation();

	// Pagination state (normal mode)
	const [films, setFilms] = useState([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState(null);

	// Search state
	const [searchText, setSearchText] = useState('');
	const [isSearchMode, setIsSearchMode] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const [isSearchingRemote, setIsSearchingRemote] = useState(false);
	const [isSearchingExternal, setIsSearchingExternal] = useState(false);
	const [notFoundLocal, setNotFoundLocal] = useState(false);
	const [notFoundExternal, setNotFoundExternal] = useState(false);
	const [searchError, setSearchError] = useState(null);

	// ==========================
	// Fetch paginated list
	// ==========================

	const fetchFilms = useCallback(
		async (pageToLoad = 1, opts = { replace: false, refreshing: false }) => {
			if (isSearchMode) return; // Do not fetch paginated list in search mode

			try {
				if (opts.refreshing) {
					setIsRefreshing(true);
				} else {
					setIsLoading(true);
				}
				setError(null);

				const response = await fetch(
					`/api/movie?page=${pageToLoad}&pageSize=${PAGE_SIZE}`
				);
				if (!response.ok) {
					throw new Error('Failed to load films');
				}

				const data = await response.json();
				// Expect data.items + data.hasMore or similar.
				// Adjust mapping if your API differs.
				const items = Array.isArray(data.items) ? data.items : data;
				const newFilms = opts.replace ? items : [...films, ...items];

				setFilms(newFilms);
				setHasMore(items.length === PAGE_SIZE); // Simple heuristic
			} catch (e) {
				console.error('Error fetching films:', e);
				setError(e.message || 'Error loading films');
			} finally {
				setIsLoading(false);
				setIsRefreshing(false);
			}
		},
		[films, isSearchMode]
	);

	useEffect(() => {
		if (!isSearchMode) {
			fetchFilms(page, { replace: page === 1 });
		}
	}, [page, isSearchMode, fetchFilms]);

	const handleRefresh = () => {
		if (isSearchMode) return;
		setPage(1);
		fetchFilms(1, { replace: true, refreshing: true });
	};

	const handleLoadMore = () => {
		if (isSearchMode || isLoading || !hasMore) return;
		setPage(prev => prev + 1);
	};

	// ==========================
	// Search logic
	// ==========================

	const resetSearchState = () => {
		setIsSearchMode(false);
		setSearchResults([]);
		setIsSearchingRemote(false);
		setIsSearchingExternal(false);
		setNotFoundLocal(false);
		setNotFoundExternal(false);
		setSearchError(null);
	};

	const handleChangeText = text => {
		setSearchText(text);
		// Do NOT call remote search here – only on Search button
	};

	const handlePressSearch = async () => {
		const query = searchText.trim();
		if (!query) {
			return;
		}

		setIsSearchMode(true);
		setIsSearchingRemote(true);
		setIsSearchingExternal(false);
		setNotFoundLocal(false);
		setNotFoundExternal(false);
		setSearchError(null);

		try {
			const response = await fetch('/api/movie/search', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ query }), // adjust field name if needed
			});

			if (!response.ok) {
				throw new Error('Failed to search movies');
			}

			const data = await response.json();
			const items = Array.isArray(data.items) ? data.items : data;

			if (items.length > 0) {
				setSearchResults(items);
				setNotFoundLocal(false);
			} else {
				setSearchResults([]);
				setNotFoundLocal(true);
			}
		} catch (e) {
			console.error('Search error:', e);
			setSearchError(e.message || 'Search error');
			setSearchResults([]);
			setNotFoundLocal(true);
		} finally {
			setIsSearchingRemote(false);
		}
	};

	const handlePressSearchExternal = async () => {
		const query = searchText.trim();
		if (!query) return;

		setIsSearchingExternal(true);
		setNotFoundExternal(false);
		setSearchError(null);

		try {
			const response = await fetch('/api/movie/fetch-external', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ query }), // adjust field name if needed
			});

			if (!response.ok) {
				throw new Error('Failed to fetch from external sources');
			}

			const data = await response.json();

			// Here I assume API returns either:
			//  - a single movie object, or
			//  - { movie: {...} }
			const movie = data.movie || data;

			if (movie && movie.id) {
				// Navigate directly to FilmDetailScreen
				navigation.navigate('FilmDetail', { movieId: movie.id, code: movie.code });
			} else {
				setNotFoundExternal(true);
			}
		} catch (e) {
			console.error('External search error:', e);
			setSearchError(e.message || 'External search error');
			setNotFoundExternal(true);
		} finally {
			setIsSearchingExternal(false);
		}
	};

	const handlePressClear = () => {
		setSearchText('');
		resetSearchState();
		// Reload original list from page 1
		setPage(1);
		fetchFilms(1, { replace: true });
	};

	// ==========================
	// UI render
	// ==========================

	const renderFilmItem = ({ item }) => {
		return (
			<Pressable
				style={styles.card}
				onPress={() =>
					navigation.navigate('FilmDetail', { movieId: item.id, code: item.code })
				}
			>
				{item.poster || item.thumbs ? (
					<Image
						source={{ uri: item.poster || item.thumbs }}
						style={styles.poster}
						resizeMode="cover"
					/>
				) : (
					<View style={[styles.poster, styles.posterPlaceholder]}>
						<Text style={styles.posterPlaceholderText}>No image</Text>
					</View>
				)}
				<View style={styles.cardContent}>
					<Text style={styles.code}>{item.code}</Text>
					<Text style={styles.title} numberOfLines={2}>
						{item.title}
					</Text>
					{/* Rating stars placeholder – fill when you have rating data */}
					{/* <View style={styles.ratingRow}>...</View> */}
				</View>
			</Pressable>
		);
	};

	const renderListEmpty = () => {
		if (isLoading || isSearchingRemote || isSearchingExternal) {
			return null;
		}

		if (isSearchMode) {
			if (notFoundLocal && !isSearchingExternal) {
				return (
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>Movie not found</Text>
						<Pressable
							style={[styles.button, styles.buttonPrimary]}
							onPress={handlePressSearchExternal}
						>
							<Text style={styles.buttonPrimaryText}>Search on internet</Text>
						</Pressable>
						{notFoundExternal && (
							<Text style={styles.emptyTextSecondary}>
								Not found from external sources
							</Text>
						)}
						{searchError && (
							<Text style={styles.errorText}>{searchError}</Text>
						)}
					</View>
				);
			}

			if (notFoundExternal) {
				return (
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>Not found from external sources</Text>
						{searchError && (
							<Text style={styles.errorText}>{searchError}</Text>
						)}
					</View>
				);
			}
		}

		return (
			<View style={styles.emptyContainer}>
				<Text style={styles.emptyText}>No movies to display</Text>
			</View>
		);
	};

	const listData = isSearchMode ? searchResults : films;

	return (
		<View style={styles.container}>
			{/* Search Bar */}
			<View style={styles.searchBarContainer}>
				<TextInput
					value={searchText}
					onChangeText={handleChangeText}
					placeholder="Search by code or title"
					style={styles.searchInput}
					returnKeyType="search"
					onSubmitEditing={handlePressSearch}
				/>
				<Pressable style={styles.searchButton} onPress={handlePressSearch}>
					<Text style={styles.searchButtonText}>Search</Text>
				</Pressable>
				{isSearchMode && (
					<Pressable style={styles.clearButton} onPress={handlePressClear}>
						<Text style={styles.clearButtonText}>Clear</Text>
					</Pressable>
				)}
			</View>

			{/* Loading indicators for search */}
			{isSearchingRemote && (
				<View style={styles.statusRow}>
					<ActivityIndicator size="small" />
					<Text style={styles.statusText}>Searching movies...</Text>
				</View>
			)}

			{isSearchingExternal && (
				<View style={styles.statusRow}>
					<ActivityIndicator size="small" />
					<Text style={styles.statusText}>Searching on internet...</Text>
				</View>
			)}

			{error && !isSearchMode && (
				<View style={styles.statusRow}>
					<Text style={styles.errorText}>{error}</Text>
				</View>
			)}

			{/* List */}
			<FlatList
				data={listData}
				keyExtractor={item => String(item.id || item.code)}
				renderItem={renderFilmItem}
				contentContainerStyle={styles.listContent}
				ListEmptyComponent={renderListEmpty}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={handleRefresh}
						tintColor="#999"
					/>
				}
				onEndReached={!isSearchMode ? handleLoadMore : null}
				onEndReachedThreshold={0.5}
				ListFooterComponent={
					!isSearchMode && isLoading && films.length > 0 ? (
						<View style={styles.footerLoading}>
							<ActivityIndicator />
						</View>
					) : null
				}
			/>
		</View>
	);
};

export default FilmScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#080808',
	},
	searchBarContainer: {
		flexDirection: 'row',
		paddingHorizontal: 12,
		paddingVertical: 8,
		alignItems: 'center',
		gap: 8,
	},
	searchInput: {
		flex: 1,
		height: 40,
		borderRadius: 8,
		paddingHorizontal: 10,
		backgroundColor: '#1a1a1a',
		color: '#fff',
		borderWidth: 1,
		borderColor: '#333',
	},
	searchButton: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 8,
		backgroundColor: '#e11d48',
	},
	searchButtonText: {
		color: '#fff',
		fontWeight: '600',
		fontSize: 14,
	},
	clearButton: {
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderRadius: 8,
		backgroundColor: '#374151',
	},
	clearButtonText: {
		color: '#e5e7eb',
		fontSize: 12,
	},
	statusRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
		paddingVertical: 6,
		gap: 8,
	},
	statusText: {
		color: '#9ca3af',
		fontSize: 13,
	},
	errorText: {
		color: '#f87171',
		fontSize: 13,
	},
	listContent: {
		paddingHorizontal: 12,
		paddingBottom: 16,
	},
	card: {
		marginBottom: 12,
		borderRadius: 10,
		overflow: 'hidden',
		backgroundColor: '#111827',
		borderWidth: 1,
		borderColor: '#1f2937',
	},
	poster: {
		width: '100%',
		height: 220,
	},
	posterPlaceholder: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#1f2937',
	},
	posterPlaceholderText: {
		color: '#6b7280',
		fontSize: 12,
	},
	cardContent: {
		paddingHorizontal: 10,
		paddingVertical: 8,
	},
	code: {
		color: '#9ca3af',
		fontSize: 12,
		marginBottom: 2,
	},
	title: {
		color: '#f9fafb',
		fontSize: 14,
		fontWeight: '600',
	},
	footerLoading: {
		paddingVertical: 12,
	},
	emptyContainer: {
		padding: 16,
		alignItems: 'center',
	},
	emptyText: {
		color: '#d1d5db',
		fontSize: 14,
		marginBottom: 8,
	},
	emptyTextSecondary: {
		color: '#9ca3af',
		fontSize: 13,
		marginTop: 4,
	},
	button: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
		marginTop: 4,
	},
	buttonPrimary: {
		backgroundColor: '#e11d48',
	},
	buttonPrimaryText: {
		color: '#fff',
		fontWeight: '600',
		fontSize: 14,
	},
});
