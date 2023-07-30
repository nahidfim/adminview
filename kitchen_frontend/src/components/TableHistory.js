import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button} from '@mui/base';
import React, {useState} from "react"; 

const SpanningTable = ({tableData, setValue, setData}) => {
    const handleDeliveryConfirmationScreen = (item) => {
      console.log(item);
        setData(item);
        setValue(3);
      }
      const handleCancelOrder = (item) => {
        fetch("/cancel_order/" + item.order_no).then((response) => {return response.json()}).then((data) => {return data});
      }

   
  return (
    <TableContainer component={Paper}>   
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="right">No.</TableCell>
            <TableCell align="right">Order No.</TableCell>
            <TableCell align="right">Product Code</TableCell>
            <TableCell align="right">Lan No.</TableCell>
            <TableCell align="right">Tablet No.</TableCell>
            <TableCell align="right">Order Time.</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Offer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((item)=>
            <TableRow>
            <TableCell align="right"> 1</TableCell>
            <TableCell align="right"> {item.order_no}</TableCell>
            <TableCell align="right"> {item.product_code}</TableCell>
            <TableCell align="right"> {item.lane_no}</TableCell>
            <TableCell align="right"> {item.table_no}</TableCell>
            <TableCell align="right"> {item.order_time}</TableCell>
            <TableCell align="right">{item.order_amount}</TableCell>
            <TableCell align="right">
            <Button onClick={()=>handleDeliveryConfirmationScreen(item)}>OK</Button>
            </TableCell>
            <TableCell align="right">
            <Button onClick={()=>handleCancelOrder(item)}>Cancel</Button>
            </TableCell>        
            </TableRow> 
          )}
            
        </TableBody>
      </Table>      
    </TableContainer>
  )
}
export default SpanningTable;