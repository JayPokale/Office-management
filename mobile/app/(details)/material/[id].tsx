import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
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
  const { getToken } = useAuth();

  const fetchData = async () => {
    const token = await getToken();
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_BACKEND_URI}/material-entry/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setEntry(response.data);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const formatDate = (dateString: string) => {
    return dateString.split("T")[0].split("-").reverse().join("-");
  };

  const handleDelete = async () => {
    try {
      const token = await getToken();
      await axios.delete(
        `${process.env.EXPO_PUBLIC_BACKEND_URI}/material-entry/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.replace("/materials");
    } catch (error) {
      alert("Failed to delete material entry.");
    }
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
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              router.push({ pathname: `/material/edit/${id}` });
            }}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete</Text>
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

export default MaterialEntryDetails;
