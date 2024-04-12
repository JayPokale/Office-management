import EntryList from "@/components/Entrylist";
import React from "react";

const PaymentEntryList: React.FC<{}> = () => {
  return <EntryList entryType="payment" fetchEndpoint="payment-entry" />;
};

export default PaymentEntryList;
