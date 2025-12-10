export const getFilteredItemByAll = (data, filterText) => {
  return data.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(filterText.toLowerCase())
  );
};

export const getFilteredItemByField = (data, filterText, searchBy) => {
  return data.filter((item) => {
    if (item[searchBy]) {
      const fieldValue = item[searchBy];
      return fieldValue
        ?.toString()
        .toLowerCase()
        .includes(filterText.toLowerCase());
    }

    if (item.product && item.product[searchBy]) {
      const fieldValue = item.product[searchBy];
      return fieldValue
        ?.toString()
        .toLowerCase()
        .includes(filterText.toLowerCase());
    }

    return false;
  });
};
