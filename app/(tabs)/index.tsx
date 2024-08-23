import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
const API_URL = "https://api.myquran.com/v2/sholat/";

async function getAddressFromCoordinates(latitude: number, longitude: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.address) {
      const address = data.display_name;
      return address;
    } else {
      console.warn("No address found for these coordinates.");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

const getJadwal = async (kota: string, tgl: string) => {
  const getKotaId = await fetch(`${API_URL}kota/cari/${kota}`);

  const dataKota = await getKotaId.json();

  if (!dataKota.data) {
    return null;
  }

  const kotaId = dataKota.data[0].id;

  if (!kotaId) {
    return null;
  }

  const getJadwal = await fetch(`${API_URL}jadwal/${kotaId}/${tgl}`);

  const dataJadwal = await getJadwal.json();

  return dataJadwal?.data?.jadwal;
};

type Jadwal = {
  subuh: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
};

export default function HomeScreen() {
  const [location, setLocation] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [time, setTime] = useState<string>("00:00");
  const [date, setDate] = useState<string>("Loading...");
  const [jadwal, setJadwal] = useState({} as Jadwal);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await getAddressFromCoordinates(
        location.coords.latitude,
        location.coords.longitude
      );

      setLocation(address);

      const tgl = new Date().toISOString().slice(0, 10);

      const parts = address.split(",");

      // Asumsi bahwa kota adalah bagian kedua
      const kota = parts[1].trim();

      const dataJadwal = await getJadwal(kota.toLowerCase(), tgl);

      setJadwal(dataJadwal);
    })();

    const intervalId = setInterval(() => {
      const currentDate = new Date();

      const updatedDate = currentDate.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const updatedTime = currentDate.toLocaleTimeString("id-ID", {
        hour: "numeric",
        minute: "numeric",
      });

      setDate(updatedDate);
      setTime(updatedTime);
    }, 1000);

    return () => clearInterval(intervalId); // Membersihkan interval saat komponen di-unmount
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={{ flex: 1, marginTop: 30 }}
      resizeMode="cover"
    >
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.title}>Jadwal Sholat</Text>
        <Text style={styles.time}>{time}</Text>
        <View style={styles.divider} />
        <Text style={styles.date}>{date}</Text>
        {location ? (
          <Text style={styles.location}>{location}</Text>
        ) : errorMsg ? (
          <Text style={styles.location}>{errorMsg}</Text>
        ) : (
          <Text style={styles.location}>Loading...</Text>
        )}
      </View>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardText}>Subuh</Text>
          <Text style={styles.cardText}>
            {jadwal !== null ? jadwal?.subuh : "00:00"}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Dzuhur</Text>
          <Text style={styles.cardText}>
            {jadwal !== null ? jadwal?.dzuhur : "00:00"}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Ashar</Text>
          <Text style={styles.cardText}>
            {jadwal !== null ? jadwal?.ashar : "00:00"}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Maghrib</Text>
          <Text style={styles.cardText}>
            {jadwal !== null ? jadwal?.maghrib : "00:00"}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Isya</Text>
          <Text style={styles.cardText}>
            {jadwal !== null ? jadwal?.isya : "00:00"}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 300,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
    color: "white",
  },
  time: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  divider: {
    height: 1,
    width: "90%",
    backgroundColor: "white",
  },
  date: {
    fontSize: 15,
    color: "white",
  },
  location: {
    fontSize: 15,
    color: "white",
  },
  card: {
    padding: 20,
    height: "20%",
    width: "100%",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#B121BF",
    flexDirection: "row",
    alignItems: "center",
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#B121BF",
  },
});
