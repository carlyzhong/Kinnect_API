const db = require("../../db/connection");

exports.convertTimestampToDate = ({
  created_at,
  birthdate,
  ...otherProperties
}) => {
  if (created_at && !birthdate) {
    return { created_at: new Date(created_at), ...otherProperties };
  } else if (birthdate && !created_at) {
    return { birthdate: new Date(birthdate), ...otherProperties };
  } else if (birthdate && created_at) {
    return {
      created_at: new Date(created_at),
      birthdate: new Date(birthdate),
      ...otherProperties,
    };
  }
  return { ...otherProperties };
};

exports.createRef = (data, key, value) => {
  if (data.length === 0) return {};
  const referenceData = {};
  for (let i = 0; i < data.length; i++) {
    referenceData[data[i][key]] = data[i][value];
  }
  return referenceData;
};
