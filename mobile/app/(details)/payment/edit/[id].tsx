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

const EditPaymentEntry = () => {
  const { id } = useLocalSearchParams();
  const [entry, setEntry] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [customerDetails, setCustomerDetails] = useState("");
  const [billNo, setBillNo] = useState("");
  const [quotationDetails, setQuotationDetails] = useState("");
  const [companyDetails, setCompanyDetails] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [amountRemaining, setAmountRemaining] = useState(0);
  const [status, setStatus] = useState("Pending");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_BACKEND_URI}/payment-entry/${id}`
        );
        setEntry(response.data);
        setCustomerName(response.data.customerName);
        setCustomerDetails(response.data.customerDetails);
        setBillNo(response.data.billNo);
        setQuotationDetails(response.data.quotationDetails);
        setCompanyDetails(response.data.companyDetails);
        setCompanyName(response.data.companyName);
        setAmountRemaining(response.data.amountRemaining);
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
      customerDetails,
      billNo,
      quotationDetails,
      companyDetails,
      companyName,
      amountRemaining,
      status,
    };

    try {
      const response = await axios.put(
        `${process.env.EXPO_PUBLIC_BACKEND_URI}/payment-entry/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        router.replace("/payments");
      } else {
        alert("Error saving payment: Try again later");
      }
    } catch (error) {
      alert("Error saving payment: Try again later");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {entry && (
        <>
          <Text style={styles.title}>Edit Payment Entry</Text>
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
            placeholder="Bill No"
            value={billNo}
            onChangeText={setBillNo}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Quotation Details"
            value={quotationDetails}
            onChangeText={setQuotationDetails}
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
            placeholder="Amount Remaining"
            value={amountRemaining.toString()}
            onChangeText={(text) => setAmountRemaining(parseFloat(text))}
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

export default EditPaymentEntry;
