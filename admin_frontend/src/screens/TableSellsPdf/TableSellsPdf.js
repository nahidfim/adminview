import React from "react";
import {
  Box,
  Container,
  Button,
  Typography
} from "@mui/material";
import styles from './TableSellsPdf.module.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TableSellsPdf = ({ setValue, t }) => {
  const [selectedFromDate, setSelectedFromDate] = React.useState('');
  const [selectedToDate, setSelectedToDate] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [code, setCode] = React.useState('')
  const [pdfUrls, setPdfUrls] = React.useState([]);


  const handleTableSellsPdf = () => {
    setValue();
  };
  const handleSearchPdf = async () => {
    try {
      const formattedFromDate = selectedFromDate.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      const formattedToDate = selectedToDate.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      const response = await fetch(`/search_pdf?from_date=${formattedFromDate}&to_date=${formattedToDate}`, {
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
  const handleFromDateChange = (date) => {
    setSelectedFromDate(date);
  };
  const handleToDateChange = (date) => {
    setSelectedToDate(date);
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
        <h1 variant="h5">{t('sells_date')} : {selectedFromDate ? selectedFromDate.toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }) : 'From Date'} ~ {selectedToDate ? selectedToDate.toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }) : 'To Date'}</h1>
      </Box>
      <Box className={styles.fourthbox}>
        <DatePicker
          selected={selectedFromDate}
          onChange={handleFromDateChange}
          dateFormat="yyyy/MM/dd"
          placeholderText="From Date"
          className={styles.customDatePicker}
        />
        <DatePicker
          selected={selectedToDate}
          onChange={handleToDateChange}
          dateFormat="yyyy/MM/dd"
          placeholderText="To Date"
          className={styles.customDatePicker}
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
              <a href={pdf.pdf_url} target="_blank" rel="noreferrer">Table sells pdf{pdf.transaction_time}</a>
            </li>
          ))}
        </ul>

      </Box>


      <Box className={styles.ButtonGroup}>

        {/* <Box className={styles.secondBox}>

          <Typography variant="h5"> {t('lan_no')} : 5</Typography>
          <Button
            variant="large"
            className={styles.lightgreenButton}
            onClick={handleTableSellsPdf}
          >
            {t('print')}
          </Button>
        </Box> */}

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
