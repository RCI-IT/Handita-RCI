const checkUniqueData = (value: any, key: string, apiData: any) => {
  const isUnique =
    !apiData || apiData.every((item: any) => item[key] !== value);
  return isUnique;
};

export { checkUniqueData };
