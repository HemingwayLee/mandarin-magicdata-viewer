import Button from '@mui/material/Button';
import React from 'react';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination
} from '@mui/material';

export default function Dashboard() {
  const [personList, setPersonList] = React.useState([]);
  const [personCount, setPersonCount] = React.useState(0);
  const [controller, setController] = React.useState({
    page: 0,
    rowsPerPage: 10
  });

  React.useEffect(() => {
    getData();
  }, [controller]);

  const getData = async () => {
    const url = `/api/show/page/${controller.page}/size/${controller.rowsPerPage}/`
    try {
      const response = await fetch(url);
      if (response.statusText === 'OK') {
        const data = await response.json();
        console.log(data);
        setPersonList(data.data);
        setPersonCount(data.total);
      } else {
        throw new Error('Request failed')
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setController({
      ...controller,
      page: newPage
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    });
  };

  const doInsert = () => {
    fetch('/api/insert/', {
      method: 'GET',
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      getData();
      alert(myJson["result"]);
    });
  }
  
  return (
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            backgroundColor: '#AAAAAA',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Card>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            Id
                          </TableCell>
                          <TableCell>
                            First Name
                          </TableCell>
                          <TableCell>
                            Last Name
                          </TableCell>
                          <TableCell>
                            Age
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {personList.map((person) => (
                          <TableRow key={person.id}>
                            <TableCell>
                              {person.id}
                            </TableCell>
                            <TableCell>
                              {person.fname}
                            </TableCell>
                            <TableCell>
                              {person.lname}
                            </TableCell>
                            <TableCell>
                              {person.age}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <TablePagination
                      component="div"
                      onPageChange={handlePageChange}
                      page={controller.page}
                      count={personCount}
                      rowsPerPage={controller.rowsPerPage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Card>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Button variant="contained" component="label" onClick={doInsert}>Insert Data</Button>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
  );
}
