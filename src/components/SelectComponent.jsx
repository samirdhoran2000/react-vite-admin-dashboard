/* eslint-disable react/prop-types */
// import * as React from "react";
import { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Spinner from "./Spinner";

const SelectComponent = ({ sendData }) => {
  const [country, setCountry] = useState("All");
  const [product, setProduct] = useState("All");
  const [averageData, setAverageData] = useState([]);
  const [exportData, setExportData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchData = async ({ product = "" }) => {
    try {
      const [averageRes, exportRes] = await Promise.all([
        // fetch(`${process.env.REACT_APP_API_URL}/getAverageData`),
        // fetch(`${process.env.REACT_APP_API_URL}/getExportData`),
        fetch(
          `${import.meta.env.VITE_BASE_URL}/getAverageData?product=${product}`
        ),
        fetch(`${import.meta.env.VITE_BASE_URL}/getExportData`),
      ]);

      console.log(import.meta.env.VITE_BASE_URL);
      const averageData = await averageRes.json();
      const exportData = await exportRes.json();

      setAverageData(averageData?.result?.rows || []);
      setExportData(exportData?.result?.rows || []);

      // Send all data initially to the parent
      sendFilteredData(
        "All",
        averageData?.result?.rows || [],
        exportData?.result?.rows || []
      );
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData({ products: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendFilteredData = (countryVal, averageData, exportData) => {
    const filteredExportData = exportData.filter(
      (item) => countryVal === "All" || item.foreign_country === countryVal
    );
    const avgData =
      averageData.find(
        (item) => countryVal === "All" || item.foreign_country === countryVal
      ) || {};

    const {
      average_price: averagePrice,
      average_quantity: averageQuantity,
      consignee_count: consigneeCount,
    } = avgData;

    sendData({
      exportData: filteredExportData,
      country: countryVal,
      averagePrice: averagePrice || 0,
      averageQuantity: averageQuantity || 0,
      consigneeCount: consigneeCount || 0,
    });
  };

  const handleChange = ({ value, name }) => {
    // const value = event.target.value;
    // console.log(event.target);
    if (name === "country") {
      setCountry(value);
    } else if (name === "product") {
      setProduct(value);
      fetchData({ product: value });
    }
    console.log({ country, product });
    console.log(value, name);
    // sendFilteredData(value, averageData, exportData);
    // setCountry(value);
    // setProduct(value);
    sendFilteredData(value, averageData, exportData);
  };

  const countryOptions = [
    "All",
    ...new Set(exportData.map((item) => item.foreign_country)),
  ];

  // const productOptions = ["All", "Leather Wallet", "Leather Bag", "Cotton"];
  return (
    <div
      style={{ display: "flex", alignItems: "center", justifyContent: "start" }}
    >
      <Box
        height={50}
        width={200}
        sx={{ minWidth: 120, minHeight: 70, margin: "0 5px" }}
      >
        <FormControl fullWidth sx={{ minHeight: 100 }}>
          <InputLabel
            id="country-select-label"
            sx={{ minWidth: 120, minHeight: 120 }}
          >
            Country
          </InputLabel>
          <Select
            labelId="country-select-label"
            id="country-select"
            value={country}
            label="Country"
            onChange={(e) => {
              handleChange(e.target);
            }}
            name="country"
            sx={{ minHeight: 50, textTransform: "capitalize" }}
          >
            {countryOptions.map((item) => (
              <MenuItem
                key={item}
                value={item}
                sx={{ textTransform: "capitalize" }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* This is product select section */}
      {/* <Box
        height={50}
        width={200}
        sx={{ minWidth: 120, minHeight: 70, margin: "0 5px" }}
      >
        <FormControl fullWidth sx={{ minHeight: 100 }}>
          <InputLabel
            id="product-select-label"
            sx={{ minWidth: 120, minHeight: 120 }}
          >
            Product
          </InputLabel>
          <Select
            labelId="product-select-label"
            id="product-select"
            value={product}
            label="Product"
            onChange={(e) => {
              handleChange(e.target);
            }}
            name="product"
            sx={{ minHeight: 50, textTransform: "capitalize" }}
          >
            {productOptions.map((item) => (
              <MenuItem
                key={item}
                value={item}
                sx={{ textTransform: "capitalize" }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
          </Box> */}
          {loading && <Spinner />}
    </div>
  );
};

// SelectComponent.propTypes = {
//   sendData: PropTypes.func.isRequired,
// };

export default SelectComponent;
