import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import axios from "axios";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";

interface Entry {
  _id: string;
  date: string;
  customerName: string;
  companyName: string;
  status: string;
}

interface EntryListProps {
  entryType: "material" | "payment" | "purchase" | "service";
  fetchEndpoint: string;
}

const EntryList: React.FC<EntryListProps> = ({ entryType, fetchEndpoint }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const { getToken } = useAuth();

  const fetchData = async (skip: number = 0) => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BACKEND_URI}/${fetchEndpoint}?skip=${skip}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return { entries: [], hasMoreEntries: false };
    }
  };

  const fetchEntries = async () => {
    try {
      const { entries: newEntries, hasMoreEntries } = await fetchData(
        entries.length
      );
      setEntries((prevEntries) => [...prevEntries, ...newEntries]);
      setHasMore(hasMoreEntries);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const navigateToDetails = (id: string) => {
    router.push({ pathname: `/${entryType}/${id}` as `${string}:${string}` });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "#cb1c26";
      case "Shipped":
        return "#f7bb01";
      case "Delivered":
        return "#198754";
      case "Paid":
        return "#198754";
      default:
        return "#000000"; // Default color
    }
  };

  const logo = () => {
    switch (entryType) {
      case "material":
        return "archive-outline";
      case "payment":
        return "cash-outline";
      case "purchase":
        return "cart-outline";
      case "service":
        return "construct-outline";
    }
  };

  const formatDate = (dateString: string) => {
    return dateString.split("T")[0].split("-").reverse().join("-");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 10 }}>
        <TouchableOpacity
          onPress={() =>
            router.push({ pathname: `/${entryType}` as `${string}:${string}` })
          }
        >
          <View style={styles.addButton}>
            <Ionicons name={logo()} size={24} color={"#007bff"} />
            <Text style={{ color: "#007bff" }}>Add {entryType}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {entries.length > 0 ? (
        entries.map((entry, i) => (
          <View key={i}>
            <TouchableOpacity onPress={() => navigateToDetails(entry._id)}>
              <View style={styles.listItem}>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {entry.customerName}
                  </Text>
                  <Text>{entry.companyName}</Text>
                </View>
                <View style={styles.rightDetails}>
                  <Text style={{ fontSize: 16 }}>{formatDate(entry.date)}</Text>
                  <Text style={{ color: getStatusColor(entry.status) }}>
                    {entry.status}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text>Loading entries...</Text>
      )}
      {hasMore && <Button title="Load More" onPress={fetchEntries} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  addButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    padding: 10,
    backgroundColor: "#e0ffff",
    borderStyle: "dashed",
    borderColor: "lightblue",
    borderWidth: 2,
    borderRadius: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  listItemText: {
    fontSize: 16,
  },
  rightDetails: {
    alignItems: "flex-end",
  },
});

export default EntryList;
