import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button} from '@mui/base';
import React, {useState} from "react"; 

const CategoryTable = ({tableData, setValue, setData, t}) => {
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
            <TableCell align="right">{t('product_category_no')}</TableCell>
            <TableCell align="right">{t('product_category')}</TableCell>
            <TableCell align="right">{t('product_category_name_en')}</TableCell>
            <TableCell align="right">{t('product_category_name_jp')}</TableCell>
            <TableCell align="right">{t('product_category_name_ch')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((item)=>
            <TableRow>
            <TableCell align="right"> {item.product_category_no}</TableCell>
            <TableCell align="right"> {item.product_category}</TableCell>
            <TableCell align="right"> {item.product_category_name_en}</TableCell>   
            <TableCell align="right"> {item.product_category_name_jp}</TableCell> 
            <TableCell align="right"> {item.product_category_name_ch}</TableCell>    
            </TableRow> 
          )}
            
        </TableBody>
      </Table>      
    </TableContainer>
  )
}
export default CategoryTable;