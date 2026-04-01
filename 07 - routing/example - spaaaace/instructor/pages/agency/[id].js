// react hooks
import { useState, useEffect } from 'react';

// nextjs routing
import { useRouter } from 'next/router';

// our functions
import { getAgency } from '@utils/api/agencies';

// mui components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';

// our components
import NavBar from '@components/NavBar';
import SimpleDetailsCard from '@components/SimpleDetailsCard'
import LoadingCircle from '@components/LoadingCircle'


export default function Agency() {

  const router = useRouter()
  const { id } = router.query // good ol' destructuring

  const [agencyData, setAgencyData] = useState(null)

  useEffect(() => {
    getAgency(id).then((data) => {
      console.log(data)
      setAgencyData(data)
    })
    }, [])

  return (
    <>
      
      <NavBar />

      { !agencyData ?
          <LoadingCircle />
        :
          <Container sx={{ paddingTop: 2 }}>
            <Grid container>

              <Grid item xs="2">
                <img
                    alt={agencyData.name}
                    src={agencyData.logo_url}
                    style={{
                        width: `120px`
                    }}
                />
              </Grid>

              <Grid item xs="10">
                <Typography variant="h3" gutterBottom>
                  {`${agencyData.name} (${agencyData.abbrev})`}
                </Typography>
              </Grid>

              <Grid item xs="4">
                <SimpleDetailsCard 
                    title={'Total Launches'}
                    description={agencyData.total_launch_count}
                />
              </Grid>

              <Grid item xs="4">
                <SimpleDetailsCard 
                    title={'Successful Launches'}
                    description={agencyData.successful_launches}
                />
              </Grid>

              <Grid item xs="4">
                <SimpleDetailsCard 
                    title={'Successful Landings'}
                    description={`${agencyData.successful_landings}`}
                />
              </Grid>

            </Grid>
          </Container>
      }
    </>
  )
}
