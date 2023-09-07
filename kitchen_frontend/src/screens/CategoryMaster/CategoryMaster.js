import React from 'react'
// import CategoryTable from '../../components/CategoryTable';
import CategoryTable from '../../components/CategoryTable';
import { Box, InputLabel,FormControl,Select,MenuItem,Button, TextField,ButtonGroup} from '@mui/material';
import styles from "./CategoryMaster.module.css";
import UploadAndDisplayImage from '../../components/UploadAndDisplayImage';
import Grid from '@mui/material/Grid';

const CategoryMaster = ({setValue, setData, t}) => {
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
    form.append("product_category_no",  data.get('product_category_no'));
    form.append("product_category", data.get('product_category'));
    form.append("product_category_name_en", data.get('product_category_name_en'));
    await fetch('/add_category', {method: 'POST', body: form}).then(response =>
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
    fetch('/get_product_category').then((response) => {return response.json();})
    .then((data) => {
      console.log(data);
      setTableData(data)
      return data;
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
              id="product_category_no"
              label={t("product_category_no")}
              name="product_category_no"
              type="number"
              autoComplete="product_category_no"
              autoFocus
             
            
            />
         
            <TextField
              margin="normal"
              required
              fullWidth
              name="product_category"
              label={t('product_category')}
              type="product_category"
              id="product_category"
              autoComplete="product_category"
             
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="product_category_name_en"
              label={t("product_category_name_en")}
              type="product_category_name_en"
              id="product_category_name_en"
              autoComplete="product_category_name_en"
            />
            {/*<FormControl fullWidth>
               <InputLabel id="demo-simple-select-label">Product category</InputLabel>
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
            <UploadAndDisplayImage selectedImage={selectedImage} setSelectedImage={setSelectedImage}/> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t('add_category')}
            </Button>
  </Box>
    </Box>
    <CategoryTable tableData={tableData} setValue={setValue} setData={setData} t={t}/>
 </Box>
     
  )
}

export default CategoryMaster;