import "dotenv/config";
import "object-hash";
import crypto from "crypto";
import slugify from "slugify";
import { doc } from "./sheet.js";
import { client as sanity } from "./sanity.js";

const headerToAttr = {
  "Customer Name": "customerName",
  URL: "url",
  Address: "address",
  Postcode: "postcode",
  City: "city",
  Country: "country",
  Municipality: "municipality",
  Region: "region",
  Bar: "bar",
  Restaurant: "restaurant",
  Butikk: "shop",
  Kafe: "cafe",
  "Hotell og Catering": "hotelCatering",
  "Scene/kulturhus/museum": "sceneCultureMuseum",
  Annet: "other",
  Online: "online",
  "ID Number": "idNumber",
  Distributor: "distributor",
  Hide: "hide",
};

// only one if these will be picked, lower index = higher prority
const categoryAttributes = [
  "online",
  "bar",
  "restaurant",
  "shop",
  "cafe",
  "hotelCatering",
  "sceneCultureMuseum",
  "other",
];

function sortByPriority(arr, priorityOrder) {
  const priorityMap = new Map(
    priorityOrder.map((item, index) => [item, index])
  );

  arr.sort((a, b) => {
    return priorityMap.get(a) - priorityMap.get(b);
  });

  return arr;
}

const sheetCategoryToSanityCategory = {
  bar: "restaurants-and-bars",
  restaurant: "restaurants-and-bars",
  shop: "shops",
  cafe: "cafes-and-bakeries",
  hotelCatering: "hotel",
  sceneCultureMuseum: "other",
  other: "other",
  online: "online",
};

categoryAttributes.forEach((category) => {
  if (!Object.keys(sheetCategoryToSanityCategory).includes(category)) {
    console.warn(
      "Spreadsheet category",
      category,
      "is missing a mapping to a Sanity shop category"
    );
  }
});

function isURLish(s) {
  return (
    typeof s === "string" &&
    (s.startsWith("http://") || s.startsWith("https://"))
  );
}

function objectWithoutRow(item) {
  const { row, ...rest } = item;
  return rest;
}

function rowsToObjects(rows) {
  let transformedRows = [];
  for (const row of rows) {
    const requiredFields = [
      "Customer Name",
      "Address",
      "Postcode",
      "City",
      "Country",
      "Municipality",
    ];
    const missingFields = requiredFields.filter((field) => {
      const value = row.get(field);
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim().length === 0)
      ) {
        return true;
      }
      return false;
    });
    if (missingFields.length) {
      console.log(
        "skipping row number",
        row._rowNumber,
        "with missing fields",
        JSON.stringify(missingFields)
      );
      continue;
    }
    const transformedRow = { row: row._rowNumber };
    let categories = [];
    for (const header in headerToAttr) {
      const attribute = headerToAttr[header];
      const value = row.get(header);
      const cleanValue = typeof value === "string" ? value.trim() : value;
      if (categoryAttributes.includes(attribute)) {
        // should only contain 'X', but let's strip whitespace to be safe
        if (typeof cleanValue === "string" && cleanValue.length === 1) {
          categories.push(attribute);
        }
        continue;
      }
      if (attribute === "url") {
        transformedRow[attribute] = isURLish(cleanValue) ? cleanValue : null;
        continue;
      }
      transformedRow[attribute] = cleanValue;
    }
    if (categories.length === 1 && categories[0] === "online") {
      console.log(
        "skipping online only store",
        row.get("Customer Name"),
        "on row",
        row._rowNumber
      );
      continue;
    }
    transformedRow["categories"] = categories;
    transformedRow["rawData"] = JSON.stringify(
      objectWithoutRow(transformedRow)
    );
    transformedRow["_sanityDocId"] = makeLocationDocId(
      transformedRow.customerName
    );
    transformedRows.push(transformedRow);
  }
  return transformedRows;
}

async function getRows() {
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["Customers"];
  await sheet.loadHeaderRow(2);
  const rows = await sheet.getRows();
  return rowsToObjects(rows);
}

function makeLocaleString({ no, en }) {
  return {
    no: no ?? en,
    en: en ?? no,
    _type: "localeString",
  };
}

function makeLocaleSimpleBody({ no, en }) {
  return {
    no: no ?? en,
    en: en ?? no,
    _type: "localeSimpleBody",
  };
}

function makeTextSpan({ text, marks }) {
  return {
    text: text,
    _key: crypto.randomBytes(8).toString("hex"),
    _type: "span",
    marks: marks ?? [],
  };
}

function makeLinkElement(url) {
  const markKey = crypto.randomBytes(8).toString("hex");
  return {
    markDefs: [
      {
        _type: "link",
        href: url,
        _key: markKey,
      },
    ],
    children: [
      makeTextSpan({
        text: url,
        marks: [markKey],
      }),
    ],
  };
}

function makeTextElement(text) {
  return {
    markDefs: [],
    children: [makeTextSpan({ text: text, marks: [] })],
  };
}

function makeBlock({ children, markDefs }) {
  return {
    style: "normal",
    _key: crypto.randomBytes(8).toString("hex"),
    markDefs: markDefs ?? [],
    children: children,
    _type: "block",
  };
}

export async function getSanityData() {
  console.log("fetching fresh sanity data");
  const posts = await sanity.fetch(`
  {
    'locations': *[_type == "location"],
    'categories': *[_type == "shopsCategory"],
    'cities': *[_type == "shopsCity"],
    'countries': *[_type == "shopsCountry"],
  }
  `);
  return posts;
}

async function createOrReplaceSanityDocument(doc) {
  sanity
    .createOrReplace(doc)
    .then((res) => {
      console.log("created or updated", res._id);
    })
    .catch((err) => {
      console.error(`create or update failed for ${doc._id}:`, err.message);
    });
}

async function deleteSanityDocument(id) {
  sanity
    .delete(id)
    .then((res) => {
      console.log("deleted", id);
    })
    .catch((err) => {
      console.error(`delete failed for ${id}:`, err.message);
    });
}

function capitalizeName(str) {
  const words = str.toLowerCase().split(" ");

  const capitalizedWords = words.map((word) => {
    if (word !== "i" && word !== "og") {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return word;
    }
  });

  return capitalizedWords.join(" ");
}

async function getOrCreateCountry(allCountries, countryName) {
  const existingCountry = allCountries.find(
    (x) => (x.name.en ?? x.name.no).toLowerCase() === countryName.toLowerCase()
  );
  if (existingCountry) {
    return existingCountry;
  }
  console.log("creating new country", countryName);
  const docId = makeCountryDocID(countryName);
  const countryDoc = {
    _id: docId,
    _type: "shopsCountry",
    name: makeLocaleString({
      en: countryName,
    }),
    slug: { current: docId },
  };
  return await sanity.createIfNotExists(countryDoc);
}

function makeCountryDocID(country) {
  return "shops-country-" + slugify(country, { lower: true, strict: true });
}

function makeCityDocId(country, city) {
  return (
    "shops-city-" + slugify(`${country} ${city}`, { lower: true, strict: true })
  );
}

async function getOrCreateCity(allCities, allCountries, cityName, countryName) {
  const existingCountry = await getOrCreateCountry(allCountries, countryName);
  if (existingCountry._type !== "shopsCountry") {
    throw new Error("failed fetching or creating country", countryName);
  }
  const existingCity = allCities.find(
    (x) =>
      (x.name.en ?? x.name.no).toLowerCase() === cityName.toLowerCase() &&
      x.country._ref === existingCountry._id
  );
  if (existingCity) {
    return existingCity;
  }
  // const casedCityName = capitalizeName(cityName);
  console.log("creating new city", cityName);
  const docId = makeCityDocId(existingCountry.name.en, cityName);
  const cityDoc = {
    _id: docId,
    _type: "shopsCity",
    name: makeLocaleString({
      no: cityName,
    }),
    country: {
      _ref: existingCountry._id,
      _type: "reference",
    },
  };
  return await sanity.createIfNotExists(cityDoc);
}

async function findCity(allCities, allCountries, cityName, countryName) {
  const country = await getOrCreateCountry(allCountries, countryName);
  return allCities.find(
    (x) =>
      (x.name.no ?? x.name.en).toLowerCase() === cityName.toLowerCase() &&
      x.country._ref === country._id
  );
}

async function findCountry(allCountries, countryName) {
  return allCountries.find(
    (x) => (x.name.en ?? x.name.no).toLowerCase() === countryName.toLowerCase()
  );
}

async function syncCountries(allCountries, allLocations) {
  let newCountries = [];
  for (const location of allLocations) {
    const found = await findCountry(allCountries, location.country);
    if (!found) {
      newCountries.push(location.country);
    }
  }
  if (newCountries.length === 0) {
    return { existing: allCountries.length, new: newCountries.length };
  }
  for (const countryName of newCountries) {
    // const casedCountryName = capitalizeName(countryName);
    const newCountry = await getOrCreateCountry(allCountries, countryName);
    console.log("created country", countryName);
  }
  return { existing: allCountries.length, new: newCountries.length };
}

async function syncCities(allCities, allCountries, allLocations) {
  let newCities = [];
  let created = [];
  for (const location of allLocations) {
    const found = await findCity(
      allCities,
      allCountries,
      location.municipality,
      location.country
    );
    if (!found) {
      newCities.push([location.municipality, location.country]);
    }
  }
  if (newCities.length === 0) {
    return { existing: allCities.length, new: created.length };
  }
  for (const city of newCities) {
    const [newCityName, newCityCountryName] = city;
    const expectedDocId = makeCityDocId(newCityCountryName, newCityName);
    if (created.map((x) => x._id).includes(expectedDocId)) {
      console.log("already created", expectedDocId, " - skipping");
      continue;
    }
    const newCity = await getOrCreateCity(
      allCities,
      allCountries,
      newCityName,
      newCityCountryName
    );
    created.push(newCity);
    console.log("created city", newCity);
  }
  return { existing: allCities.length, new: created.length };
}

function makeAddress(item, english) {
  const { address, postcode, city, country } = item;
  const maybeCountry = english
    ? `, ${country}`
    : country === "Norway"
    ? ""
    : `, ${country}`;
  return `${address}, ${postcode} ${city}${maybeCountry}`;
}

function nameToIdentifier(name) {
  return Buffer.from(name).toString("base64").replace(/=/g, "");
}

function makeLocationDocId(name) {
  const identifier = nameToIdentifier(name);
  return `shops-location-${identifier}`;
}

async function toSanityLocation(allCities, allCountries, allCategories, item) {
  const docId = makeLocationDocId(item.customerName);

  let noBlocks = [];
  let enBlocks = [];

  // let linkSpan = {};
  // if (typeof item.url === "string") {
  //   linkSpan = makeLinkElement(item.url);
  //   const block = makeBlock(linkSpan);
  //   noBlocks.push(block);
  //   enBlocks.push(block);
  // }

  const noAddress = makeAddress(item, false);
  noBlocks.push(makeBlock(makeTextElement(noAddress)));

  const enAddress = makeAddress(item, true);
  enBlocks.push(makeBlock(makeTextElement(enAddress)));

  const text = makeLocaleSimpleBody({
    no: noBlocks,
    en: enBlocks,
  });

  const cityDocument = await findCity(
    allCities,
    allCountries,
    item.municipality,
    item.country
  );
  const cityReference = {
    _ref: cityDocument._id,
    _type: "reference",
  };

  const categories = sortByPriority(item.categories, categoryAttributes);
  const pickedCategory = categories.length ? categories[0] : "other";
  const sanityCategory = sheetCategoryToSanityCategory[pickedCategory];
  if (!sanityCategory) {
    throw new Error("missing map from sheet category", pickedCategory);
  }
  const categoryDocument = allCategories.find(
    (x) => x.slug?.current === sanityCategory
  );
  if (!categoryDocument) {
    throw new Error("missing category document with slug", sanityCategoryy);
  }
  const categoryReference = {
    _ref: categoryDocument._id,
    _type: "reference",
  };

  let doc = {
    _id: docId,
    _type: "location",
    name: item.customerName,
    category: categoryReference,
    city: cityReference,
    text: text,
    url: item.url,
    rawData: item.rawData,
  };
  return doc;
}

async function syncLocations(sanityData, sheetData, updateAll) {
  const { locations: sanityLocations } = sanityData;
  const sanityState = new Map(sanityLocations.map((x) => [x._id, x.rawData]));
  const sheetState = new Map(sheetData.map((x) => [x._sanityDocId, x.rawData]));
  const deleted = [...sanityState.keys()].filter((x) => !sheetState.has(x));
  const changed = [...sanityState.keys()].filter(
    (x) => !deleted.includes(x) && sanityState.get(x) !== sheetState.get(x)
  );
  const somethingNew = [...sheetState.keys()].filter(
    (x) => !sanityState.has(x)
  );
  const forced = !updateAll
    ? []
    : [...sheetState.keys()].filter(
        (x) =>
          !deleted.includes(x) &&
          !changed.includes(x) &&
          !somethingNew.includes(x)
      );
  console.log(
    `sanityTotal=${sanityLocations.length} sheetTotal=${sheetData.length} new=${somethingNew} changed=${changed} deleted=${deleted}`
  );
  for (const deletedId of deleted) {
    const doc = sanityLocations.find((x) => x._id === deletedId);
    console.log("deleting", doc);
    if (doc._type != "location") {
      throw new Error("wanted to delete a non-location document");
    }
    deleteSanityDocument(doc._id);
  }
  for (const locationId of [...somethingNew, ...changed, ...forced]) {
    const location = sheetData.find((x) => x._sanityDocId === locationId);
    const doc = await toSanityLocation(
      sanityData.cities,
      sanityData.countries,
      sanityData.categories,
      location
    );
    console.log("creating or updating", doc);
    if (doc._type != "location") {
      throw new Error("wanted to change a non-location document");
    }
    createOrReplaceSanityDocument(doc);
  }
}

function isHidden(item) {
  const hide = item.hide;
  if (hide === undefined || hide === null) {
    return false;
  }
  if (typeof hide === "string" && hide.trim().length !== 0) {
    return true;
  }
  return false;
}

async function getSheetData() {
  const rows = await getRows();
  const visible = rows.filter((x) => !isHidden(x));
  return visible;
}

const testPol = {
  row: 303,
  customerName: "Vinmonopolet AS - Askvoll",
  url: "https://vinmonopolet.no",
  address: "Kystgården",
  postcode: "6980",
  city: "Askvoll",
  country: "Norway",
  municipality: "ASKVOLL",
  region: "Vestland",
  idNumber: "18550",
  distributor: "Vinmonopolet",
  hide: undefined,
  categories: ["shop"],
  rawData:
    '{"customerName":"Vinmonopolet AS - Askvoll","url":"https://vinmonopolet.no","address":"Kystgården","postcode":"6980","city":"Askvoll","country":"Norway","municipality":"ASKVOLL","region":"Vestland","idNumber":"18550","distributor":"Vinmonopolet","categories":["store"]}',
};

const testRows = [testPol];

let sanityData = await getSanityData();
const sheetData = await getSheetData();

const syncedCountries = await syncCountries(sanityData.countries, sheetData);
console.log("syncedCountries", syncedCountries);

if (syncedCountries.new !== 0) {
  sanityData = await getSanityData();
}

const syncedCities = await syncCities(
  sanityData.cities,
  sanityData.countries,
  sheetData
);
console.log("syncedCities", syncedCities);

if (syncedCities.new !== 0) {
  sanityData = await getSanityData();
}

// const someRows = sheetData.slice(0, 5);

// console.dir(someRows, { depth: null });

// await syncLocations(sanityData, testRows);
await syncLocations(sanityData, sheetData);

// console.dir(makeLinkElement("https://example.com"), { depth: null });

// const testDocument = await toSanityLocation(
//   sanityData.cities,
//   sanityData.countries,
//   sanityData.categories,
//   testRows[0]
// );
// console.dir(testDocument, {depth:null})
