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

interface MaterialEntry {
  userId: string;
  customerName: string;
  companyName: string;
  productDetails: string;
  quotation: string;
  status: string;
  spare: string;
  chalanNumber: string;
  dispatchDetails: string;
  companyDetails: string;
  fault: string;
  photo: string;
  date: Date;
}

const EditMaterialEntry = () => {
  const { id } = useLocalSearchParams();
  const [entry, setEntry] = useState<MaterialEntry | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [quotation, setQuotation] = useState("");
  const [status, setStatus] = useState<string>("Pending");
  const [spare, setSpare] = useState("");
  const [chalanNumber, setChalanNumber] = useState("");
  const [dispatchDetails, setDispatchDetails] = useState("");
  const [companyDetails, setCompanyDetails] = useState("");
  const [fault, setFault] = useState("");
  const [offlinePhoto, setOfflinePhoto] = useState("");
  const [photo, setPhoto] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { getToken, userId } = useAuth();

  const statuses = ["Pending", "Shipped", "Delivered"];

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      try {
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
        setCustomerName(response.data.customerName);
        setCompanyName(response.data.companyName);
        setProductDetails(response.data.productDetails);
        setQuotation(response.data.quotation);
        setStatus(response.data.status);
        setSpare(response.data.spare);
        setChalanNumber(response.data.chalanNumber);
        setDispatchDetails(response.data.dispatchDetails);
        setCompanyDetails(response.data.companyDetails);
        setFault(response.data.fault);
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
      productDetails,
      quotation,
      status,
      spare,
      chalanNumber,
      dispatchDetails,
      companyDetails,
      fault,
      photo,
      date: selectedDate,
    };

    try {
      const token = await getToken();
      const response = await axios.put(
        `${process.env.EXPO_PUBLIC_BACKEND_URI}/material-entry/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        router.replace("/materials");
      } else {
        alert("Error saving material: Try again later");
      }
    } catch (error) {
      alert("Error saving material: Try again later");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {entry && (
        <>
          <Text style={styles.title}>Edit Material Entry</Text>
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
            placeholder="Chalan Number"
            value={chalanNumber}
            onChangeText={setChalanNumber}
          />
          <InputField
            placeholder="Product Details"
            value={productDetails}
            onChangeText={setProductDetails}
            multiline
          />
          <InputField
            placeholder="Quotation"
            value={quotation}
            onChangeText={setQuotation}
            multiline
          />
          <InputField
            placeholder="Spare"
            value={spare}
            onChangeText={setSpare}
            multiline
          />
          <InputField
            placeholder="Dispatch Details"
            value={dispatchDetails}
            onChangeText={setDispatchDetails}
            multiline
          />
          <InputField
            placeholder="Company Details"
            value={companyDetails}
            onChangeText={setCompanyDetails}
            multiline
          />
          <InputField
            placeholder="Fault"
            value={fault}
            onChangeText={setFault}
            multiline
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

export default EditMaterialEntry;
