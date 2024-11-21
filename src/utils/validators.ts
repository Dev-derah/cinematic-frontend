export const isNotEmpty = (fieldName: string)=>(value: string) => {
  return value.trim() === "" ? `${fieldName} is required` : null;
};

export const isEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !emailRegex.test(value) ? "Please enter a valid email" : null;
};

export const minLength = (min: number) => {
  return (value: string) => {
    return value.length < min
      ? `Must be at least ${min} characters long`
      : null;
  };
};

export const maxLength = (max: number) =>{
  return (value: string) => {
    return value.length > max
      ? `Must not be more than ${max} characters long`
      : null;
  };
}


export const isPhoneNumber = (value: string) =>{
    const PhoneNumberRegex=  /^\+?[1-9]\d{1,14}$/;
    return !PhoneNumberRegex.test(value) ? "Invalid Phone Number" : null;
}
