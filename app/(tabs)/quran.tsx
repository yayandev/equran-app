import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TabTwoScreen() {
  const [surats, setSurats] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchSurat, setSearchSurat] = useState<any>([]);

  const handleSearch = (text: string) => {
    const filteredSurat = surats.filter((surat: any) => {
      const cleanedName = surat.name_id.replace(/-/g, ""); // Menghapus tanda "-"
      return cleanedName.toLowerCase().includes(text.toLowerCase());
    });

    setSearchSurat(filteredSurat);

    if (text === "") {
      setSearchSurat([]);
    }
  };

  useEffect(() => {
    const fetchSurat = async () => {
      const response = await fetch(
        "https://api.myquran.com/v2/quran/surat/semua"
      );

      const data = await response.json();

      if (data.data) {
        setSurats(data.data);
        setLoading(false);
      }
    };

    fetchSurat();

    return () => {};
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={{ paddingHorizontal: 20 }}>
        <ImageBackground
          source={require("../../assets/images/bg-header-quran.png")}
          style={styles.header}
        >
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>بسم الله الرحمن الرحيم</Text>
            <View style={styles.divider} />
            <Text style={styles.headerText}>Mari membaca alquran</Text>
          </View>
          <Image
            source={require("../../assets/images/ilustration-quran.png")}
            style={styles.headerImage}
          />
        </ImageBackground>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.formSearch}>
          <Ionicons name="search" size={24} color="black" />
          <TextInput
            placeholder="Cari surat"
            onChangeText={(text) => handleSearch(text)}
            style={styles.input}
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerSurat}>
          {loading ? (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <View
                  key={index}
                  style={{ marginBottom: 5, paddingHorizontal: 10 }}
                >
                  <View style={styles.skeletonCard} />
                </View>
              ))}
            </>
          ) : (
            <>
              {searchSurat.length > 0 ? (
                <>
                  {searchSurat.map((surat: any, index: number) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        router.push(`/surat/${surat?.number}` as any)
                      }
                    >
                      <View style={styles.cardSurat}>
                        <View
                          style={{
                            alignItems: "center",
                            flexDirection: "row",
                            gap: 10,
                          }}
                        >
                          <ImageBackground
                            source={require("../../assets/images/vector.png")}
                            style={styles.numberBgImage}
                          >
                            <Text style={styles.number}>{surat?.number}</Text>
                          </ImageBackground>
                          <View>
                            <Text style={styles.nameLatin}>
                              {surat?.name_id}
                            </Text>
                            <Text style={styles.ayat}>
                              {surat?.revelation_id} - {surat?.number_of_verses}{" "}
                              ayat
                            </Text>
                          </View>
                        </View>
                        <Text style={styles.nameArab}>{surat?.name_short}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </>
              ) : (
                <>
                  {surats.map((surat: any, index: number) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        router.push(`/surat/${surat?.number}` as any)
                      }
                    >
                      <View style={styles.cardSurat}>
                        <View
                          style={{
                            alignItems: "center",
                            flexDirection: "row",
                            gap: 10,
                          }}
                        >
                          <ImageBackground
                            source={require("../../assets/images/vector.png")}
                            style={styles.numberBgImage}
                          >
                            <Text style={styles.number}>{surat?.number}</Text>
                          </ImageBackground>
                          <View>
                            <Text style={styles.nameLatin}>
                              {surat?.name_id}
                            </Text>
                            <Text style={styles.ayat}>
                              {surat?.revelation_id} - {surat?.number_of_verses}{" "}
                              ayat
                            </Text>
                          </View>
                        </View>
                        <Text style={styles.nameArab}>{surat?.name_short}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTextContainer: {
    width: "60%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  divider: {
    height: 1,
    width: "90%",
    backgroundColor: "white",
  },
  headerImage: {
    width: "40%",
    height: "100%",
    resizeMode: "contain",
  },
  formSearch: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#B121BF",
    gap: 10,
  },
  input: {
    flex: 1,
  },
  containerSurat: {
    flex: 1,
    flexDirection: "column",
  },
  cardSurat: {
    width: "100%",
    height: 60,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#B121BF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  numberBgImage: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontSize: 12,
    fontWeight: "500",
    color: "#B121BF",
  },
  nameLatin: {
    fontSize: 16,
    fontWeight: "600",
  },
  ayat: {
    fontSize: 12,
    fontWeight: "500",
    color: "gray",
  },
  nameArab: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#B121BF",
  },
  skeletonCard: {
    width: "100%",
    height: 60,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
  },
});
