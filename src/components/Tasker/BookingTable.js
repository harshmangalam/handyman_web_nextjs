import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "Service ID", width: 70 },
  { field: "image", headerName: "Service Image", width: 70 },
  { field: "name", headerName: "Service Name", width: 130 },
  { field: "category", headerName: "Category", width: 130 },
];

const rows = [
  { id: 1, image: "Snow", name: "Jon", category: 35 },
  { id: 2, image: "Lannister", name: "Cersei", category: 42 },
  { id: 3, image: "Lannister", name: "Jaime", category: 45 },
  { id: 4, image: "Stark", name: "Arya", category: 16 },
  { id: 5, image: "Targaryen", name: "Daenerys", category: null },
  { id: 6, image: "Melisandre", name: null, category: 150 },
  { id: 7, image: "Clifford", name: "Ferrara", category: 44 },
  { id: 8, image: "Frances", name: "Rossini", category: 36 },
  { id: 9, image: "Roxie", name: "Harvey", category: 65 },
];

export default function BookingTable() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
