import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button} from '@mui/base';
import React, {useState} from "react"; 

const SpanningTable = () => {
    const [value, setValue] = useState(""); 
    const handleDeliveryConfirmationScreen = () => {
        setValue(3);
      }
   
  return (
    <TableContainer component={Paper}>   
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="right">No.</TableCell>
            <TableCell align="right">Order No.</TableCell>
            <TableCell align="right">Item Name</TableCell>
            <TableCell align="right">Lan No.</TableCell>
            <TableCell align="right">Order Time.</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Offer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
              <TableCell align="right"> 1</TableCell>
              <TableCell align="right"> O3454jjk43k53434541</TableCell>
              <TableCell align="right"> Item1</TableCell>
              <TableCell align="right"> 1</TableCell>
              <TableCell align="right"> 20230721 11:04</TableCell>
              <TableCell align="right">1</TableCell>
              <TableCell align="right">
              <Button onClick={handleDeliveryConfirmationScreen}>OK</Button>
              </TableCell>
              
        </TableBody>
      </Table>
     
    </TableContainer>
  )
}
export default SpanningTable;