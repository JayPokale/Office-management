import EntryList from "@/components/Entrylist";
import React from "react";

const PurchaseEntryList: React.FC<{}> = () => {
  return <EntryList entryType="purchase" fetchEndpoint="purchase-entry" />;
};

export default PurchaseEntryList;
