import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Spinner from "./Spinner";

// eslint-disable-next-line react/prop-types
const SelectComponent = ({ sendData }) => {
  const [country, setCountry] = useState("All");
  const [product, setProduct] = useState("leather");
  const [averageData, setAverageData] = useState([]);
  const [exportData, setExportData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (product = "leather") => {
    setLoading(true);
    try {
      const [averageRes, exportRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_BASE_URL}/getAverageData?product=${product}`),
        fetch(`${import.meta.env.VITE_BASE_URL}/getExportData?product=${product}`),
      ]);

      const averageData = await averageRes.json();
      const exportData = await exportRes.json();

      setAverageData(averageData?.result?.rows || []);
      setExportData(exportData?.result?.rows || []);

      sendFilteredData("All", averageData?.result?.rows || [], exportData?.result?.rows || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendFilteredData = (countryVal, averageData, exportData) => {
    const filteredExportData = exportData.filter(
      (item) => countryVal === "All" || item.foreign_country === countryVal
    );

    const avgData = averageData.find(
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

  const handleChange = (e) => {
    const { value, name } = e.target;

    if (name === "country") {
      setCountry(value);
      sendFilteredData(value, averageData, exportData);
    } else if (name === "product") {
      setProduct(value);
      fetchData(value);
    }
  };

  const countryOptions = ["All", ...new Set(exportData.map((item) => item.foreign_country))];
  const productOptions = ["leather", "cotton"];

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
      <Box height={50} width={200} sx={{ minWidth: 120, minHeight: 70, margin: "0 5px" }}>
        <FormControl fullWidth sx={{ minHeight: 100 }}>
          <InputLabel id="country-select-label" sx={{ minWidth: 120, minHeight: 120 }}>
            Country
          </InputLabel>
          <Select
            labelId="country-select-label"
            id="country-select"
            value={country}
            label="Country"
            onChange={handleChange}
            name="country"
            sx={{ minHeight: 50, textTransform: "capitalize" }}
          >
            {countryOptions.map((item) => (
              <MenuItem key={item} value={item} sx={{ textTransform: "capitalize" }}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box height={50} width={200} sx={{ minWidth: 120, minHeight: 70, margin: "0 5px" }}>
        <FormControl fullWidth sx={{ minHeight: 100 }}>
          <InputLabel id="product-select-label" sx={{ minWidth: 120, minHeight: 120 }}>
            Product
          </InputLabel>
          <Select
            labelId="product-select-label"
            id="product-select"
            value={product}
            label="Product"
            onChange={handleChange}
            name="product"
            sx={{ minHeight: 50, textTransform: "capitalize" }}
          >
            {productOptions.map((item) => (
              <MenuItem key={item} value={item} sx={{ textTransform: "capitalize" }}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {loading && <Spinner />}
    </div>
  );
};

export default SelectComponent;
