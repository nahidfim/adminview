import React from 'react'
import ProductSpanningTable from "../../components/ProductSpanningTable";
import { Box, InputLabel,FormControl,Select,MenuItem,Button, TextField} from '@mui/material';
import styles from "./ProductInfo.module.css";


const ProductInfo = ({setValue, setData}) => {
  const [tableData, setTableData] = React.useState([])
  const [orderState, setOrderState] = React.useState(0)
  const [newData, setNewData] = React.useState(0)
  const handleChange = (event) => {
    setOrderState(event.target.value);
  };
  const handleDeliveryConfirmationScreen = () => {
    setValue(3);
  };
  const handleProductForm = async (event) => {
    event.preventDefault();
    console.log("we here");
    const data = new FormData(event.currentTarget);
    var body = {
      product_id: data.get('product_id'),
      product_name: data.get('product_name'),
      product_price: data.get('product_price')
    }
    await fetch('/add_product', {method: 'POST',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)}).then(response =>
      response.text())
    .then(data1 => {
      console.log(newData);
      setNewData(newData+1);
    });
  };
  React.useEffect(() => {
    fetch('get_product_data').then((response) => { 
      return response.json(); 
    }).then((data) => {
      console.log(data);
      setTableData(data);
    });

  }, [orderState, newData]);
  return (
    <Box className={styles.outermostBox}>
    <Box className={styles.pulldown}>
    <Box fullWidth component="form" onSubmit={handleProductForm}>
    <TextField
              margin="normal"
              required
              fullWidth
              id="product_id"
              label="Product ID"
              name="product_id"
              autoComplete="product_id"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="product_name"
              label="Product Name"
              type="product_name"
              id="product_name"
              autoComplete
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="product_price"
              label="Product Price"
              type="product_price"
              id="product_price"
              autoComplete
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Product Data
            </Button>
  </Box>
    </Box>
    <ProductSpanningTable tableData={tableData} setValue={setValue} setData={setData} />
 </Box>
     
  )
}

export default ProductInfo;