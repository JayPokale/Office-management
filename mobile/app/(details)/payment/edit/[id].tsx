import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import uploadImage from "@/app/utils/uploadImage";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
}

const InputField: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  multiline = false,
}) => (
  <TextInput
    style={styles.textInput}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    multiline={multiline}
  />
);

interface PaymentEntry {
  userId: string;
  customerName: string;
  companyName: string;
  companyDetails: string;
  billNo: string;
  quotationDetails: string;
  amountRemaining: number;
  status: string;
  photo: string;
  date: Date;
}

const EditPaymentEntry = () => {
  const { id } = useLocalSearchParams();
  const [entry, setEntry] = useState<PaymentEntry | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyDetails, setCompanyDetails] = useState("");
  const [billNo, setBillNo] = useState("");
  const [quotationDetails, setQuotationDetails] = useState("");
  const [amountRemaining, setAmountRemaining] = useState(0);
  const [status, setStatus] = useState<string>("Pending");
  const [offlinePhoto, setOfflinePhoto] = useState("");
  const [photo, setPhoto] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { getToken, userId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      try {
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
        setCustomerName(response.data.customerName);
        setCompanyName(response.data.companyName);
        setCompanyDetails(response.data.companyDetails);
        setBillNo(response.data.billNo);
        setQuotationDetails(response.data.quotationDetails);
        setAmountRemaining(response.data.amountRemaining);
        setStatus(response.data.status);
        setOfflinePhoto(response.data.photo);
        setPhoto(response.data.photo);
        setSelectedDate(new Date(response.data.date));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleDateChange = (_: DateTimePickerEvent, date?: Date) => {
    setSelectedDate(date || new Date());
    setShowDatePicker(false);
  };

  const pickPhotoAndUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setIsLoading(true);
      const { uri } = result.assets[0];
      setOfflinePhoto(uri);
      const secureURI = await uploadImage(uri);
      setPhoto(secureURI);
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (isLoading) return;

    const data = {
      userId,
      customerName,
      companyName,
      companyDetails,
      billNo,
      quotationDetails,
      amountRemaining,
      status,
      photo,
      date: selectedDate,
    };

    try {
      const token = await getToken();
      const response = await axios.put(
        `${process.env.EXPO_PUBLIC_BACKEND_URI}/payment-entry/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        router.replace("/payments");
      } else {
        alert("Error saving payment entry: Try again later");
      }
    } catch (error) {
      alert("Error saving payment entry: Try again later");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {entry && (
        <>
          <Text style={styles.title}>Edit Payment Entry</Text>
          <InputField
            placeholder="Customer Name"
            value={customerName}
            onChangeText={setCustomerName}
          />
          <InputField
            placeholder="Company Name"
            value={companyName}
            onChangeText={setCompanyName}
          />
          <InputField
            placeholder="Company Details"
            value={companyDetails}
            onChangeText={setCompanyDetails}
          />
          <InputField
            placeholder="Bill No"
            value={billNo}
            onChangeText={setBillNo}
          />
          <InputField
            placeholder="Quotation Details"
            value={quotationDetails}
            onChangeText={setQuotationDetails}
            multiline
          />
          <InputField
            placeholder="Amount Remaining"
            value={amountRemaining.toString()}
            onChangeText={(text) => setAmountRemaining(parseFloat(text))}
          />
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.datePickerButton}
          >
            <Text>
              {selectedDate.toLocaleDateString("en-gb").replaceAll("/", "-")}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
            />
          )}
          <TouchableOpacity
            onPress={pickPhotoAndUpload}
            style={styles.uploadButton}
          >
            {offlinePhoto ? (
              <Image
                source={{ uri: offlinePhoto }}
                style={styles.uploadPhoto}
              />
            ) : (
              <Text style={styles.uploadButtonText}>Upload Photo</Text>
            )}
          </TouchableOpacity>
          <Button title="Save" onPress={handleSave} disabled={isLoading} />
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
  datePickerButton: {
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
  },
  uploadButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#333",
    fontSize: 16,
  },
  uploadPhoto: {
    width: "100%",
    aspectRatio: 3 / 4,
    resizeMode: "cover",
    borderRadius: 5,
  },
});

export default EditPaymentEntry;
