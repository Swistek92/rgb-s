type PropsType = {
  color: string;
  type: "change" | "submit";
  setError: React.Dispatch<React.SetStateAction<string>>;
};
export const NewColorValidator = ({
  color,
  type,
  setError,
}: PropsType): void | true => {
  const regexp = new RegExp(/[0-9a-f]+/i);
  const ValidLengthForSubmit = [4, 7];
  if (
    (color.length === 1 && color !== "#") ||
    (color.length > 1 && !color.startsWith("#"))
  ) {
    return setError("Color must start with #");
  } else if (color.length > 1 && !regexp.test(color.slice(-1))) {
    return setError("hex colors contains numbers and letter from a to f");
  } else if (
    type === "submit" &&
    !ValidLengthForSubmit.includes(color.length)
  ) {
    return setError("color length must be 7 or 4");
  } else if (type === "change" && color.length === 8) {
    return setError("max length 7");
  } else {
    setError("");
    return true;
  }
};
