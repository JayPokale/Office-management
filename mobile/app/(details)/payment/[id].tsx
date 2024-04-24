import { LoaderContext } from "@/app/_layout";
import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

interface PaymentEntry {
  _id: string;
  userId: string;
  date: string;
  customerName: string;
  companyName: string;
  companyDetails: string;
  billNo: string;
  quotationDetails: string;
  amountRemaining: number;
  status: "Pending" | "Paid";
  photo: string;
}

const PaymentEntryDetails = () => {
  const { id } = useLocalSearchParams();
  const [entry, setEntry] = useState<PaymentEntry | null>(null);
  const setLoaderState = useContext(LoaderContext);
  const { getToken } = useAuth();

  const fetchData = async () => {
    setLoaderState(true);
    const token = await getToken();
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_BACKEND_URI}/payment-entry/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setEntry(response.data);
    setLoaderState(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const formatDate = (dateString: string) => {
    return dateString.split("T")[0].split("-").reverse().join("-");
  };

  const handleDelete = async () => {
    setLoaderState(true);
    try {
      const token = await getToken();
      await axios.delete(
        `${process.env.EXPO_PUBLIC_BACKEND_URI}/payment-entry/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.replace("/payments");
    } catch (error) {
      alert("Failed to delete payment entry.");
    }
    setLoaderState(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Payment Entry Details</Text>
      {entry && (
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
          {entry.photo && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: entry.photo }} style={styles.image} />
            </View>
          )}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              router.push({ pathname: `/payment/edit/${id}` });
            }}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 4,
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
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PaymentEntryDetails;
