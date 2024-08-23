import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";

export default function SuratScreen() {
  const { id } = useLocalSearchParams();
  const [surat, setSurat] = useState<any>({});
  const [ayat, setAyat] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSurat = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://equran.id/api/v2/surat/${id}`);
        const data = await response.json();

        if (data.data) {
          setSurat(data.data);
          setAyat(data.data.ayat);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching surat:", error);
        setLoading(false);
      }
    };

    fetchSurat();
  }, [id]);

  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#B121BF" />
        </View>
      ) : (
        <View style={styles.container}>
          <StatusBar style="dark" />
          <Pressable
            style={{ padding: 10 }}
            onPress={() => router.push("/quran")}
          >
            <Ionicons name="arrow-back" size={30} color="#B121BF" />
          </Pressable>
          <ScrollView>
            <View
              style={{
                paddingHorizontal: 10,
                borderRadius: 10,
                width: "100%",
                gap: 10,
              }}
            >
              <ImageBackground
                source={require("@/assets/images/bg-header-quran.png")}
                style={styles.header}
                resizeMode="cover"
              >
                <Text style={styles.headerText}>{surat?.namaLatin}</Text>
                <Text style={styles.headerArti}>{surat?.arti}</Text>
                <View style={styles.divider} />
                <Text style={styles.headerTempat}>
                  {surat?.tempatTurun} - {surat?.jumlahAyat} Ayat
                </Text>

                <Text style={styles.headerArab}>
                  بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </Text>
              </ImageBackground>
            </View>
            <View style={styles.containerAyat}>
              {ayat?.map((ayat: any) => (
                <View style={styles.cardAyat} key={ayat?.nomorAyat}>
                  <View style={styles.number}>
                    <Text style={styles.numberText}>{ayat?.nomorAyat}</Text>
                  </View>
                  <Text style={styles.Arab}>{ayat?.teksArab}</Text>
                  <Text style={styles.Latin}>{ayat?.teksLatin}</Text>
                  <Text style={styles.Arti}>{ayat?.teksIndonesia}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  header: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  headerArab: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    width: "80%",
    backgroundColor: "white",
  },
  headerArti: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  headerTempat: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  containerAyat: {
    flex: 1,
    padding: 10,
  },
  cardAyat: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#B121BF",
  },
  number: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B121BF",
    borderRadius: 5,
  },
  numberText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  Arab: {
    fontSize: 28,
    fontWeight: "600",
    color: "#B121BF",
  },
  Latin: {
    fontSize: 12,
    fontWeight: "500",
  },
  Arti: {
    fontSize: 12,
    fontWeight: "500",
    color: "#B121BF",
  },
});
