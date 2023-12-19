import React from "react";
import {
  Box,
  Container,
  Button,
  Typography,
} from "@mui/material";
import styles from "./ProductSellsPdf.module.css";

const ProductSellsPdf = ({ setValue, t}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [code, setCode] = React.useState('')

  const handleProductSellsPdf = () => {
    setValue(2);
  };
  const handledone = () => {
    setValue(10);
  };

  React.useEffect(() => {
    fetch('/get_admin').then((response) => {
      return response.text();
    }).then((response) => {
      console.log(response);
      setCode(response);
      return response
    });
  }, [])
  return (
    <Container className={styles.outermostContainer}>
    <Box className={styles.admincode}>
          <h1 variant="h5"> {t('admin_code')} : {code}</h1>
    </Box>
    <Box className={styles.admindate}>
          <h1 variant="h5"> {t('sells_date')} :  {"2023/12/19"} ~ {"2023/12/19"}</h1>
    </Box>
      <Box className={styles.ButtonGroup}>
     
        <Box className={styles.secondBox}>
      
      {/* <Typography variant="h5"> {t('lan_no')} : 5</Typography> */}
          <Button
            variant="large"
            className={styles.lightgreenButton}
            onClick={handleProductSellsPdf}
          >
            {t('print')}
          </Button>         
        </Box>

        <Box className={styles.thirdbox}>
        <Button
            variant="large"
            className={styles.lightgreenButton}
            onClick={handledone}
          >
            {t('done')}
          </Button>
        </Box>
        </Box>
      
    </Container>
  );
};

export default ProductSellsPdf;
