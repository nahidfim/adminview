
import React from 'react'
import SpanningTable from "../../components/TableHistory";
import { Box, InputLabel,FormControl,Select,MenuItem,Button} from '@mui/material';
import styles from "./ViewOrder.module.css";


const ViewOrder = ({setValue, setData}) => {
  const [tableData, setTableData] = React.useState([])
  const [orderState, setOrderState] = React.useState(0)
  const handleChange = (event) => {
    setOrderState(event.target.value);
  };
  const handleDeliveryConfirmationScreen = () => {
    setValue(3);
  };
  React.useEffect(() => {
    var ext = ""
    if(orderState==0){
      ext = 'else'
    }
    else{
      ext = 'all'
    }
    fetch('get_order_transactions/' + ext).then((response) => { 
      return response.json(); 
    }).then((data) => {
      console.log(data);
      setTableData(data);
      return data
    });

  }, [orderState]);
  return (
    <Box className={styles.outermostBox}>
    <Box className={styles.pulldown}>
    <FormControl fullWidth>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={orderState}
    label="Undeliverd Order"
    onChange={handleChange}
  >
    <MenuItem value={0}>Undelivered Order</MenuItem>
    <MenuItem value={1}>Total Order</MenuItem>
  </Select>
  </FormControl>
    </Box>
    <SpanningTable tableData={tableData} setValue={setValue} setData={setData} />
 </Box>
     
  )
}

export default ViewOrder;