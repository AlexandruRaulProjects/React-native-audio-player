import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { SearchBarProps } from "react-native-screens";

const defaultSearchOptions = {
  tintColor: "#F1F1F1",
  hideWhenScrolling: false,
};

export const useNavigationSearch = ({ searchBarOptions }) => {
  const [search, setSearch] = useState("");

  const navigation = useNavigation();

  const handleOnChangeText = ({ nativeEvent: { text } }) => {
    setSearch(text);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        ...defaultSearchOptions,
        ...searchBarOptions,
        onChangeText: handleOnChangeText,
      },
    });
  }, [navigation, searchBarOptions]);

  return search;
};
