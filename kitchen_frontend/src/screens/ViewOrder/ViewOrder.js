
import React from 'react'
import SpanningTable from "../../components/TableHistory";
import { Box, InputLabel,FormControl,Select,MenuItem,Button} from '@mui/material';
import styles from "./ViewOrder.module.css";


const ViewOrder = ({setValue, sum, setSum}) => {
  const [tableData, setTableData] = React.useState([])
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleDeliveryConfirmationScreen = () => {
    setValue(3);
  };
  return (
    <Box className={styles.outermostBox}>
    <Box className={styles.pulldown}>
    <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Undeliverd Order</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Undeliverd Order"
    onChange={handleChange}
  >
    <MenuItem value={0}>Undeliverd Order</MenuItem>
    <MenuItem value={1}>Total Order</MenuItem>
  </Select>
  </FormControl>
    </Box>
    <SpanningTable tableData={tableData}/>
 </Box>
     
  )
}

export default ViewOrder;