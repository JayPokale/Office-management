import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface MaterialEntry {
  _id: string;
  userId: string;
  date: Date;
  customerName: string;
  companyName: string;
  productDetails: string;
  quotation: string;
  status: "Pending" | "Shipped" | "Delivered";
  spare?: string;
  chalanNumber: string;
  dispatchDetails: string;
  companyDetails?: string;
  fault?: string;
  photo: string;
}

const MaterialEntryList: React.FC<{}> = () => {
  const [entries, setEntries] = useState<MaterialEntry[]>([]);

  const fetchEntries = async () => {
    setEntries([
      {
        _id: "1",
        userId: "user123",
        date: new Date("2022-01-01"),
        customerName: "John Doe",
        companyName: "XYZ",
        productDetails: "Product XYZ",
        quotation: "Q123",
        status: "Pending",
        spare: "Spare123",
        chalanNumber: "CN456",
        dispatchDetails: "Dispatched on time",
        companyDetails: "ABC Company",
        fault: "No fault reported",
        photo: "https://example.com/photo1.jpg",
      },
      {
        _id: "2",
        userId: "user456",
        date: new Date("2022-02-15"),
        customerName: "Jane Smith",
        companyName: "XYZ",
        productDetails: "Product ABC",
        quotation: "Q789",
        status: "Shipped",
        chalanNumber: "CN789",
        dispatchDetails: "In transit",
        photo: "https://example.com/photo2.jpg",
      },
      {
        _id: "3",
        userId: "user789",
        date: new Date("2022-03-10"),
        customerName: "Bob Johnson",
        companyName: "XYZ",
        productDetails: "Product LMN",
        quotation: "Q456",
        status: "Delivered",
        chalanNumber: "CN123",
        dispatchDetails: "Successfully delivered",
        companyDetails: "XYZ Corporation",
        fault: "Minor issue reported",
        photo: "https://example.com/photo3.jpg",
      },
      // Add more entries as needed
    ]);
    // try {
    //   const response = await axios.get('https://your-api-endpoint.com/entries'); // Replace with your API endpoint
    //   setEntries(response.data);
    // } catch (error) {
    //   console.error(error);
    //   // Handle errors appropriately, e.g., display an error message
    // }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const navigateToDetails = (id: string) => {
    router.push({ pathname: `/material/${id}` });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "#cb1c26";
      case "Shipped":
        return "#f7bb01";
      case "Delivered":
        return "#198754";
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 10 }}>
        <Link href="/material/" style={styles.addButtom}>
          <Text
            style={{ color: "#007bff", alignItems: "center", display: "flex" }}
          >
            <Ionicons name="archive-outline" size={24} color={"#007bff"} /> Add
            Material
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
                      {entry.date.toLocaleDateString("en-gb").replaceAll("/", "-")}
                    </Text>
                  </View>
                  <Text style={styles.listItemText}>{entry.chalanNumber}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text>Loading entries...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addButtom: {
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

export default MaterialEntryList;
