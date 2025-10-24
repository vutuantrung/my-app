
import * as React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TextInput, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CATEGORIES = ['All', 'Action', 'Drama', 'Comedy', 'Sci-Fi', 'Romance', 'Thriller'];
const topMovies = [
	{ id: "IPZZ-644", title: "This beautiful girl is going crazy without any room for composure. Innocent idol loses all sense of reason with her first abstinence and aphrodisiac in this extreme orgasmic FUCK Yamada Suzuna", image: "https://pics.dmm.co.jp/digital/video/ipzz00644/ipzz00644pl.jpg" },
	{ id: "OFJE-525", title: "Enjoy the erotic convulsions and curves of the female body at the same time! 98 ultimate back-arching climaxes", image: "https://pics.dmm.co.jp/digital/video/ofje00525/ofje00525pl.jpg" },
	{ id: "SSIS-639", title: "Sexy Actress World No. 1 Beautiful Body Ria Yamate If She Was A Pub Lady The World Line Secretly OK Miraculously Beautiful Busty Gladle Lady", image: "https://pics.dmm.co.jp/digital/video/ssis00639/ssis00639pl.jpg" },
	{ id: "SONE-846", title: "Beyond the climax: The strongest heroine gets a big cock piston - Kanna Seto", image: "https://pics.dmm.co.jp/digital/video/sone00846/sone00846pl.jpg" },
	{ id: "OFJE-544", title: "No.1 Beautiful Face Kawakita Sayaka All Works Blowjob 177 Complete 12 Hours", image: "https://pics.dmm.co.jp/digital/video/ofje00544/ofje00544pl.jpg" },
	{ id: "JPVR-201", title: "[High-Quality Super High Definition] Sweat, Saliva, Tide, Pussy Juice Minami Aizawa Wet Sex Full Of Erotic Bodily Fluids VR Super Rare SSR Super Single Actress's Erotic Juice Man Would You Like To Feel It! ?", image: "https://pics.dmm.co.jp/digital/video/ipvr00201/ipvr00201pl.jpg" },
].map(({ id, title, image }, i) => ({
	id: id,
	title: id + " - " + title,
	image: image,
	category: CATEGORIES[(i % (CATEGORIES.length - 1)) + 1],
}));

const topActress = Array.from({ length: 7 }).map((_, i) => ({
	id: `actress-${i + 1}`,
	code: `AC${String(i + 1).padStart(3, '0')}`,
	image: `https://picsum.photos/seed/topactress_${i + 1}/400/600`,
}));

export default function DashboardScreen() {
	const navigation = useNavigation();
	const [query, setQuery] = React.useState('');
	const [activeCategory, setActiveCategory] = React.useState('All');

	const filteredMovies =
		activeCategory === 'All'
			? topMovies
			: topMovies.filter((m) => m.category === activeCategory);

	const renderPoster = ({ item }) => (
		<Pressable style={styles.cardHorizontal}>
			<Image source={{ uri: item.image }} style={styles.posterHorizontal} resizeMode="cover" />
			<Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
		</Pressable>
	);

	const renderActress = ({ item }) => (
		<Pressable style={styles.cardVertical}>
			<Image source={{ uri: item.image }} style={styles.posterVertical} resizeMode="cover" />
			<Text style={styles.cardTitle} numberOfLines={1}>{item.code}</Text>
		</Pressable>
	);

	return (
		<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 28 }}>
			{/* Header */}
			<View style={styles.header}>
				<Image source={require('../assets/icon.png')} style={styles.logo} />
				<Text style={styles.appName}>JAV Dashboard</Text>
			</View>

			{/* Search */}
			<View style={styles.searchWrap}>
				<TextInput
					style={styles.searchInput}
					placeholder="Search movies or actresses..."
					placeholderTextColor="#9aa4b2"
					value={query}
					onChangeText={setQuery}
					returnKeyType="search"
				/>
			</View>

			{/* Category chips (NEW) */}
			<View style={styles.chipsRow}>
				<ScrollView horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 16 }}>
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

			{/* Today Top Movies */}
			<View style={styles.sectionHeader}>
				<Text style={styles.sectionTitle}>Today Top movies</Text>
				<Pressable onPress={() => navigation.navigate('Film')}>
					<Text style={styles.link}>See more</Text>
				</Pressable>
			</View>
			<FlatList
				data={topMovies}
				horizontal
				keyExtractor={(item) => item.id}
				renderItem={renderPoster}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
			/>

			{/* Today Top Actress */}
			<View style={[styles.sectionHeader, { marginTop: 16 }]}>
				<Text style={styles.sectionTitle}>Today Top actress</Text>
				<Pressable onPress={() => navigation.navigate('Actress')}>
					<Text style={styles.link}>See more</Text>
				</Pressable>
			</View>
			<FlatList
				data={topActress}
				horizontal
				keyExtractor={(item) => item.id}
				renderItem={renderActress}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
			/>
		</ScrollView>
	);
}

/** Small section header with "See more" */
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

const CARD_H_W = 320;
const CARD_H_H = 230;
const CARD_V_W = 120;
const CARD_V_H = 180;

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#0f1115', paddingTop: 25 },
	header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 8 },
	logo: { width: 32, height: 32, borderRadius: 6 },
	appName: { color: '#e7ecf3', fontSize: 18, fontWeight: '700' },
	searchWrap: { paddingHorizontal: 16, paddingVertical: 8 },
	searchInput: { backgroundColor: '#151922', color: '#e7ecf3', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: '#1f2430' },
	sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 8, marginBottom: 8 },
	sectionTitle: { color: '#e7ecf3', fontSize: 16, fontWeight: '700' },
	link: { color: '#5b9cff', fontSize: 13, fontWeight: '600' },
	listContent: { paddingHorizontal: 12 },
	cardVertical: { width: CARD_V_W, marginHorizontal: 4 },
	posterVertical: { width: CARD_V_W, height: CARD_V_H, borderRadius: 10, backgroundColor: '#151922' },
	cardHorizontal: { width: CARD_H_W, marginHorizontal: 4 },
	posterHorizontal: { width: CARD_H_W, height: CARD_H_H, borderRadius: 10, backgroundColor: '#151922' },
	cardTitle: { color: '#9aa4b2', fontSize: 12, marginTop: 6 },
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

	// Chips
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

	// Sections
	sectionHeader: {
		marginTop: 10,
		paddingHorizontal: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	sectionTitle: { color: '#e7ecf3', fontSize: 16, fontWeight: '700' },
	link: { color: '#5b9cff', fontWeight: '700', fontSize: 13 },
	movieTitle: { color: '#e7ecf3', fontSize: 13, fontWeight: '700', marginTop: 6 },
	actressCode: { color: '#9aa4b2', fontSize: 12, marginTop: 6 },
});
