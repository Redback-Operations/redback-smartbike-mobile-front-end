import { Alert, Platform } from "react-native";

// Alert.alert does nothing on web, so use the browser's alert/confirm there
export function showAlert(title, message, buttons) {
  if (Platform.OS !== "web") {
    Alert.alert(title, message, buttons);
    return;
  }

  const text = message ? `${title}\n\n${message}` : title;

  if (!buttons || buttons.length <= 1) {
    window.alert(text);
    buttons?.[0]?.onPress?.();
    return;
  }

  const cancel = buttons.find((b) => b.style === "cancel");
  const confirm = buttons.find((b) => b !== cancel);
  if (window.confirm(text)) confirm?.onPress?.();
  else cancel?.onPress?.();
}