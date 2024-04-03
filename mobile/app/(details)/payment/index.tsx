import React, { useState } from "react";
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
import { useRouter } from "expo-router";

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

const AddPaymentEntry = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerDetails, setCustomerDetails] = useState("");
  const [billNo, setBillNo] = useState("");
  const [quotationDetails, setQuotationDetails] = useState("");
  const [companyDetails, setCompanyDetails] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [amountRemaining, setAmountRemaining] = useState("");
  const [status, setStatus] = useState<string>("Pending");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [offlinePhoto, setOfflinePhoto] = useState("");
  const [photo, setPhoto] = useState("");
  const router = useRouter();

  const statuses = ["Pending", "Paid"];

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
      const { uri } = result.assets[0];
      setOfflinePhoto(uri);
      const secureURI = await uploadImage(uri);
      setPhoto(secureURI);
    }
  };

  const handleSave = async () => {
    const data = {
      userId: "123",
      customerName,
      customerDetails,
      billNo,
      quotationDetails,
      companyDetails,
      companyName,
      amountRemaining: parseInt(amountRemaining),
      status,
      photo,
      date: selectedDate,
    };

    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND_URI}/payment-entry`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
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
      <Text style={styles.title}>Add Payment Entry</Text>
      <InputField
        placeholder="Customer Name"
        value={customerName}
        onChangeText={setCustomerName}
      />
      <InputField
        placeholder="Customer Details"
        value={customerDetails}
        onChangeText={setCustomerDetails}
      />
      <InputField
        placeholder="Bill Number"
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
        placeholder="Company Details"
        value={companyDetails}
        onChangeText={setCompanyDetails}
        multiline
      />
      <InputField
        placeholder="Company Name"
        value={companyName}
        onChangeText={setCompanyName}
      />
      <InputField
        placeholder="Amount Remaining"
        value={amountRemaining}
        onChangeText={setAmountRemaining}
      />
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.datePickerButton}
      >
        <Text>
          {selectedDate!.toLocaleDateString("en-gb").replaceAll("/", "-")}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate!}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}
      {/* <TouchableOpacity
        onPress={pickPhotoAndUpload}
        style={styles.uploadButton}
      >
        {offlinePhoto ? (
          <Image source={{ uri: offlinePhoto }} style={styles.uploadPhoto} />
        ) : (
          <Text style={styles.uploadButtonText}>Upload Photo</Text>
        )}
      </TouchableOpacity> */}
      <View style={styles.radioContainerWrapper}>
        {statuses.map((statusText: string) => (
          <TouchableOpacity
            key={statusText}
            style={styles.radioButtonContainer}
            onPress={() => setStatus(statusText)}
          >
            <Text
              style={
                status === statusText ? styles.radioButtonTextSelected : {}
              }
            >
              {statusText}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Save" onPress={handleSave} />
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
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  radioButtonTextSelected: {
    color: "blue",
  },
  radioContainerWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: "auto",
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
  datePickerButton: {
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
  },
});

export default AddPaymentEntry;
