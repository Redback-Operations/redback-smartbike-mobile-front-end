import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import CustomSafeArea from "@/components/CustomSafeArea";
import DropDown from "@/components/DropDown";
import { useThemeStyles } from "@/hooks/useThemeStyles";

const options = ["General Equiry", "Technical Support", "Billing", "Other"];

const Contact = () => {
  const { theme, inlineStyles } = useThemeStyles();
  const [formData, setFormData] = useState({
    subject: "",
    category: "Select...",
    email: "",
    message: "",
  });

  const handleCategorySelect = (option) => {
    setFormData({ ...formData, category: option });
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <CustomSafeArea>
        <View style={[inlineStyles.background, { flex: 1, justifyContent: 'center', paddingHorizontal: 16 }]}>
          <Text style={{
            color: theme.text,
            fontSize: 30,
            marginVertical: 32,
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            How can we help?
          </Text>
          <View style={{ gap: 16, marginVertical: 16, flex: 1 }}>
            <TextInput
              style={{
                color: theme.text,
                backgroundColor: theme.surface,
                borderWidth: 1.5,
                borderRadius: 12,
                padding: 16,
                borderColor: theme.border,
              }}
              placeholderTextColor={theme.textSecondary}
              placeholder="Subject"
              value={formData.subject}
              onChangeText={(text) =>
                setFormData({ ...formData, subject: text })
              }
            />
            <DropDown
              data={formData}
              setData={setFormData}
              category={formData.category}
              options={options}
              selectedOption={formData.category}
              handlePress={handleCategorySelect}
            ></DropDown>
            <TextInput
              style={{
                color: theme.text,
                backgroundColor: theme.surface,
                borderWidth: 1.5,
                borderRadius: 12,
                padding: 16,
                borderColor: theme.border,
              }}
              placeholderTextColor={theme.textSecondary}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              autoCapitalize="none"
            />
            <TextInput
              style={{
                color: theme.text,
                backgroundColor: theme.surface,
                borderWidth: 1.5,
                borderRadius: 12,
                padding: 16,
                borderColor: theme.border,
                height: 120,
                textAlignVertical: "top"
              }}
              placeholderTextColor={theme.textSecondary}
              placeholder="Message"
              value={formData.message}
              onChangeText={(text) =>
                setFormData({ ...formData, message: text })
              }
              multiline={true}
            />
            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity style={{
                backgroundColor: theme.primary,
                width: '100%',
                paddingVertical: 16,
                borderRadius: 12
              }}>
                <Text style={{
                  color: 'white',
                  fontWeight: '600',
                  textAlign: 'center',
                  fontSize: 18
                }}>
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CustomSafeArea>
    </TouchableWithoutFeedback>
  );
};

export default Contact;
