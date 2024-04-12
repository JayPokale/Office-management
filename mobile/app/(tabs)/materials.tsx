import EntryList from "@/components/Entrylist";
import React from "react";

const MaterialEntryList: React.FC<{}> = () => {
  return <EntryList entryType="material" fetchEndpoint="material-entry" />;
};

export default MaterialEntryList;
