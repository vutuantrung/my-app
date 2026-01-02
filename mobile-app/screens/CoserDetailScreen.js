// screens/CoserDetailScreen.js
import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	ActivityIndicator,
	SafeAreaView,
	TouchableOpacity,
	Image,
	Linking,
} from 'react-native';

// TODO: change this to your real API base
const BASE_URL = 'https://your-api.example.com';
const DEFAULT_AVATAR = `${BASE_URL}/images/idol-avatars/default-avatar.jpg`;

function SafeImage({ uri, style, defaultSource }) {
	const [failed, setFailed] = useState(false);

	React.useEffect(() => {
		setFailed(false);
	}, [uri]);

	if (!uri || failed) {
		return <Image source={defaultSource} style={style} />;
	}

	return (
		<Image
			source={{ uri }}
			style={style}
			onError={() => setFailed(true)}
		/>
	);
}

function CoserDetailScreen({ route }) {
	const { name } = route.params || {};
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchDetail = async () => {
		if (!name) return;
		try {
			setLoading(true);
			setError(null);

			// You can change path to match your backend:
			// e.g. /api/coser?name=xxx or /api/cosers/:name
			const res = await fetch(
				`${BASE_URL}/api/coser/${encodeURIComponent(name)}`
			);
			const json = await res.json();

			// Expecting:
			// { name, about, social_medias: [{ label, url }], albums: [{ name, thumbs }] }
			setData({
				name: json.name || name,
				about: json.about || '',
				social_medias: json.social_medias || json['social-medias'] || [],
				albums: json.albums || [],
			});
		} catch (e) {
			console.warn('Failed to load coser detail', e);
			setError('Failed to load coser detail');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDetail();
	}, [name]);

	if (loading) {
		return (
			<SafeAreaView
				style={{ flex: 1, backgroundColor: '#0f1115', justifyContent: 'center', alignItems: 'center' }}
			>
				<ActivityIndicator />
			</SafeAreaView>
		);
	}

	if (error || !data) {
		return (
			<SafeAreaView
				style={{ flex: 1, backgroundColor: '#0f1115', justifyContent: 'center', alignItems: 'center' }}
			>
				<Text style={{ color: '#e7ecf3', marginBottom: 8 }}>
					{error || 'No data found'}
				</Text>
				<TouchableOpacity
					onPress={fetchDetail}
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

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#0f1115' }}>
			<ScrollView contentContainerStyle={{ padding: 16 }}>
				{/* Name */}
				<Text
					style={{
						color: '#e7ecf3',
						fontSize: 22,
						fontWeight: '700',
						marginBottom: 8,
					}}
				>
					{data.name}
				</Text>

				{/* About */}
				{data.about ? (
					<View style={{ marginBottom: 16 }}>
						<Text
							style={{
								color: '#9aa4b2',
								fontSize: 14,
								marginBottom: 4,
							}}
						>
							About
						</Text>
						<Text style={{ color: '#e7ecf3', fontSize: 14, lineHeight: 20 }}>
							{data.about}
						</Text>
					</View>
				) : null}

				{/* Social medias */}
				{Array.isArray(data.social_medias) && data.social_medias.length > 0 && (
					<View style={{ marginBottom: 16 }}>
						<Text
							style={{
								color: '#9aa4b2',
								fontSize: 14,
								marginBottom: 4,
							}}
						>
							Social media
						</Text>
						{data.social_medias.map((sm, index) => (
							<TouchableOpacity
								key={`${sm.label || sm.url || index}-${index}`}
								onPress={() => sm.url && Linking.openURL(sm.url)}
								style={{ marginBottom: 4 }}
							>
								<Text
									style={{
										color: '#5b9cff',
										fontSize: 14,
										textDecorationLine: sm.url ? 'underline' : 'none',
									}}
								>
									{sm.label || sm.url || 'Link'}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				)}

				{/* Albums */}
				{Array.isArray(data.albums) && data.albums.length > 0 && (
					<View style={{ marginBottom: 16 }}>
						<Text
							style={{
								color: '#9aa4b2',
								fontSize: 14,
								marginBottom: 8,
							}}
						>
							Albums
						</Text>

						{data.albums.map((album, index) => (
							<View
								key={`${album.name || 'album'}-${index}`}
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									marginBottom: 12,
								}}
							>
								<SafeImage
									uri={album.thumbs}
									style={{
										width: 60,
										height: 60,
										borderRadius: 8,
										marginRight: 12,
										backgroundColor: '#151922',
									}}
									defaultSource={DEFAULT_AVATAR}
								/>
								<Text
									style={{
										color: '#e7ecf3',
										fontSize: 15,
										fontWeight: '500',
									}}
								>
									{album.name || 'Untitled album'}
								</Text>
							</View>
						))}
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
}

export default CoserDetailScreen;
