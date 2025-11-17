import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

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
      <TextInput
        style={styles.input}
        placeholder="Nhập tên thành phố..."
        placeholderTextColor="#888"
        value={city}
        onChangeText={setCity}
      />

      <Button title="Xem thời tiết" onPress={getWeather} />

      {loading && <Text style={styles.loading}>Đang tải…</Text>}
      {error !== "" && <Text style={styles.error}>{error}</Text>}

      {weather && (
        <View style={styles.result}>
          <Text style={styles.text}>🌡 Nhiệt độ: {weather.temp}°C</Text>
          <Text style={styles.text}>💨 Gió: {weather.wind} km/h</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    padding: 10,
    borderRadius: 5,
    color: "#fff",
    backgroundColor: "#222",
    marginBottom: 10,
  },
  loading: { color: "yellow", marginTop: 10, fontSize: 18 },
  error: { color: "red", marginTop: 10 },
  result: { marginTop: 20 },
  text: { color: "#fff", fontSize: 20, marginVertical: 5 },
});