// screens/ActressFilmScreen.js
import { useState, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
	View, Text, StyleSheet, FlatList, Image, Pressable, TextInput, Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 2;
const GUTTER = 12;
const H_PADDING = 16;
const CARD_W = Math.floor((width - H_PADDING * 2 - GUTTER * (NUM_COLUMNS - 1)) / NUM_COLUMNS);
const PAGE_SIZE = 20;
const SORTS = [
	{ key: 'title', label: 'Title' },
	{ key: 'code', label: 'Code' },
	{ key: 'date', label: 'Date' }, // used if your film items have releaseDate
];

export default function ActressFilmScreen() {
	const navigation = useNavigation();
	const route = useRoute();
	const { films = [], actressName = 'Actress' } = route?.params ?? {};

	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const [sortKey, setSortKey] = useState('title');   // 'title' | 'code' | 'date'
	const [sortDir, setSortDir] = useState('asc');

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return films;
		return films.filter(f =>
			(f.title ?? '').toLowerCase().includes(q) ||
			(f.code ?? '').toLowerCase().includes(q)
		);
	}, [films, query]);

	const sorted = useMemo(() => {
		const arr = [...filtered];
		const dir = sortDir === 'asc' ? 1 : -1;
		arr.sort((a, b) => {
			const av =
				sortKey === 'title' ? (a.title ?? '') :
					sortKey === 'code' ? (a.code ?? '') :
						(a.releaseDate ?? ''); // 'date'
			const bv =
				sortKey === 'title' ? (b.title ?? '') :
					sortKey === 'code' ? (b.code ?? '') :
						(b.releaseDate ?? '');
			if (av < bv) return -1 * dir;
			if (av > bv) return 1 * dir;
			return 0;
		});
		return arr;
	}, [filtered, sortKey, sortDir]);

	const data = useMemo(() => sorted.slice(0, PAGE_SIZE * page), [sorted, page]);

	const canLoadMore = data.length < filtered.length;

	const onEndReached = () => {
		if (canLoadMore) setPage(p => p + 1);
	};

	const openFilm = (item) => {
		// Construct a FilmDetail-friendly payload (use real fields if available)
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
			actresses: [actressName],
			scenes: item.scenes || Array.from({ length: 6 }).map((_, i) => ({
				id: `${item.id}-sc-${i + 1}`,
				uri: `https://picsum.photos/seed/${item.id}_sc_${i + 1}/800/450`,
			})),
		};
		navigation.navigate('FilmDetail', { film: filmPayload });
	};

	const renderItem = ({ item }) => (
		<Pressable style={styles.card} onPress={() => openFilm(item)}>
			<Image source={{ uri: item.cover }} style={styles.cover} />
			<Text style={styles.title} numberOfLines={1}>{item.title}</Text>
			<Text style={styles.code}>{item.code}</Text>
		</Pressable>
	);

	return (
		<View style={styles.container}>
			{/* Header / Search */}
			<View style={styles.searchWrap}>
				<TextInput
					style={styles.search}
					placeholder={`Search ${actressName}'s films...`}
					placeholderTextColor="#9aa4b2"
					value={query}
					onChangeText={(t) => { setQuery(t); setPage(1); }}
					returnKeyType="search"
				/>
			</View>

			{/* Sort toolbar */}
			<View style={styles.sortBar}>
				<View style={styles.sortChips}>
					{SORTS.map(s => (
						<Pressable
							key={s.key}
							onPress={() => { setSortKey(s.key); setPage(1); }}
							style={[styles.chip, sortKey === s.key && styles.chipActive]}
						>
							<Text style={[styles.chipText, sortKey === s.key && styles.chipTextActive]}>
								{s.label}
							</Text>
						</Pressable>
					))}
				</View>
				<Pressable
					onPress={() => { setSortDir(d => (d === 'asc' ? 'desc' : 'asc')); setPage(1); }}
					style={styles.dirBtn}
					hitSlop={8}
				>
					<Text style={styles.dirText}>{sortDir === 'asc' ? '↑' : '↓'}</Text>
				</Pressable>
			</View>

			{/* Grid */}
			<FlatList
				key={`grid-${NUM_COLUMNS}`}  // stable columns, no runtime changes
				data={data}
				keyExtractor={(f) => f.id}
				renderItem={renderItem}
				numColumns={NUM_COLUMNS}
				columnWrapperStyle={{ columnGap: GUTTER, paddingHorizontal: H_PADDING }}
				contentContainerStyle={{ rowGap: GUTTER, paddingBottom: 24 }}
				onEndReachedThreshold={0.4}
				onEndReached={onEndReached}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#0f1115' },

	searchWrap: { padding: 16 },
	search: {
		backgroundColor: '#151922',
		color: '#e7ecf3',
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 10,
		borderWidth: 1,
		borderColor: '#1f2430',
	},

	card: { width: CARD_W },
	cover: {
		width: CARD_W,
		height: Math.round(CARD_W * 3 / 2), // 2:3
		borderRadius: 10,
		backgroundColor: '#151922',
	},
	title: { color: '#e7ecf3', fontSize: 13, fontWeight: '700', marginTop: 6 },
	code: { color: '#9aa4b2', fontSize: 12, marginTop: 2 },
	sortBar: {
		paddingHorizontal: 16,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
		gap: 8,
	},
	sortChips: { flexDirection: 'row', gap: 8, flex: 1, flexWrap: 'wrap' },
	chip: {
		paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999,
		backgroundColor: '#151922', borderWidth: 1, borderColor: '#1f2430',
	},
	chipActive: { backgroundColor: '#1b2230', borderColor: '#3a4760' },
	chipText: { color: '#9aa4b2', fontSize: 12 },
	chipTextActive: { color: '#e7ecf3' },
	dirBtn: {
		width: 36, height: 32, borderRadius: 8,
		alignItems: 'center', justifyContent: 'center',
		backgroundColor: '#151922', borderWidth: 1, borderColor: '#1f2430',
	},
	dirText: { color: '#e7ecf3', fontWeight: '700' },

});
