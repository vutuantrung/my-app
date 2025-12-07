// screens/ActressDetailJJGirlScreen.js
import React, { useMemo, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Image,
	Dimensions,
	Pressable,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { formatName } from '../helper';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 3;
const GUTTER = 8;
const H_PADDING = 12;
const CARD_W =
	(width - H_PADDING * 2 - GUTTER * (NUM_COLUMNS - 1)) / NUM_COLUMNS;

// https://jjgirls.com/japanese/ai-uehara/79/cute-ai-uehara-9.jpg
// https://jjgirls.com/japanese/ai-uehara/79/ai-uehara-9.jpg
// TODO: adjust to your real base URL and path pattern
const BASE_JJGIRL_THUMB_URL = 'https://jjgirls.com/japanese/#NAME#/#PAGE#/cute-#NAME#-#INDEX#.jpg';
const BASE_JJGIRL_URL = 'https://jjgirls.com/japanese/#NAME#/#PAGE#/#NAME#-#INDEX#.jpg';

const IMAGES_PER_PAGE = 12;

export default function ActressDetailJJGirlScreen() {
	const navigation = useNavigation();
	const route = useRoute();
	const { actressName, data } = route.params || {};

	const [page, setPage] = useState(1);

	const [viewerVisible, setViewerVisible] = useState(false);
	const [viewerImage, setViewerImage] = useState(null);

	const images = useMemo(
		() =>
			Array.from({ length: IMAGES_PER_PAGE }, (_, idx) => {
				const index = idx + 1;
				return {
					id: `${page}-${index}`,
					url: BASE_JJGIRL_URL
						.replaceAll('#NAME#', encodeURIComponent(actressName.toLowerCase()))
						.replaceAll('#PAGE#', String(page || 1))
						.replaceAll('#INDEX#', String(index)),
				};
			}),
		[page, actressName]
	);

	const goPrev = () => {
		setPage((prev) => (prev > 1 ? prev - 1 : prev));
	};

	const goNext = () => {
		setPage((prev) => prev + 1);
	};

	const renderItem = ({ item }) => (
		<Pressable
			style={styles.card}
			onPress={() => {
				setViewerImage(item.url);
				setViewerVisible(true);
			}}
		>
			<Image source={{ uri: item.url }} style={styles.image} />
		</Pressable>
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={images}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				numColumns={NUM_COLUMNS}
				columnWrapperStyle={{
					columnGap: GUTTER,
					paddingHorizontal: H_PADDING,
				}}
				contentContainerStyle={{ rowGap: GUTTER, paddingTop: 10 }}
				showsVerticalScrollIndicator={false}
			/>

			{viewerVisible && (
				<Pressable
					style={styles.viewerOverlay}
					onPress={() => setViewerVisible(false)}
				>
					<Image
						source={{ uri: viewerImage }}
						style={styles.viewerImage}
						resizeMode="contain"
					/>
				</Pressable>
			)}

			{/* Pagination controls */}
			<View style={styles.paginationBar}>
				<Pressable
					style={[styles.pageButton, page === 1 && { opacity: 0.4 }]}
					onPress={goPrev}
					disabled={page === 1}>
					<Text style={styles.pageButtonText}>Prev</Text>
				</Pressable>

				<Text style={styles.pageLabel}>Page {page}</Text>

				<Pressable style={styles.pageButton} onPress={goNext}>
					<Text style={styles.pageButtonText}>Next</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0f1115',
	},
	header: {
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	title: {
		color: '#e7ecf3',
		fontSize: 18,
		fontWeight: '700',
	},

	card: {
		width: CARD_W,
		aspectRatio: 3 / 4,
		borderRadius: 10,
		overflow: 'hidden',
		backgroundColor: '#151922',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	paginationBar: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		paddingHorizontal: 16,
		paddingVertical: 10,
		backgroundColor: 'rgba(15,17,21,0.95)',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	pageButton: {
		paddingHorizontal: 14,
		paddingVertical: 8,
		borderRadius: 999,
		borderWidth: 1,
		borderColor: '#1f2430',
		backgroundColor: '#151922',
		marginBottom: 30
	},
	pageButtonText: {
		color: '#e7ecf3',
		fontWeight: '600',
		fontSize: 13,
	},
	pageLabel: {
		color: '#9aa4b2',
		fontSize: 14,
		marginBottom: 30
	},
	viewerOverlay: {
		position: 'absolute',
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.95)',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 50,
		elevation: 10,
	},
	viewerImage: {
		width: '100%',
		height: '100%',
	},
});
