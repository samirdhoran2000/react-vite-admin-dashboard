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
  const [averageData, setAverageData] = useState([]);
  const [exportData, setExportData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchData = async () => {
    try {
      const [averageRes, exportRes] = await Promise.all([
        // fetch(`${process.env.REACT_APP_API_URL}/getAverageData`),
        // fetch(`${process.env.REACT_APP_API_URL}/getExportData`),
        fetch(`http://localhost:3000/api/getAverageData`),
        fetch(`http://localhost:3000/api/getExportData`),
      ]);

      const averageData = await averageRes.json();
      const exportData = await exportRes.json();

      setAverageData(averageData?.result?.rows || []);
      setExportData(exportData?.result?.rows || []);
      setLoading(false); // Set loading to false when data is fetched

      // Send all data initially to the parent
      sendFilteredData(
        "All",
        averageData?.result?.rows || [],
        exportData?.result?.rows || []
      );
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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

  const handleChange = (event) => {
    const value = event.target.value;
    setCountry(value);
    sendFilteredData(value, averageData, exportData);
  };

  const countryOptions = [
    "All",
    ...new Set(exportData.map((item) => item.foreign_country)),
  ];

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
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
            onChange={handleChange}
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
          {loading && <Spinner />}
        </FormControl>
      </Box>
    </div>
  );
};

// SelectComponent.propTypes = {
//   sendData: PropTypes.func.isRequired,
// };

export default SelectComponent;
