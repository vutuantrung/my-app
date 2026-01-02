// screens/NotificationsScreen.js
import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	SafeAreaView,
} from 'react-native';
import { useNotifications } from '../contexts/NotificationContext';
import { useNavigation } from '@react-navigation/native';
import NotificationItemMovieCard from '../components/NotificationItemMovieCard';
import NotificationItemOtherCard from '../components/NotificationItemOtherCard';
import NotificationItemActressCard from '../components/NotificationItemActressCard';
import NotificationItemMoviesCard from '../components/NotificationItemMoviesCard';

// Helper: derive kind (movie/actress/other) and tag (created/updated)
function deriveKindAndTag(notification) {
	const type = (notification.messageType || '').toUpperCase();
	const [itemType, actionType] = type.toLowerCase().split(".");
	const data = notification.data || {};
	const kind = ["movie", "movies", "actress", "actresses"].includes(itemType) ? itemType : "other";

	let tag = data.action;
	if (!tag) {
		if (
			type.includes('created') ||
			type.includes('added') ||
			type.includes('new')
		) {
			tag = 'created';
		} else if (type.includes('updated') || type.includes('update')) {
			tag = 'updated';
		} else {
			tag = null;
		}
	}

	const result = { kind, tag: actionType };
	return result;
}

function NotificationsScreen() {
	const { notifications, markAllAsRead, markAsRead } = useNotifications();
	const navigation = useNavigation();

	const renderItem = ({ item }) => {
		// console.log("[meta]", item)
		const meta = deriveKindAndTag(item);
		if (meta.kind === 'movie') return NotificationItemMovieCard(item, meta, markAsRead, navigation);
		if (meta.kind === 'movies') return NotificationItemMoviesCard(item, meta, markAsRead);
		if (meta.kind === 'actress') return NotificationItemActressCard(item, meta, markAsRead, navigation);
		return NotificationItemOtherCard(item, markAsRead);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#0f1115' }}>
			<View
				style={{
					paddingHorizontal: 16,
					paddingVertical: 12,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Text style={{ fontSize: 18, fontWeight: '700', color: '#e7ecf3' }}>
					Notifications
				</Text>
				{notifications.length > 0 && (
					<TouchableOpacity onPress={markAllAsRead}>
						<Text style={{ fontSize: 13, color: '#007AFF' }}>
							Mark all read
						</Text>
					</TouchableOpacity>
				)}
			</View>

			<FlatList
				data={notifications}
				keyExtractor={(item) => (item.id)}
				ItemSeparatorComponent={() => (
					<View style={{ height: 4 }} />
				)}
				renderItem={renderItem}
				contentContainerStyle={{ paddingBottom: 16, paddingTop: 4 }}
			/>
		</SafeAreaView>
	);
}

export default NotificationsScreen;
