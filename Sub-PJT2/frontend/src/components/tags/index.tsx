import React from "react";
import Tags from "@yaireo/tagify/dist/react.tagify";
import { TagifySettings } from "@yaireo/tagify";

// ================= TAGFIELD ==================

// Tagify settings object
const baseTagifySettings: TagifySettings = {
  blacklist: [],
  maxTags: 6,
  backspace: "edit",
  placeholder: "type something",
  editTags: 1,
  dropdown: {
    enabled: 0,
  },
  callbacks: {},
};

interface TagFieldProps {
  label: string;
  name: string;
  initialValue?: string[];
  suggestions?: string[];
}

const TagField: React.FC<TagFieldProps> = ({ label, name, initialValue = [], suggestions = [] }) => {

  const handleChange = (e: any) => {
    console.log(e.type, " ==> ", e.detail.tagify.value.map((item: any) => item.value));
  };

  const settings: TagifySettings = {
    ...baseTagifySettings,
    whitelist: suggestions,
    callbacks: {
      add: handleChange,
      remove: handleChange,
      blur: handleChange,
      // edit: handleChange,
      invalid: handleChange,
      click: handleChange,
      focus: handleChange,
      "edit:updated": handleChange,
      "edit:start": handleChange,
    },
  };

  return (
    <div className="form-group">
      <label htmlFor={"field-" + name}>{label}</label>
      <Tags settings={settings} value={initialValue} />
    </div>
  );
};

// ================= APP ======================

const App = () => {
  const suggestions = [
    "apple",
    "banana",
    "cucumber",
    "dewberries",
    "elderberry",
    "farkleberry",
    "grapes",
    "hackberry",
    "imbe",
    "jambolan",
    "kiwi",
    "lime",
    "mango",
    "nectarine",
    "orange",
    "papaya",
    "quince",
    "raspberries",
    "strawberries",
    "tangerine",
    "ugni",
    "voavanga",
    "watermelon",
    "xigua",
    "yangmei",
    "zucchini",
  ];
  return (
    <div className="App">
      <h1>Tagify</h1>
      <TagField initialValue={["foo", "brazil"]} suggestions={suggestions} label={""} name={""} />
    </div>
  );
};

export default App;
