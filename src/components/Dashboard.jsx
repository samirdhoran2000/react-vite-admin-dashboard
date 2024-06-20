import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import ComplexStatisticsCard from "./ComplexStatisticsCard";
import CustomTable from "./CustomTable";
import SelectComponent from "./SelectComponent";
// import CustomComplexStaticCard from "./CustomComplexStaticCard";

const Dashboard = () => {
  //  console.log("environment variables are ", `${process.env.REACT_APP_API_URL}`);
  const [selectData, setSelectData] = useState({
    exportData: [],
    country: "All",
    averageQuantity: 0,
    averagePrice: 0,
    consigneeCount: 0,
  });

  const handleDataFromSelect = (data) => {
    setSelectData(data);
    console.log("Data received in parent: ", data);
  };

  const { exportData, country, averageQuantity, averagePrice, consigneeCount } =
    selectData;

  return (
    <>
    {/* <DashboardLayout> */}
      {/* <DashboardNavbar /> */}
      <SelectComponent sendData={handleDataFromSelect} />

      <Box py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Box mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="weekend"
                title="Consignees"
                count={consigneeCount.toFixed(0)}
                percentage={{
                  color: "success",
                  amount: "",
                  label: `From ${country || "All"}`,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="leaderboard"
                title="Average Quantity"
                count={averageQuantity.toFixed(0)}
                percentage={{
                  color: "success",
                  amount: "",
                  label: `From ${country || "All"}`,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="store"
                title="Average Price"
                count={averagePrice.toFixed(2)}
                percentage={{
                  color: "success",
                  amount: "",
                  label: `From ${country || "All"}`,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Country Records"
                count={exportData.length}
                percentage={{
                  color: "success",
                  amount: "",
                  label: `From ${country || "All"}`,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Grid item xs={12}>
        <CustomTable data={selectData} />
      </Grid>
      {/* <Footer /> */}
    {/* </DashboardLayout> */}
{/* <CustomComplexStaticCard/> */}
    </>
  
  )
};

export default Dashboard;
