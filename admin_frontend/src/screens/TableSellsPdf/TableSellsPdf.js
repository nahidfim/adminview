import React from "react";
import {
  Box,
  Container,
  Button,
  Typography
} from "@mui/material";
import styles from './TableSellsPdf.module.css';
const TableSellsPdf = ({ setValue, t }) => {
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [code, setCode] = React.useState('')
  const [pdfUrls, setPdfUrls] = React.useState([]);

  const handleTableSellsPdf = () => {
    setValue();
  };
  const handleSearchPdf = async () => {
    try {
      const response = await fetch('/search_pdf?search_param=' + selectedDate, {
        method: 'GET',
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data)
      setPdfUrls(data.pdf_url_list);
    } catch (error) {
      console.error('Error fetching PDF URLs:', error);
    }
  };
  const handledone = () => {
    setValue(10);
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
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
        <h1 variant="h5"> {t('sells_date')} : {"2023/12/19"} ~ {"2023/12/19"}</h1>
      </Box>
      <Box className={styles.fourthbox}>
        <input
          className={styles.input} 
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <Button
          className={styles.searchButton}
          variant="contained"
          color="primary"
          onClick={handleSearchPdf}
        >
          {t('search')}
        </Button>
        <ul>
        {pdfUrls.map((pdf, index) => (
          <li key={index} className={styles.dataListing}>
            <a href={pdf.pdf_url} target="_blank" rel="noreferrer">Order Transaction {pdf.transaction_time}</a>
          </li>
        ))}
      </ul>

      </Box>


      <Box className={styles.ButtonGroup}>

        <Box className={styles.secondBox}>

          {/* <Typography variant="h5"> {t('lan_no')} : 5</Typography> */}
          <Button
            variant="large"
            className={styles.lightgreenButton}
            onClick={handleTableSellsPdf}
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

export default TableSellsPdf;
