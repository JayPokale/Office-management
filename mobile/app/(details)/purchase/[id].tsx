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

interface PurchaseEntry {
  _id: string;
  userId: string;
  date: string;
  customerName: string;
  companyName: string;
  companyDetails: string;
  productDetails: string;
  materialUsed: string;
  chalanNumber: string;
  cost: number;
  status: "Pending" | "Paid";
  photo: string;
}

const PurchaseEntryDetails = () => {
  const { id } = useLocalSearchParams();
  const [entry, setEntry] = useState<PurchaseEntry | null>(null);
  const setLoaderState = useContext(LoaderContext);
  const { getToken } = useAuth();

  const fetchData = async () => {
    setLoaderState(true);
    const token = await getToken();
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_BACKEND_URI}/purchase-entry/${id}`,
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
        `${process.env.EXPO_PUBLIC_BACKEND_URI}/purchase-entry/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.replace("/purchases");
    } catch (error) {
      alert("Failed to delete purchase entry.");
    }
    setLoaderState(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Purchase Entry Details</Text>
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
            <Text style={styles.detailLabel}>Material Used:</Text>
            <Text style={styles.detailText}>{entry.materialUsed}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Cost:</Text>
            <Text style={styles.detailText}>{entry.cost}</Text>
          </View>
          {entry.photo && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: entry.photo }} style={styles.image} />
            </View>
          )}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              router.push({ pathname: `/purchase/edit/${id}` });
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

export default PurchaseEntryDetails;
