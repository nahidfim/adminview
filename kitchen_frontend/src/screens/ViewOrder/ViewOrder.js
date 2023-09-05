
import React from 'react'
import SpanningTable from "../../components/TableHistory";
import { Box, InputLabel,FormControl,Select,MenuItem,Button} from '@mui/material';
import styles from "./ViewOrder.module.css";


const ViewOrder = ({setValue, setData, t}) => {
  const [tableData, setTableData] = React.useState([])
  const [orderState, setOrderState] = React.useState(0)
  const handleChange = (event) => {
    setOrderState(event.target.value);
  };

  const handleDeliveryConfirmationScreen = () => {
    setValue(1);
  };
  React.useEffect(() => {
    const fetchData = async () => {
    var ext = ""
    if(orderState==0){
      ext = 'else'
    }
    else{
      ext = 'all'
    }
    const response = await fetch('get_order_transactions/' + ext)
    const data = await response.json();
    setTableData(data);
  }
  
  fetchData();
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
    <MenuItem value={0}>{t('undelivered')}</MenuItem>
    <MenuItem value={1}>{t('total_order')}</MenuItem>
  </Select>
  </FormControl>
      </Box>
      
      <SpanningTable tableData={tableData} setValue={setValue} setData={setData} t={t} />
     
  
    <Button
      variant="large"
      className={styles.lightgreenButton}
      onClick={handleDeliveryConfirmationScreen}
    >
     {t('kitchen_option_2')}
    </Button>
  </Box>

     
  )
}

export default ViewOrder;