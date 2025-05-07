const db = require("../../db/connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.formatData = (data) => {
  return data.map((singleData) => Object.values(singleData));
};

exports.createRef = (data) => {
  if (data.length === 0) return {};
  const referenceData = {};
  for (let i = 0; i < data.length; i++) {
    referenceData[data[i].title] = data[i].article_id;
  }
  return referenceData;
};
