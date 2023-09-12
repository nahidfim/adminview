import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button} from '@mui/base';
import React, {useState} from "react"; 
const SpanningTable = ({tableData, setValue, setData, t}) => {
    const handleDeliveryConfirmationScreen = (item) => {
      console.log(item);
        setData(item);
        setValue(3);
      }
      // const handleCancelOrder = (item) => {
      //   fetch("/cancel_order/" + item.order_no).then((response) => {return response.json()}).then((data) => {return data});
      // }

   
  return (
    <TableContainer component={Paper}>   
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
          
            <TableCell align="left">{t('order_no')}.</TableCell>
            <TableCell align="left">{t('product_name_en')}.</TableCell>
            <TableCell align="right">{t('product_code')}</TableCell>
            <TableCell align="right">{t('lan_no')}</TableCell>
            <TableCell align="center">{t('tablet_no')}</TableCell>
            <TableCell align="center">{t('time')}</TableCell>
            {/* <TableCell align="right">{t('delivery_completion_time')}</TableCell> */}
            <TableCell align="right">{t('qty')}</TableCell>
            <TableCell align="right">{t('offer')}</TableCell>
        
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((item)=>
            <TableRow>
            
            <TableCell align="left"> {item.order_no}</TableCell>
            <TableCell align="left"> {item.product_name_en}</TableCell>
            <TableCell align="center"> {item.product_code}</TableCell>
            <TableCell align="right"> {item.lane_no}</TableCell>
            <TableCell align="center"> {item.table_no}</TableCell>
            <TableCell align="right">
          
                {item.provision_completion_flag==1? <Button >{item.delivery_completion_time}</Button>
                  : <Button onClick={() => handleDeliveryConfirmationScreen(item)}>{item.order_time}</Button>}
            </TableCell>
            
            <TableCell align="right">{item.order_amount}</TableCell>
            
            <TableCell align="right">
                {item.provision_completion_flag == 1 ? <Button >{t('completed') }</Button>
                  : <Button onClick={() => handleDeliveryConfirmationScreen(item)}>{t('incomplete')}</Button>}
            
            </TableCell>
            {/* <TableCell align="right">
            <Button onClick={()=>handleCancelOrder(item)}>Cancel</Button>
            </TableCell>         */}
            </TableRow> 
          )}
            
        </TableBody>
      </Table>      
    </TableContainer>
  )
}
export default SpanningTable;