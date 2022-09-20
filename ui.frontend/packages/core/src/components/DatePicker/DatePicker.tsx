import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/all";
import DatePicker from "react-date-picker";
import "./DatePicker.style.css";
import { DatePickerProps } from "./types";

const DatePickerComp: React.FC<DatePickerProps> = ({
  selectRange,
  onDateSelect,
  dateValue,
}) => {
  const [calValue, onChange] = useState(new Date());
  return (
    <DatePicker
      clearIcon={null}
      onChange={onDateSelect || onChange}
      value={dateValue || calValue}
      calendarIcon={<FaCalendarAlt color="grey" />}
      dayPlaceholder="DD"
      monthPlaceholder="MM"
      yearPlaceholder="YYYY"
      selectRange={selectRange}
      formatShortWeekday={(locale: string, value: Date) =>
        ["Su", "Mo", "Tu", "We", "Th", "Fri", "Sa"][value.getDay()]
      }
      required
    />
  );
};

export default DatePickerComp;
