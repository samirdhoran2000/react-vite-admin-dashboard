/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "order_date", headerName: "Order Date", width: 130 },
  { field: "exporter_name", headerName: "Exporter Name", width: 130 },
  { field: "consignee_name", headerName: "Consignee Name", width: 130 },
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
    field: "ports",
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
    field: "unit_inr_ammount",
    headerName: "Unit INR",
    type: "number",
    width: 90,
  },
  {
    field: "total_inr_ammount",
    headerName: "Total INR",
    type: "number",
    width: 90,
  },
  {
    field: "product_type",
    headerName: "Product Type",
    type: "string",
    width: 110,
  },
];



const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: "Change density" } }}
      />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarExport
        slotProps={{
          tooltip: { title: "Export data" },
          button: { variant: "outlined" },
        }}
      />
    </GridToolbarContainer>
  );
};

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
        slots={{
          toolbar: CustomToolbar,
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
      />
    </div>
  );
}
export default CustomTable;
