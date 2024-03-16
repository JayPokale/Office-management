import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

interface MaterialEntry {
  _id: string;
  userId: string;
  date: string;
  customerName: string;
  companyName: string;
  productDetails: string;
  dispatchDetails: string;
  companyDetails?: string;
  quotation: string;
  status: "Pending" | "Shipped" | "Delivered";
  spare?: string;
  chalanNumber: string;
  fault?: string;
  photo: string;
}

const MaterialEntryDetails = () => {
  const { id } = useLocalSearchParams();
  const [entry, setEntry] = useState<MaterialEntry | null>(null);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_BACKEND_URI}/material-entry/${id}`
    );
    console.log(response);
    setEntry(response.data);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const formatDate = (dateString: string) => {
    return dateString.split("T")[0].split("-").reverse().join("-");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Material Entry Details</Text>
      {entry ? (
        <>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Date:</Text>
            <Text style={styles.detailText}>{formatDate(entry.date)}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Status:</Text>
            <Text style={styles.detailText}>{entry.status}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Chalan No:</Text>
            <Text style={styles.detailText}>{entry.chalanNumber}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Customer Name:</Text>
            <Text style={styles.detailText}>{entry.customerName}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Company Name:</Text>
            <Text style={styles.detailText}>{entry.companyName}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Company Details:</Text>
            <Text style={styles.detailText}>{entry.companyDetails}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Product Details:</Text>
            <Text style={styles.detailText}>{entry.productDetails}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Dispatch Details:</Text>
            <Text style={styles.detailText}>{entry.dispatchDetails}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Spare:</Text>
            <Text style={styles.detailText}>{entry.spare}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Quotation:</Text>
            <Text style={styles.detailText}>{entry.quotation}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Fault:</Text>
            <Text style={styles.detailText}>{entry.fault}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={{ uri: entry.photo }} style={styles.image} />
          </View>
        </>
      ) : (
        <Text>Loading details...</Text>
      )}
    </ScrollView>
  );
};

var width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
    width: "100%",
    aspectRatio: 3 / 4,
  },
});

export default MaterialEntryDetails;
