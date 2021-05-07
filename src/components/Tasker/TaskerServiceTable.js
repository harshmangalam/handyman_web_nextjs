import useSWR from "swr";
import {
  Avatar,
  CircularProgress,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { Fragment, useState } from "react";

export default function TaskerServiceTable() {
  const [paginateData, setPaginatedata] = useState({ page: 0, limit: 1 });
  const { data: services, error: serviceError } = useSWR(
    `/service/my_services?page=${paginateData.page}&limit=${paginateData.limit}`
  );

  if (serviceError) return <div>Error...</div>;

  const handleChangePage = (e) => {
    setPaginatedata({ ...paginateData, page: e.target.value });
  };

  const handleChangeRowsPerPage = (e) => {
    setPaginatedata({ page: 0, limit: e.target.value });
  };
  return (
    <Fragment>
      <TableContainer component={Paper}>
        {!services && <LinearProgress style={{ width: "100%" }} />}
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Service ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description&nbsp;(g)</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services &&
              services.data.services.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row._id}</TableCell>
                  <TableCell>
                    <Avatar src={row.image}  variant="rounded" />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.category.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {services && (
          <TablePagination
            rowsPerPageOptions={[1, 2, 3]}
            component="div"
            count={services.data.pagination.totalCount}
            rowsPerPage={paginateData.limit}
            page={paginateData.page}
            onChangePage={(e, newPage) =>
              setPaginatedata({ ...paginateData, page: newPage })
            }
            onChangeRowsPerPage={(e) =>
              setPaginatedata({ page: 0, limit: parseInt(e.target.value, 10) })
            }
          />
        )}
      </TableContainer>
    </Fragment>
  );
}
