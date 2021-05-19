import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { FaCheckCircle } from "react-icons/fa";
import useSWR from "swr";
export default function BookingsHistory() {
  const { data } = useSWR("/booking/my_bookings");
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Booking ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Payment Status</TableCell>

            <TableCell>Address</TableCell>

            <TableCell>Booking Date</TableCell>
            <TableCell>Booking Time</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Service Name</TableCell>

            <TableCell>Category Name</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.data.bookings.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.totalPrice}</TableCell>
                <TableCell>{row.paymentMode}</TableCell>
                <TableCell>
                  {
                    <FaCheckCircle
                      fontSize="20px"
                      color={row.isPaymentDone ? "green" : "red"}
                    />
                  }
                </TableCell>
                <TableCell>{row.address}</TableCell>

                <TableCell>{row.date}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.service.name}</TableCell>
                <TableCell>{row.service.category.name}</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Remove</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
