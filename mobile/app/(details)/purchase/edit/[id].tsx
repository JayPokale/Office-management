import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";

const EditPurchaseEntry = () => {
  const { id } = useLocalSearchParams();
  const [entry, setEntry] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [companyDetails, setCompanyDetails] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [materialUsed, setMaterialUsed] = useState("");
  const [chalanNumber, setChalanNumber] = useState("");
  const [cost, setCost] = useState(0);
  const [status, setStatus] = useState("Pending");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_BACKEND_URI}/purchase-entry/${id}`
        );
        setEntry(response.data);
        setCustomerName(response.data.customerName);
        setCompanyDetails(response.data.companyDetails);
        setCompanyName(response.data.companyName);
        setProductDetails(response.data.productDetails);
        setMaterialUsed(response.data.materialUsed);
        setChalanNumber(response.data.chalanNumber);
        setCost(response.data.cost);
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSave = async () => {
    const data = {
      customerName,
      companyDetails,
      companyName,
      productDetails,
      materialUsed,
      chalanNumber,
      cost,
      status,
    };

    try {
      const response = await axios.put(
        `${process.env.EXPO_PUBLIC_BACKEND_URI}/purchase-entry/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        router.replace("/purchases");
      } else {
        alert("Error saving purchase: Try again later");
      }
    } catch (error) {
      alert("Error saving purchase: Try again later");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {entry && (
        <>
          <Text style={styles.title}>Edit Purchase Entry</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Customer Name"
            value={customerName}
            onChangeText={setCustomerName}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Company Details"
            value={companyDetails}
            onChangeText={setCompanyDetails}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Company Name"
            value={companyName}
            onChangeText={setCompanyName}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Product Details"
            value={productDetails}
            onChangeText={setProductDetails}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Material Used"
            value={materialUsed}
            onChangeText={setMaterialUsed}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Chalan Number"
            value={chalanNumber}
            onChangeText={setChalanNumber}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Cost"
            value={cost.toString()}
            onChangeText={(text) => setCost(parseFloat(text))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Status"
            value={status}
            onChangeText={setStatus}
          />
          <Button title="Save" onPress={handleSave} />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textInput: {
    marginBottom: 10,
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
  },
});

export default EditPurchaseEntry;
