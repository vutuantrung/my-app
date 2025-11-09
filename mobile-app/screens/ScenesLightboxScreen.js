// screens/ScenesLightboxScreen.js
import * as React from 'react';
import {
	View, Text, StyleSheet, Dimensions, FlatList,
	Pressable, Animated, StatusBar, Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { makeid } from '../helper';

const { width, height } = Dimensions.get('window');
const DOUBLE_TAP_DELAY = 300;

/** Child component (hooks allowed here) */
const SceneItem = React.memo(function SceneItem({ uri, onToggleUI }) {
	const scaleRef = React.useRef(new Animated.Value(1));
	const lastTapRef = React.useRef(0);

	const toggleZoom = () => {
		Animated.spring(scaleRef.current, {
			toValue: scaleRef.current.__getValue() > 1 ? 1 : 2, // 1x <-> 2x
			useNativeDriver: true,
			friction: 8,
			tension: 80,
		}).start();
	};

	const handleTap = () => {
		const now = Date.now();
		if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
			toggleZoom(); // double-tap
		} else {
			lastTapRef.current = now;
			setTimeout(() => {
				if (Date.now() - lastTapRef.current >= DOUBLE_TAP_DELAY) {
					onToggleUI?.(); // single tap toggles chrome
				}
			}, DOUBLE_TAP_DELAY);
		}
	};

	return (
		<Pressable onPress={handleTap} style={styles.cell}>
			<Animated.Image
				source={{ uri }}
				style={[styles.image, { transform: [{ scale: scaleRef.current }] }]}
				resizeMode="contain"
			/>
		</Pressable>
	);
});

export default function ScenesLightboxScreen() {
	const navigation = useNavigation();
	const route = useRoute();
	const { scenes = [], index = 0, title = 'Scenes' } = route?.params ?? {};

	const listRef = React.useRef(null);
	const [currentIndex, setCurrentIndex] = React.useState(index);
	const [uiVisible, setUiVisible] = React.useState(true);

	React.useEffect(() => {
		requestAnimationFrame(() => {
			try { listRef.current?.scrollToIndex({ index, animated: false }); } catch { }
		});
	}, [index]);

	const onViewableItemsChanged = React.useRef(({ viewableItems }) => {
		if (viewableItems?.length && viewableItems[0].index != null) {
			setCurrentIndex(viewableItems[0].index);
		}
	}).current;

	const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 80 });

	const getItemLayout = (_data, i) => ({
		length: width, offset: width * i, index: i,
	});

	// ✅ Hook-free renderItem
	const renderItem = ({ item }) => (
		<SceneItem uri={item.uri} onToggleUI={() => setUiVisible(v => !v)} />
	);

	return (
		<View style={styles.container}>
			<StatusBar hidden={!uiVisible} />

			{uiVisible && (
				<View style={styles.topBar}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.counter}>{currentIndex + 1} / {scenes.length}</Text>
					<Pressable onPress={() => navigation?.goBack?.()} hitSlop={10} style={styles.closeBtn}>
						<Text style={styles.closeText}>Close</Text>
					</Pressable>
				</View>
			)}

			<FlatList
				ref={listRef}
				data={scenes}
				keyExtractor={(s) => makeid(10)}
				renderItem={renderItem}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				initialScrollIndex={index}
				getItemLayout={getItemLayout}
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={viewConfigRef.current}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: 'black' },
	topBar: {
		position: 'absolute', top: 0, left: 0, right: 0, height: 56,
		paddingHorizontal: 12, backgroundColor: 'rgba(0,0,0,0.45)',
		zIndex: 10, flexDirection: 'row', alignItems: 'center',
	},
	title: { color: 'white', fontWeight: '700', fontSize: 16 },
	counter: { color: '#ddd', marginLeft: 8 },
	closeBtn: { marginLeft: 'auto' },
	closeText: { color: '#5b9cff', fontWeight: '700' },
	cell: { width, height, justifyContent: 'center', alignItems: 'center' },
	image: { width, height, backgroundColor: 'black' },
});
