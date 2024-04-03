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

const PaymentEntryDetails = () => {
  const { id } = useLocalSearchParams();
  const [entry, setEntry] = useState<PaymentEntry | null>(null);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_BACKEND_URI}/payment-entry/${id}`
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
      <Text style={styles.title}>Payment Entry Details</Text>
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
            <Text style={styles.detailLabel}>Bill No:</Text>
            <Text style={styles.detailText}>{entry.billNo}</Text>
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
            <Text style={styles.detailLabel}>Quotation Details:</Text>
            <Text style={styles.detailText}>{entry.quotationDetails}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Amount Remaining:</Text>
            <Text style={styles.detailText}>{entry.amountRemaining}</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              router.push({ pathname: `/payment/edit/${id}` });
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

export default PaymentEntryDetails;
