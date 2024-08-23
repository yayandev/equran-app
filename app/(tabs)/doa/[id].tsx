import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";

export default function DoaScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [doa, setDoa] = useState<any>({});

  useEffect(() => {
    const fetchDoa = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.myquran.com/v2/doa/${id}`);
        const data = await response.json();

        if (data.data) {
          setDoa(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching doa:", error);
        setLoading(false);
      }
    };

    fetchDoa();
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
          <Pressable onPress={() => router.push("/prayer")}>
            <Ionicons name="chevron-back-outline" size={30} color="#B121BF" />
          </Pressable>
          <Text style={styles.judul}>{doa.judul}</Text>
          <Text style={styles.arab}>{doa.arab}</Text>
          <Text style={styles.arti}>{doa.indo}</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    gap: 10,
  },
  judul: {
    fontSize: 20,
    fontWeight: "600",
  },
  arab: {
    fontSize: 30,
    fontWeight: "semibold",
    color: "#B121BF",
    textAlign: "right",
    marginVertical: 20,
  },
  latin: {
    fontSize: 18,
    fontWeight: "500",
    color: "gray",
  },
  arti: {
    fontSize: 16,
  },
});
