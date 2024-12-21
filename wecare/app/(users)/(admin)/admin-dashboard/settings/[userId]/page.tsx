import SettingUI from "@/components/SettingUI";
import React from "react";

const Settings = ({ params }: { params: { userId: string } }) => {
  return <SettingUI userId={params.userId} />;
};

export default Settings;
