import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button} from '@mui/base';
import React, {useState} from "react"; 

const ProductSpanningTable = ({tableData, setValue, setData, t}) => {
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
          
            <TableCell align="right">{t('product_id')}</TableCell>
            <TableCell align="right">{t('product_name')}</TableCell>
            <TableCell align="right">{t('product_price')}</TableCell>
            <TableCell align="right">{t('product_category')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((item)=>
            <TableRow>
            <TableCell align="right"> 1</TableCell>
            <TableCell align="right"> {item.product_id}</TableCell>
            <TableCell align="right"> {item.product_name_en}</TableCell>
            <TableCell align="right"> {item.product_price_en}</TableCell> 
            <TableCell align="right"> {item.category_name}</TableCell>     
            </TableRow> 
          )}
            
        </TableBody>
      </Table>      
    </TableContainer>
  )
}
export default ProductSpanningTable;