import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { Asset } from 'expo-asset';

export default function GameWebView() {
    const webViewRef = useRef<WebView>(null);

    // WebView'den gelen mesajları dinle
    const onMessage = (event: WebViewMessageEvent) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            console.log('📩 WebView mesajı:', data);

            if (data.type === 'GAME_READY') {
                console.log('✅ Oyun hazır!');
            }
        } catch (error) {
            console.error('❌ Mesaj parse hatası:', error);
        }
    };

    // game.html'i asset olarak yükle
    const gameHtml = Asset.fromModule(require('../assets/game/game.html'));

    return (
        <WebView
            ref={webViewRef}
            source={{ uri: gameHtml.uri }}
            style={styles.webview}
            onMessage={onMessage}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowFileAccess={true}
            originWhitelist={['*']}
            // Performans ayarları
            androidLayerType="hardware"
            overScrollMode="never"
            scrollEnabled={false}
            bounces={false}
        />
    );
}

const styles = StyleSheet.create({
    webview: {
        flex: 1,
        backgroundColor: '#1a1a2e',
    },
});
