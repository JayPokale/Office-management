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

const EditServiceEntry = () => {
  const { id } = useLocalSearchParams();
  const [entry, setEntry] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [customerDetails, setCustomerDetails] = useState("");
  const [companyDetails, setCompanyDetails] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [materialUsed, setMaterialUsed] = useState("");
  const [quotation, setQuotation] = useState("");
  const [status, setStatus] = useState("Pending");
  const [fault, setFault] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_BACKEND_URI}/service-entry/${id}`
        );
        setEntry(response.data);
        setCustomerName(response.data.customerName);
        setCustomerDetails(response.data.customerDetails);
        setCompanyDetails(response.data.companyDetails);
        setCompanyName(response.data.companyName);
        setProductDetails(response.data.productDetails);
        setMaterialUsed(response.data.materialUsed);
        setQuotation(response.data.quotation);
        setStatus(response.data.status);
        setFault(response.data.fault);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSave = async () => {
    const data = {
      customerName,
      customerDetails,
      companyDetails,
      companyName,
      productDetails,
      materialUsed,
      quotation,
      status,
      fault,
    };

    try {
      const response = await axios.put(
        `${process.env.EXPO_PUBLIC_BACKEND_URI}/service-entry/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        router.replace("/services");
      } else {
        alert("Error saving service: Try again later");
      }
    } catch (error) {
      alert("Error saving service: Try again later");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {entry && (
        <>
          <Text style={styles.title}>Edit Service Entry</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Customer Name"
            value={customerName}
            onChangeText={setCustomerName}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Customer Details"
            value={customerDetails}
            onChangeText={setCustomerDetails}
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
            placeholder="Quotation"
            value={quotation}
            onChangeText={setQuotation}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Fault"
            value={fault}
            onChangeText={setFault}
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

export default EditServiceEntry;
