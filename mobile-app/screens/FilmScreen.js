import * as React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable, TextInput } from 'react-native';

const PAGE_SIZE = 10;

const sampleScenes = (i) => Array.from({ length: 6 }).map((_, idx) => ({
	id: `sc-${i}-${idx + 1}`,
	uri: `https://picsum.photos/seed/scene_${i}_${idx + 1}/800/450`
}));

const makeFilms = () => {
	const items = [];
	for (let i = 1; i <= 30; i++) {
		items.push({
			id: `mv-${i}`,
			code: `MV${String(i).padStart(3, '0')}`,
			title: `Sample Movie ${i}`,
			rating: 1 + (i % 5),
			image: `https://picsum.photos/seed/film_${i}/1200/675`,
			previewUrl: i % 2 === 0
				? 'https://cdn.coverr.co/videos/coverr-aerial-view-of-a-forest-1103/1080p.mp4'
				: 'https://cdn.coverr.co/videos/coverr-misty-mountains-7655/1080p.mp4',
			releaseDate: `202${i % 4}-0${(i % 9) + 1}-1${i % 9}`,
			runtime: 80 + (i % 40),
			tags: ['Action', 'Drama', i % 3 === 0 ? 'Romance' : 'Mystery'],
			actresses: [`Actress ${i}`, `Actress ${i + 1}`],
			scenes: sampleScenes(i),
		});
	}
	return items;
};
const ALL = makeFilms();

function Stars({ value }) {
	const v = Math.max(0, Math.min(5, value || 0));
	const full = '★'.repeat(v);
	const empty = '☆'.repeat(5 - v);
	return <Text style={styles.stars}>{full}{empty}</Text>;
}

export default function FilmScreen({ navigation }) {
	const [query, setQuery] = React.useState('');
	const [page, setPage] = React.useState(1);

	const filtered = React.useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return ALL;
		return ALL.filter(f => f.title.toLowerCase().includes(q) || f.code.toLowerCase().includes(q));
	}, [query]);

	const data = React.useMemo(() => filtered.slice(0, PAGE_SIZE * page), [filtered, page]);
	const canLoadMore = data.length < filtered.length;

	const onEndReached = () => { if (canLoadMore) setPage(p => p + 1); };

	const openDetail = (film) => navigation.navigate('FilmDetail', { film });

	const renderItem = ({ item }) => (
		<Pressable onPress={() => openDetail(item)} style={styles.item}>
			<Image source={{ uri: item.image }} style={styles.poster} />
			<View style={styles.row}>
				<Text style={styles.code}>{item.code}</Text>
				<Stars value={item.rating} />
			</View>
			<Text style={styles.title} numberOfLines={2}>{item.title}</Text>
		</Pressable>
	);

	return (
		<View style={styles.container}>
			<View style={styles.searchWrap}>
				<TextInput
					style={styles.search}
					placeholder="Search films by code or title..."
					placeholderTextColor="#9aa4b2"
					value={query}
					onChangeText={(t) => { setQuery(t); setPage(1); }}
					returnKeyType="search"
				/>
			</View>

			<FlatList
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				contentContainerStyle={{ paddingBottom: 24 }}
				onEndReachedThreshold={0.4}
				onEndReached={onEndReached}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#0f1115' },
	searchWrap: { padding: 12, marginTop: 20 },
	search: { backgroundColor: '#151922', color: '#e7ecf3', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: '#1f2430' },
	item: { marginBottom: 16 },
	poster: { width: '100%', aspectRatio: 16 / 9, backgroundColor: '#151922' },
	row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, marginTop: 8 },
	code: { color: '#9aa4b2', fontWeight: '600' },
	stars: { color: '#f7a000' },
	title: { color: '#e7ecf3', fontSize: 16, fontWeight: '700', paddingHorizontal: 12, marginTop: 4 },
});
