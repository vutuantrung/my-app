// screens/CoserScreen.js
import React, { useState, useCallback } from 'react';
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	ActivityIndicator,
	SafeAreaView,
	Image,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import SafeImage from '../components/SafeImage';

// TODO: change this to your real API endpoint
const PAGE_SIZE = 21; // 7 rows x 3 columns, adjust if you want

const BASE_URL = 'http://192.168.1.77:3123';
const FETCH_LIST_URL = BASE_URL + '/api/model';
const DEFAULT_AVATAR = BASE_URL + '/images/idol-avatars/default-avatar.jpg';

function CoserScreen() {
	const navigation = useNavigation();

	const [cosers, setCosers] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loadingInitial, setLoadingInitial] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const [error, setError] = useState(null);

	const fetchCosers = useCallback(
		async (pageToLoad = 1, replace = false) => {
			if (pageToLoad === 1) {
				setLoadingInitial(true);
			} else {
				setLoadingMore(true);
			}

			try {
				setError(null);

				// Backend options:
				// 1) JSON like: { items: [ ... ] }
				// 2) Direct array: [ ... ]
				let url = `${FETCH_LIST_URL}?page=${pageToLoad}&pageSize=${PAGE_SIZE}`;
				const res = await fetch(url);
				const json = await res.json();

				const items = Array.isArray(json?.data)
					? json.data
					: Array.isArray(json)
						? json
						: [];

				setCosers((prev) =>
					replace || pageToLoad === 1 ? items : [...prev, ...items]
				);

				setHasMore(items.length >= PAGE_SIZE);
				setPage(pageToLoad);
			} catch (e) {
				console.warn('Failed to load cosers', e);
				setError('Failed to load cosers');
			} finally {
				setLoadingInitial(false);
				setLoadingMore(false);
			}
		},
		[]
	);

	// Reload whenever screen is focused
	useFocusEffect(
		useCallback(() => {
			setCosers([]);
			setHasMore(true);
			setPage(1);
			fetchCosers(1, true);
		}, [fetchCosers])
	);

	const loadMore = () => {
		if (!hasMore || loadingMore || loadingInitial) return;
		fetchCosers(page + 1);
	};

	const renderItem = ({ item }) => {
		const name = item.name || 'Unknown';

		// If backend doesn’t send avatar, build one from name
		const avatarUri =
			item.avatar ||
			`${BASE_URL}/images/model-avatars/${encodeURIComponent(name)}.jpg`;

		return (
			<TouchableOpacity
				onPress={() => navigation.navigate('CoserDetail', { name })}
				style={{
					flex: 1,
					marginBottom: 16,
					alignItems: 'center',
				}}
			>
				<SafeImage
					uri={avatarUri}
					style={{
						width: 120,
						height: 120,
						borderRadius: 60,
						backgroundColor: '#151922',
						marginBottom: 6,
					}}
					defaultSource={DEFAULT_AVATAR}
				/>
				<Text
					style={{
						color: '#e7ecf3',
						fontSize: 13,
						textAlign: 'center',
					}}
					numberOfLines={2}
				>
					{name}
				</Text>
			</TouchableOpacity>
		);
	};

	const renderFooter = () => {
		if (!loadingMore) return null;
		return (
			<View style={{ paddingVertical: 12 }}>
				<ActivityIndicator />
			</View>
		);
	};

	// Initial error & no data
	if (error && cosers.length === 0) {
		return (
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: '#0f1115',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text style={{ color: '#e7ecf3', marginBottom: 8 }}>{error}</Text>
				<TouchableOpacity
					onPress={() => fetchCosers(1, true)}
					style={{
						paddingHorizontal: 16,
						paddingVertical: 8,
						borderRadius: 8,
						borderWidth: 1,
						borderColor: '#5b9cff',
					}}
				>
					<Text style={{ color: '#5b9cff' }}>Retry</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}

	// Initial loading & no items yet
	if (loadingInitial && cosers.length === 0) {
		return (
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: '#0f1115',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<ActivityIndicator />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#0f1115' }}>
			<FlatList
				data={cosers}
				keyExtractor={(item, index) => item.name || `coser-${index}`}
				renderItem={renderItem}
				numColumns={3}
				contentContainerStyle={{
					paddingTop: 12,
					paddingHorizontal: 12,
					paddingBottom: 16,
				}}
				columnWrapperStyle={{
					justifyContent: 'space-between',
				}}
				onEndReached={loadMore}
				onEndReachedThreshold={0.4}
				ListFooterComponent={renderFooter}
				refreshing={loadingInitial && cosers.length > 0}
				onRefresh={() => fetchCosers(1, true)}
			/>
		</SafeAreaView>
	);
}

export default CoserScreen;
