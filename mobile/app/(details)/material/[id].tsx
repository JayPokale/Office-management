import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

interface MaterialEntry {
  _id: string;
  userId: string;
  date: Date;
  customerName: string;
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

const MaterialEntryDetails = () => {
  const { id } = useLocalSearchParams();
  const [entry, setEntry] = useState<MaterialEntry | null>(null);

  const fetchData = async () => {
    // Simulating data fetching, replace with your API call
    setEntry({
      _id: "1",
      userId: "user123",
      date: new Date("2022-01-01"),
      customerName: "John Doe",
      productDetails: "Product XYZ",
      quotation: "Q123",
      status: "Pending",
      spare: "Spare123",
      chalanNumber: "CN456",
      dispatchDetails: "Dispatched on time",
      companyDetails: "ABC Company",
      fault: "No fault reported",
      photo:
        "https://images.unsplash.com/photo-1683009427660-b38dea9e8488?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
    });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Material Entry Details</Text>
      {entry ? (
        <>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Customer Name:</Text>
            <Text style={styles.detailText}>{entry.customerName}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Chalan Number:</Text>
            <Text style={styles.detailText}>{entry.chalanNumber}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Status:</Text>
            <Text style={styles.detailText}>{entry.status}</Text>
          </View>
          {/* Add detail views for other properties here */}
          {entry.productDetails && (
            <View style={styles.details}>
              <Text style={styles.detailLabel}>Product Details:</Text>
              <Text style={styles.detailText}>{entry.productDetails}</Text>
            </View>
          )}
          {entry.quotation && (
            <View style={styles.details}>
              <Text style={styles.detailLabel}>Quotation:</Text>
              <Text style={styles.detailText}>{entry.quotation}</Text>
            </View>
          )}
          {entry.fault && (
            <View style={styles.details}>
              <Text style={styles.detailLabel}>Fault:</Text>
              <Text style={styles.detailText}>{entry.fault}</Text>
            </View>
          )}
          {/* Add more details as needed */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: entry.photo }} style={styles.image} />
          </View>
        </>
      ) : (
        <Text>Loading details...</Text>
      )}
    </View>
  );
};

var width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  details: {
    flexDirection: "row",
    marginVertical: 5,
  },
  detailLabel: {
    width: 120,
    fontWeight: "bold",
  },
  detailText: {
    flex: 1,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  image: {
    width: width * 0.9,
    resizeMode: "contain",
    aspectRatio: 3 / 4,
  },
});

export default MaterialEntryDetails;
