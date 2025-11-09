// screens/FilmSceneViewerScreen.js
import * as React from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, Pressable, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function FilmSceneViewerScreen() {
	const route = useRoute();
	const navigation = useNavigation();
	const { images = [], index = 0, title = 'Scene' } = route?.params || {};

	const [current, setCurrent] = React.useState(index);
	const uri = images[current];

	return (
		<View style={styles.container}>
			{/* top bar */}
			<View style={styles.topBar}>
				<Pressable onPress={() => navigation.goBack()}>
					<Text style={styles.topBarText}>Close</Text>
				</Pressable>
				<Text style={styles.topBarTitle} numberOfLines={1}>
					{title}
				</Text>
				<Text style={styles.topBarText}>
					{current + 1}/{images.length}
				</Text>
			</View>

			<ScrollView
				style={styles.scroll}
				maximumZoomScale={4}
				minimumZoomScale={1}
				contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
			>
				<Image source={{ uri }} style={styles.image} resizeMode="contain" />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: 'black' },
	topBar: {
		height: 50,
		paddingHorizontal: 12,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	topBarText: { color: '#fff' },
	topBarTitle: { flex: 1, color: '#fff', textAlign: 'center', marginHorizontal: 12 },
	scroll: { flex: 1 },
	image: { width, height: height - 50 },
});
