import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { Asset } from 'expo-asset';

interface GameWebViewProps {
    levelNumber: number;
    htmlAsset: any;
    onBack: () => void;
    onLevelComplete: (level: number) => void;
}

export default function GameWebView({ levelNumber, htmlAsset, onBack, onLevelComplete }: GameWebViewProps) {
    const webViewRef = useRef<WebView>(null);
    const [strokeCount, setStrokeCount] = useState(0);
    const [power, setPower] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [ballOnGround, setBallOnGround] = useState(true);
    const [gameReady, setGameReady] = useState(false);
    const [levelCompleted, setLevelCompleted] = useState(false);
    const [htmlUri, setHtmlUri] = useState<string | null>(null);

    // Asset'i indir ve local URI'yi al — HTML string'e çevirme, native oku
    useEffect(() => {
        let isMounted = true;
        setGameReady(false);
        setHtmlUri(null);

        async function prepareAsset() {
            try {
                const asset = Asset.fromModule(htmlAsset);
                await asset.downloadAsync();
                const uri = asset.localUri || asset.uri;
                console.log('🌐 Level URI hazır:', uri);

                if (isMounted) {
                    setHtmlUri(uri);
                }
            } catch (error) {
                console.error('❌ Level asset hatası:', error);
            }
        }

        prepareAsset();

        return () => {
            isMounted = false;
        };
    }, [htmlAsset]);

    // WebView'den gelen mesajları dinle
    const onMessage = (event: WebViewMessageEvent) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            
            switch (data.type) {
                case 'GAME_READY':
                    setGameReady(true);
                    break;
                case 'CONSOLE_LOG':
                    console.log('🌐 [WebView Log]', data.message);
                    break;
                case 'CONSOLE_ERROR':
                    console.error('🔴 [WebView Error]', data.message);
                    break;
                case 'CONSOLE_WARN':
                    console.warn('⚠️ [WebView Warn]', data.message);
                    break;
                case 'WINDOW_ERROR':
                    console.error('🔥 [WebView Runtime Error]', data.message);
                    break;
                case 'DRAG_START':
                    setIsDragging(true);
                    setPower(0);
                    break;
                case 'DRAG_MOVE':
                    setPower(data.power);
                    break;
                case 'DRAG_END':
                    setIsDragging(false);
                    setPower(0);
                    break;
                case 'SHOOT':
                    setStrokeCount(data.strokeCount);
                    break;
                case 'BALL_STATE':
                    setBallOnGround(data.onGround);
                    break;
                case 'BALL_RESET':
                    break;
                case 'LEVEL_COMPLETED':
                    setLevelCompleted(true);
                    setStrokeCount(data.strokeCount);
                    onLevelComplete(levelNumber);
                    break;
                default:
                    console.log('📩 WebView mesajı:', data);
            }
        } catch (error) {
            console.error('❌ Mesaj parse hatası:', error);
        }
    };

    // Güç barı rengi (Yumuşak pastel interpolasyon)
    const getPowerColor = (p: number) => {
        if (p < 0.5) {
            const r = Math.floor(168 + (254 - 168) * (p / 0.5));
            const g = Math.floor(230 + (211 - 230) * (p / 0.5));
            const b = Math.floor(207 + (144 - 207) * (p / 0.5));
            return `rgb(${r}, ${g}, ${b})`;
        } else {
            const t = (p - 0.5) / 0.5;
            const r = Math.floor(254 + (255 - 254) * t);
            const g = Math.floor(211 + (118 - 211) * t);
            const b = Math.floor(144 + (117 - 144) * t);
            return `rgb(${r}, ${g}, ${b})`;
        }
    };

    // Yeniden Oyna
    const handleRestart = () => {
        setLevelCompleted(false);
        setStrokeCount(0);
        setPower(0);
        setIsDragging(false);
        setBallOnGround(true);
        // WebView içindeki Matter.js / platformları resetler
        webViewRef.current?.postMessage(JSON.stringify({
            type: 'RESTART_LEVEL'
        }));
    };

    const debugScript = `
      (function() {
        var oldLog = console.log;
        var oldError = console.error;
        var oldWarn = console.warn;
        
        console.log = function() {
          var message = Array.prototype.slice.call(arguments).join(' ');
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'CONSOLE_LOG', message: message }));
          oldLog.apply(console, arguments);
        };
        
        console.error = function() {
          var message = Array.prototype.slice.call(arguments).join(' ');
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'CONSOLE_ERROR', message: message }));
          oldError.apply(console, arguments);
        };
        
        console.warn = function() {
          var message = Array.prototype.slice.call(arguments).join(' ');
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'CONSOLE_WARN', message: message }));
          oldWarn.apply(console, arguments);
        };

        window.onerror = function(message, source, lineno, colno, error) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ 
            type: 'WINDOW_ERROR', 
            message: message + ' at ' + source + ':' + lineno + ':' + colno 
          }));
          return false;
        };
      })();
      true;
    `;

    return (
        <View style={styles.container}>
            {htmlUri ? (
                <WebView
                    ref={webViewRef}
                    source={{ uri: htmlUri }}
                    style={styles.webview}
                    onMessage={onMessage}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    allowFileAccess={true}
                    allowUniversalAccessFromFileURLs={true}
                    allowFileAccessFromFileURLs={true}
                    originWhitelist={['*']}
                    androidLayerType="hardware"
                    overScrollMode="never"
                    scrollEnabled={false}
                    bounces={false}
                    injectedJavaScript={debugScript}
                    injectedJavaScriptBeforeContentLoaded={debugScript}
                />
            ) : (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#00f2fe" />
                    <Text style={styles.loadingText}>Neon Seviye Hazırlanıyor...</Text>
                </View>
            )}

            {/* REACT NATIVE HUD / GÖSTERGELER */}
            {gameReady && (
                <>
                    {/* Üst Skor Kartı ve Bilgiler */}
                    <View style={styles.hudContainer}>
                        <View style={styles.hudLeft}>
                            <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
                                <Text style={styles.backBtnText}>←</Text>
                            </TouchableOpacity>

                            <View style={styles.scoreCard}>
                                <Text style={styles.scoreLabel}>Atış</Text>
                                <Text style={styles.scoreValue}>{strokeCount}</Text>
                            </View>
                        </View>
                        
                        <View style={styles.titleCard}>
                            <Text style={styles.gameTitle}>Seviye {levelNumber}</Text>
                            <Text style={[
                                styles.statusText,
                                { color: ballOnGround ? '#00f2fe' : '#ff7675' }
                            ]}>
                                {ballOnGround ? '● Atışa Hazır' : '○ Top Hareketli'}
                            </Text>
                        </View>
                    </View>

                    {/* Alt Güç Gösterge Barı */}
                    {isDragging && !levelCompleted && (
                        <View style={styles.powerBarContainer}>
                            <View style={styles.powerBarOutline}>
                                <View 
                                    style={[
                                        styles.powerBarFill, 
                                        { 
                                            width: `${power * 100}%`,
                                            backgroundColor: getPowerColor(power)
                                        }
                                    ]} 
                                />
                            </View>
                            <Text style={styles.powerText}>{Math.floor(power * 100)}%</Text>
                        </View>
                    )}
                </>
            )}

            {/* Seviye Tamamlandı Pop-Up Kartı */}
            {levelCompleted && (
                <View style={styles.completedOverlay}>
                    <View style={styles.completedCard}>
                        <Text style={styles.completedEmoji}>🏆</Text>
                        <Text style={styles.completedTitle}>SEVİYE TAMAMLANDI!</Text>
                        <Text style={styles.completedSubtitle}>Tebrikler, Seviyeyi Bitirdin!</Text>
                        
                        <View style={styles.completedStats}>
                            <Text style={styles.completedStatsLabel}>Toplam Atış</Text>
                            <Text style={styles.completedStatsValue}>{strokeCount}</Text>
                        </View>
                        
                        <TouchableOpacity style={styles.actionBtn} onPress={handleRestart} activeOpacity={0.8}>
                            <Text style={styles.actionBtnText}>Yeniden Oyna</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.actionBtn, styles.menuBtn]} onPress={onBack} activeOpacity={0.8}>
                            <Text style={styles.actionBtnText}>Seviye Seçimi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {!gameReady && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#00f2fe" />
                    <Text style={styles.loadingText}>Neon Seviye Yükleniyor...</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0b0b1a',
    },
    webview: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    loadingContainer: {
        ...StyleSheet.absoluteFill,
        backgroundColor: '#0b0b1a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#00f2fe',
        fontWeight: '600',
    },
    hudContainer: {
        position: 'absolute',
        top: 45,
        left: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
    },
    hudLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: 'rgba(11, 11, 26, 0.85)',
        borderWidth: 1.5,
        borderColor: 'rgba(0, 242, 254, 0.35)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    backBtnText: {
        color: '#00f2fe',
        fontSize: 20,
        fontWeight: '900',
    },
    scoreCard: {
        backgroundColor: 'rgba(11, 11, 26, 0.85)',
        borderRadius: 14,
        paddingHorizontal: 16,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'rgba(0, 242, 254, 0.35)',
    },
    scoreLabel: {
        fontSize: 8,
        color: '#00f2fe',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    scoreValue: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '900',
    },
    titleCard: {
        alignItems: 'flex-end',
        backgroundColor: 'rgba(11, 11, 26, 0.85)',
        borderRadius: 14,
        paddingHorizontal: 16,
        height: 44,
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: 'rgba(0, 242, 254, 0.35)',
    },
    gameTitle: {
        fontSize: 13,
        color: '#ffffff',
        fontWeight: '900',
    },
    statusText: {
        fontSize: 8,
        fontWeight: '800',
        marginTop: 1,
    },
    powerBarContainer: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(11, 11, 26, 0.85)',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 12,
        flexDirection: 'row',
        borderWidth: 1.5,
        borderColor: 'rgba(219, 39, 119, 0.45)',
        shadowColor: '#db2777',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    powerBarOutline: {
        width: 150,
        height: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 6,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
    },
    powerBarFill: {
        height: '100%',
        borderRadius: 6,
    },
    powerText: {
        marginLeft: 12,
        fontSize: 12,
        color: '#ffffff',
        fontWeight: '900',
        width: 36,
        textAlign: 'right',
    },
    completedOverlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(11, 11, 26, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    completedCard: {
        width: '85%',
        backgroundColor: 'rgba(11, 11, 26, 0.95)',
        borderRadius: 24,
        paddingHorizontal: 25,
        paddingVertical: 35,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(0, 242, 254, 0.45)',
        shadowColor: '#00f2fe',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.35,
        shadowRadius: 20,
        elevation: 10,
    },
    completedEmoji: {
        fontSize: 55,
        marginBottom: 12,
    },
    completedTitle: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: '900',
        textAlign: 'center',
        letterSpacing: 1,
    },
    completedSubtitle: {
        fontSize: 13,
        color: '#00f2fe',
        fontWeight: 'bold',
        marginTop: 6,
        marginBottom: 25,
        textAlign: 'center',
    },
    completedStats: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 30,
        alignItems: 'center',
        marginBottom: 25,
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
    },
    completedStatsLabel: {
        fontSize: 10,
        color: '#00f2fe',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    completedStatsValue: {
        fontSize: 26,
        color: '#ffffff',
        fontWeight: '900',
        marginTop: 4,
    },
    actionBtn: {
        backgroundColor: '#db2777',
        borderRadius: 16,
        paddingVertical: 14,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#db2777',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 6,
        marginBottom: 12,
    },
    actionBtnText: {
        fontSize: 15,
        color: '#ffffff',
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    menuBtn: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1.5,
        borderColor: 'rgba(0, 242, 254, 0.35)',
        shadowColor: 'transparent',
        marginBottom: 0,
    },
});
