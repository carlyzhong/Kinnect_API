const familiesUsers = require("./db/data/test-data/families_users.js");

// Create a map to track unique combinations
const seenPairs = new Map();
const duplicates = [];

familiesUsers.forEach((entry, index) => {
  // Create a unique key for each combination
  const key = `${entry.family_id}-${entry.username}`;

  if (seenPairs.has(key)) {
    // Found a duplicate
    const originalIndex = seenPairs.get(key);
    duplicates.push({
      original: {
        index: originalIndex,
        data: familiesUsers[originalIndex],
      },
      duplicate: {
        index: index,
        data: entry,
      },
      key: key,
    });
  } else {
    seenPairs.set(key, index);
  }
});

console.log("=== Families Users Duplicate Analysis ===\n");

if (duplicates.length === 0) {
  console.log("✅ No duplicate pairs found!");
  console.log(`Total unique combinations: ${seenPairs.size}`);
  console.log(`Total records: ${familiesUsers.length}`);
} else {
  console.log(`❌ Found ${duplicates.length} duplicate pair(s):\n`);

  duplicates.forEach((dup, i) => {
    console.log(`Duplicate ${i + 1}:`);
    console.log(`  Key: ${dup.key}`);
    console.log(`  Original (index ${dup.original.index}):`, dup.original.data);
    console.log(
      `  Duplicate (index ${dup.duplicate.index}):`,
      dup.duplicate.data,
    );
    console.log("");
  });

  console.log(`Total unique combinations: ${seenPairs.size}`);
  console.log(`Total records: ${familiesUsers.length}`);
  console.log(`Duplicate records: ${duplicates.length}`);
}

// Show all entries grouped by family_id for better analysis
console.log("\n=== All entries grouped by family_id ===\n");

const groupedByFamily = {};
familiesUsers.forEach((entry, index) => {
  if (!groupedByFamily[entry.family_id]) {
    groupedByFamily[entry.family_id] = [];
  }
  groupedByFamily[entry.family_id].push({ ...entry, index });
});

Object.keys(groupedByFamily).forEach((familyId) => {
  console.log(`Family ID ${familyId}:`);
  groupedByFamily[familyId].forEach((entry) => {
    console.log(`  - ${entry.username} (index ${entry.index})`);
  });
  console.log("");
});
