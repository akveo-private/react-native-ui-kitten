import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Datepicker, Text, CalendarViewModeId } from "@ui-kitten/components";

export const DatepickerAccessoriesShowcase = () => {
  const [date, setDate] = React.useState(new Date());

  const renderRightArrow = (id: CalendarViewModeId) => {
    return (
      <View style={styles.arrow}>
        <TouchableOpacity>
          <Text>{id}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Datepicker
      label="Label"
      caption="Caption"
      placeholder="Pick Date"
      date={date}
      onSelect={(nextDate) => setDate(nextDate)}
      renderArrowRight={renderRightArrow}
    />
  );
};

const styles = StyleSheet.create({
  arrow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
