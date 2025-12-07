import { useEffect, useState } from "react";
import { Image } from 'react-native';

export default function SafeImage({ uri, style, defaultSource }) {
	const [failed, setFailed] = useState(false);

	// Reset when uri changes
	useEffect(() => {
		setFailed(false);
	}, [uri]);

	// If no uri or failed loading → use default image
	if (!uri || failed) {
		return (
			<Image
				source={{ uri: defaultSource }}
				style={style}
			/>
		);
	}
	return (
		<Image
			source={{ uri: uri }}
			style={style}
			// We don't care about the error content, only that it fired
			onError={() => {
				setFailed(true);
			}}
		/>
	);
}