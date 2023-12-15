import React from 'react'
import ProductSpanningTable from "../../components/ProductSpanningTable";
import { Box, InputLabel,FormControl,Select,MenuItem,Button, TextField,ButtonGroup} from '@mui/material';
import styles from "./ProductInfo.module.css";
import UploadAndDisplayImage from '../../components/UploadAndDisplayImage';


const ProductInfo = ({setValue, setData, t}) => {
  const [tableData, setTableData] = React.useState([])
  const [orderState, setOrderState] = React.useState(0)
  const [newData, setNewData] = React.useState(0)
  const [productCategory, setProductCategory] = React.useState(0)
  const [category, setCategory] = React.useState([])
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [page, setPage] = React.useState(1)
  const handleChange = (event) => {
    setOrderState(event.target.value);
  };

  const handleDeliveryConfirmationScreen = () => {
    setValue(3);
  };

  const handleProductForm = async (event) => {
    event.preventDefault();
    console.log(selectedImage);
    const data = new FormData(event.currentTarget);
  

    const form = new FormData();
    form.append("product_id",  data.get('product_id'));
    form.append("product_name", data.get('product_name'));
    form.append("product_price", data.get('product_price'));
    form.append("product_category", productCategory);
    form.append("image", selectedImage);
    await fetch('/add_product', {method: 'POST',  body: form}).then(response =>
      response.text())
    .then(data1 => {
      console.log(newData);
      setNewData(newData+1);
    });
  };

  React.useEffect(() => {
    var ext = ""
    if(orderState==0){
      ext = 'else'
    }
    else{
      ext = 'all'
    }
    fetch('/get_category').then((response) => {return response.json();})
    .then((data) => {
      console.log(data);
      setCategory(data)
      return data;
    });
    fetch('get_product_data').then((response) => { 
      return response.json(); 
    }).then((data) => {
      console.log(data);
      setTableData(data);
    });

  }, [orderState, newData]);

  const handleCategoryChange = (e) => {
   console.log(e)
   setProductCategory(e.target.value)
    return 0
  }

  return (
    <Box className={styles.outermostBox}>
    <Box className={styles.pulldown}>
    <Box fullWidth component="form" onSubmit={handleProductForm}>
    <TextField
              margin="normal"
              required
              fullWidth
              id="product_id"
              label={t('product_id')}
              name="product_id"
              type="number"
              autoComplete="product_id"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="product_name"
              label={t('product_name')}
              type="product_name"
              id="product_name"
              autoComplete
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="product_price"
              label={t('product_price')}
              type="product_price"
              id="product_price"
              autoComplete
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">{t('product_category')}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productCategory}
                label="Age"
                onChange={handleCategoryChange}
              >{category.map((item)=> {
                return <MenuItem value={item[0]}>{item[0]}</MenuItem>
              })}
              </Select>
            </FormControl>
            <UploadAndDisplayImage selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t('add_product')}
            </Button>
  </Box>
    </Box>
    <ProductSpanningTable tableData={tableData} setValue={setValue} setData={setData} t={t}/>
 </Box>
     
  )
}

export default ProductInfo;