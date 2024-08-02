export const ellipsisMiddle = (
  text: string,
  maxLength: number,
  mimLength?: number
): string => {
  if (text?.length > maxLength + 6) {
    return (
      text?.slice(0, maxLength) +
      "..." +
      text?.slice(text?.length - (mimLength || maxLength))
    );
  } else {
    return text;
  }
};

export const semicolon = (number: number | string) => {
  return new Intl.NumberFormat().format(Number(number));
};