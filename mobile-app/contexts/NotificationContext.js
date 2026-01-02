import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { AppState } from 'react-native';

// TODO: move to .env or config
const WS_URL = 'ws://192.168.1.77:3124';

const NotificationContext = createContext(undefined);

export function NotificationProvider({ children }) {
	const [notifications, setNotifications] = useState([]);
	const [appState, setAppState] = useState(AppState.currentState);
	const wsRef = useRef(null);
	const reconnectTimeoutRef = useRef(null);

	const connect = () => {
		if (wsRef.current) return;

		const ws = new WebSocket(WS_URL);

		ws.onopen = () => {
			console.log('[WS] connected');
			// If you need auth:
			// ws.send(JSON.stringify({ type: 'AUTH', token: '...' }));
		};

		ws.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);

				if (data.type === 'PING') {
					// heartbeat from server
					return;
				}

				// console.log('[data]', data)

				const notif = {
					id: data.id || String(Date.now()),
					title: data.title || 'Notification',
					message: data.message || '',
					createdAt: data.createdAt || new Date().toISOString(),
					messageType: data.messageType || 'SYSTEM',
					read: false,
					data: data.data || {},
				};

				setNotifications((prev) => [notif, ...prev]);
			} catch (e) {
				console.warn('[WS] invalid message', e);
			}
		};

		ws.onerror = (err) => {
			console.warn('[WS] error', err);
		};

		ws.onclose = () => {
			console.log('[WS] closed');
			wsRef.current = null;
			scheduleReconnect();
		};

		wsRef.current = ws;
	};

	const scheduleReconnect = () => {
		if (reconnectTimeoutRef.current) return;

		reconnectTimeoutRef.current = setTimeout(() => {
			reconnectTimeoutRef.current = null;
			if (appState === 'active') {
				connect();
			}
		}, 5000); // 5s backoff
	};

	const disconnect = () => {
		if (reconnectTimeoutRef.current) {
			clearTimeout(reconnectTimeoutRef.current);
			reconnectTimeoutRef.current = null;
		}
		if (wsRef.current) {
			wsRef.current.close();
			wsRef.current = null;
		}
	};

	// Track app state
	useEffect(() => {
		const subscription = AppState.addEventListener('change', (nextState) => {
			setAppState(nextState);
		});

		return () => {
			// RN >= 0.65
			if (subscription && subscription.remove) {
				subscription.remove();
			}
		};
	}, []);

	// Open / close WS depending on foreground/background
	useEffect(() => {
		if (appState === 'active') {
			connect();
		} else {
			// You could keep it connected if you prefer
			disconnect();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [appState]);

	const markAllAsRead = () => {
		setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
	};

	const markAsRead = (id) => {
		setNotifications((prev) =>
			prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
		);
	};

	const unreadCount = useMemo(
		() => notifications.filter((n) => !n.read).length,
		[notifications],
	);

	const value = {
		notifications,
		unreadCount,
		markAllAsRead,
		markAsRead,
	};

	return (
		<NotificationContext.Provider value={value}>
			{children}
		</NotificationContext.Provider>
	);
}

export function useNotifications() {
	const ctx = useContext(NotificationContext);
	if (!ctx) {
		throw new Error('useNotifications must be used inside <NotificationProvider>');
	}
	return ctx;
}
