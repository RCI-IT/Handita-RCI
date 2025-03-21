const checkDuplicate = (employeeNumber:string, existingValue:string[]) => {


  // Loop through the existing list and check if the number is already present
  for (let i = 0; i < existingValue.length; i++) {
    if (existingValue[i] === employeeNumber) {
      return true; // Duplicate found
    }
  }

  return false; // No duplicate found
};

export { checkDuplicate };
