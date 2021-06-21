import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import axios from "axios";

import { FaCheckCircle, FaDotCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import {useUIDispatch} from '../../context/ui'
import useSWR from "swr";
export default function BookingsHistory() {
  const router = useRouter();
  const { data } = useSWR("/booking/my_bookings");
  const uiDispatch =  useUIDispatch()

  const deleteOrder = async (bookingId) => {
    try {
      const res = await axios.delete(`/booking/${bookingId}`);
      uiDispatch("SNACKBAR", {
        open: true,
        msg: res.data.message,
        type: res.data.type,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Booking ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Payment Status</TableCell>

            <TableCell>Address</TableCell>

            <TableCell>Booking Date</TableCell>
            <TableCell>Booking Time</TableCell>

            <TableCell>Task Length (in Hour)</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>City</TableCell>

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
                <TableCell>{row.currency}</TableCell>
                <TableCell>{row.paymentMode}</TableCell>
                <TableCell>
                  {row.isPaymentDone ? (
                    <FaCheckCircle fontSize="20px" color="green" />
                  ) : (
                    <FaDotCircle fontSize="20px" color="red" />
                  )}
                </TableCell>
                <TableCell>{row.address}</TableCell>

                <TableCell>{row.date}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.taskLength}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.service.name}</TableCell>
                <TableCell>{row.service.category.name}</TableCell>
                <TableCell>
                  <Button onClick={()=>router.push(`/booking/${row._id}/edit`)}>Edit</Button>
                </TableCell>
                <TableCell>
                  <Button color="secondary" onClick={()=>deleteOrder(row._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
