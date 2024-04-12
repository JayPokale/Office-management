import EntryList from "@/components/Entrylist";
import React from "react";

const ServiceEntryList: React.FC<{}> = () => {
  return <EntryList entryType="service" fetchEndpoint="service-entry" />;
};

export default ServiceEntryList;
