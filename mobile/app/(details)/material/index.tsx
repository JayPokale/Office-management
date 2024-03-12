import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import uploadImage from "@/app/utils/uploadImage";

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

const AddMaterialEntry = () => {
  const [customerName, setCustomerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [quotation, setQuotation] = useState("");
  const [status, setStatus] = useState<string>("Pending"); // Set default status
  const [spare, setSpare] = useState("");
  const [chalanNumber, setChalanNumber] = useState("");
  const [dispatchDetails, setDispatchDetails] = useState("");
  const [companyDetails, setCompanyDetails] = useState("");
  const [fault, setFault] = useState("");
  const [photo, setPhoto] = useState("");

  const statuses = ["Pending", "Shipped", "Delivered"]; // Available status options

  async function pickPhotoAndUpload() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const { uri, base64 } = result.assets[0];
      setPhoto(uri);
      // const fileType = uri.split(".").pop();
      // const file = `data:${fileType};base64,${base64}`;
      // const secureURI = await uploadImage(file);
      // setPhoto(secureURI);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Material Entry</Text>
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
        onPress={pickPhotoAndUpload}
        style={styles.uploadButton}
      >
        <Text style={styles.uploadButtonText}>Upload Photo</Text>
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
      <Button title="Save" onPress={() => {}} />
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
    color: "blue", // Adjust color as needed
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
});

export default AddMaterialEntry;
