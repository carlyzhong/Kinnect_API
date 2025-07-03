const db = require("../../db/connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (data, key, value) => {
  if (data.length === 0) return {};
  const referenceData = {};
  for (let i = 0; i < data.length; i++) {
    referenceData[data[i][key]] = data[i][value];
  }
  return referenceData;
};
