export interface DatePickerProps {
  calendarType?: string;
  activeStartDate?: Date;
  allowPartialRange?: boolean;
  defaultActiveStartDate?: Date;
  defaultValue?: Date | Date[];
  // "month" "year" "decade" "century"
  defaultView?: string;
  // "hu-HU, https://en.wikipedia.org/wiki/IETF_language_tag"
  locale?: string;
  maxDate?: Date;
  // "month" "year" "decade" "century"
  maxDetail?: string;
  minDate?: Date;
  minDetail?: string;
  // ">, React element: <NextIcon />"
  nextLabel?: string;
  // ">>, React element: <NextIcon />"
  next2Label?: string;
  // "<, React element: <NextIcon />"
  prevLabel?: string;
  // "<<, React element: <NextIcon />"
  prev2Label?: string;
  selectRange: boolean;
  onDateSelect(date: Date, event: React.SyntheticEvent<any> | undefined): void;
  dateValue?: Date;
}
