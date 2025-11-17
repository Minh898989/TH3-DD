import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";

interface WeatherData {
  temp: number;
  wind: number;
}

export default function App() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (city.trim() === "") {
      setError("Vui lòng nhập tên thành phố!");
      return;
    }

    setError("");
    setLoading(true);
    setWeather(null);

    try {
      const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geo.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("Không tìm thấy thành phố!");
        setLoading(false);
        return;
      }

      const { latitude, longitude } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      if (!weatherData.current_weather) {
        setError("Không có dữ liệu thời tiết!");
        setLoading(false);
        return;
      }

      setWeather({
        temp: weatherData.current_weather.temperature,
        wind: weatherData.current_weather.windspeed,
      });

    } catch (e) {
      setError("Có lỗi xảy ra khi gọi API!");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>☀️ Dự Báo Thời Tiết</Text>
        <Text style={styles.subtitle}>Tra cứu thời tiết mọi nơi</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên thành phố..."
          placeholderTextColor="#a0a0a0"
          value={city}
          onChangeText={setCity}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={getWeather}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>🔍 Tìm kiếm</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loading}>⏳ Đang tải dữ liệu...</Text>
        </View>
      )}

      {error !== "" && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}

      {weather && (
        <View style={styles.result}>
          <Text style={styles.resultTitle}>Kết Quả Tra Cứu</Text>
          
          <View style={styles.weatherCard}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherIcon}>🌡️</Text>
              <View>
                <Text style={styles.weatherLabel}>Nhiệt độ</Text>
                <Text style={styles.weatherValue}>{weather.temp}°C</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.weatherItem}>
              <Text style={styles.weatherIcon}>💨</Text>
              <View>
                <Text style={styles.weatherLabel}>Tốc độ gió</Text>
                <Text style={styles.weatherValue}>{weather.wind} km/h</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#0f172a',
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(59, 130, 246, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    fontWeight: '400',
  },
  searchContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#334155',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    color: '#fff',
    backgroundColor: '#1e293b',
    marginBottom: 16,
    fontSize: 17,
    fontWeight: '500',
    shadowColor: '#3b82f6',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  loadingContainer: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  loading: {
    color: '#fbbf24',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  error: {
    color: '#ef4444',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  result: {
    marginTop: 30,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  weatherCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#3b82f6',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  weatherItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  weatherIcon: {
    fontSize: 48,
    marginRight: 20,
  },
  weatherLabel: {
    fontSize: 15,
    color: '#94a3b8',
    fontWeight: '500',
    marginBottom: 4,
  },
  weatherValue: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 16,
  },
});