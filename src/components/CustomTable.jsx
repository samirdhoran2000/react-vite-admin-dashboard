/* eslint-disable react/prop-types */
import { DataGrid } from "@mui/x-data-grid";
// import PropTypes from "prop-types";
// import { useState } from "react";
// import { exportData } from "./data";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "date", headerName: "Order Date", width: 130 },
  { field: "exporter_name", headerName: "Exporter", width: 130 },
  { field: "consignee_name", headerName: "Consignee", width: 130 },
  {
    field: "hs_code",
    headerName: "HS Code",
    type: "number",
    width: 90,
  },
  {
    field: "product_description",
    headerName: "Description",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  {
    field: "unit_quantity",
    headerName: "Unit",
    type: "string",
    width: 90,
  },
  {
    field: "port",
    headerName: "Port",
    // type: "number",
    width: 90,
  },
  {
    field: "foreign_port",
    headerName: "Foreign Port",
    width: 90,
  },
  {
    field: "foreign_country",
    headerName: "Foreign Country",
    width: 90,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "number",
    width: 90,
  },
  {
    field: "unit_fob_inr",
    headerName: "Unit INR",
    type: "number",
    width: 90,
  },
  {
    field: "total_fob_inr",
    headerName: "Total INR",
    type: "number",
    width: 90,
  },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];
function CustomTable({ data: exportData }) {
  // const [exData, setExData] = useState([]);
  console.log("data in table compo : ", exportData);
  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={exportData?.exportData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
      />
    </div>
  );
}

// Define prop types with shape for exportData

// const dataShape = PropTypes.shape({
//   id: PropTypes.number,
//   date: PropTypes.string,
//   exporter_name: PropTypes.string,
//   consignee_name: PropTypes.string,
//   hs_code: PropTypes.string,
//   product_description: PropTypes.string,
//   unit_quantity: PropTypes.string,
//   port: PropTypes.string,
//   foreign_port: PropTypes.string,
//   foreign_country: PropTypes.string,
//   quantity: PropTypes.number,
//   unit_fob_inr: PropTypes.number,
//   total_fob_inr: PropTypes.number,
// });

// CustomTable.propTypes = {
//   data: PropTypes.shape({
//     exportData: PropTypes.arrayOf(dataShape),
//     country: PropTypes.string,
//   }),
//   // otherProp: PropTypes.string, // Define other props if necessary
// };

// CustomTable.defaultProps = {
//   exportData: {}, // Default value for exportData if necessary
// };

export default CustomTable;
