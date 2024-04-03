import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

interface ServiceEntry {
  _id: string;
  userId: string;
  date: string;
  customerName: string;
  customerDetails: string;
  companyName?: string;
  companyDetails?: string;
  productDetails: string;
  materialUsed?: string;
  quotation: string;
  status: "Pending" | "Delivered";
  fault?: string;
}

const ServiceEntryDetails = () => {
  const { id } = useLocalSearchParams();
  const [entry, setEntry] = useState<ServiceEntry | null>(null);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_BACKEND_URI}/service-entry/${id}`
    );

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
      <Text style={styles.title}>Service Entry Details</Text>
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
            <Text style={styles.detailLabel}>Customer Name:</Text>
            <Text style={styles.detailText}>{entry.customerName}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Customer Details:</Text>
            <Text style={styles.detailText}>{entry.customerDetails}</Text>
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
            <Text style={styles.detailLabel}>Material Used:</Text>
            <Text style={styles.detailText}>{entry.materialUsed}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Quotation:</Text>
            <Text style={styles.detailText}>{entry.quotation}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Fault:</Text>
            <Text style={styles.detailText}>{entry.fault}</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              router.push({ pathname: `/service/edit/${id}` });
            }}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading details...</Text>
      )}
    </ScrollView>
  );
};

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
    width: 150,
    fontWeight: "bold",
  },
  detailText: {
    flex: 1,
  },
  editButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ServiceEntryDetails;
