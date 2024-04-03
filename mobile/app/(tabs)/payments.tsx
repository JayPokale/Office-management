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
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface PaymentEntry {
  _id: string;
  userId: string;
  date: string;
  customerName: string;
  customerDetails: string;
  billNo: string;
  quotationDetails: string;
  companyDetails?: string;
  companyName?: string;
  amountRemaining: number;
  status: "Pending" | "Paid";
}

const PaymentEntryList: React.FC<{}> = () => {
  const [entries, setEntries] = useState<PaymentEntry[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const fetchData = async (skip: number = 0) => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BACKEND_URI}/payment-entry?skip=${skip}`
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
    router.push({ pathname: `/payment/${id}` });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "#cb1c26";
      case "Paid":
        return "#198754";
    }
  };

  const formatDate = (dateString: string) => {
    return dateString.split("T")[0].split("-").reverse().join("-");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 10 }}>
        <Link href="/payment/" style={styles.addButton}>
          <Text
            style={{ color: "#007bff", alignItems: "center", display: "flex" }}
          >
            <Ionicons name="archive-outline" size={24} color={"#007bff"} /> Add
            Payment
          </Text>
        </Link>
      </View>
      {entries.length > 0 ? (
        entries.map((entry) => (
          <View key={entry._id}>
            <TouchableOpacity onPress={() => navigateToDetails(entry._id)}>
              <View style={styles.listItem}>
                <View>
                  <Text style={[styles.listItemText, { fontWeight: "bold" }]}>
                    {entry.customerName}
                  </Text>
                  <Text style={styles.listItemText}>{entry.companyName}</Text>
                </View>
                <View style={styles.rightDetails}>
                  <View style={styles.rightDetailsRow}>
                    <Text style={{ color: getStatusColor(entry.status) }}>
                      {entry.status}
                    </Text>
                    <Text style={styles.listItemText}>
                      {formatDate(entry.date)}
                    </Text>
                  </View>
                  <Text style={styles.listItemText}>{entry.billNo}</Text>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  rightDetailsRow: {
    flexDirection: "row",
    gap: 10,
  },
});

export default PaymentEntryList;
