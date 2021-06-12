import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, CssBaseline, Grid } from '@material-ui/core'
// eslint-disable-next-line import/no-extraneous-dependencies
import SearchBox from '../../components/search-box'
import FilterBox from '../../components/filters-box'
import { Context } from '../../AppContext'

const useStyles = makeStyles(() => ({
  container: {
    border: '1px solid #dce2ed',
    height: '100vh',
    borderTop: 'none',
    borderBottom: 'none',
    paddingTop: '24px',
    overflow: 'hidden',
  },

  content: {
    marginTop: '48px',
    height: 'calc(100% - 80px)',
  },
}))

const Home = () => {
  const { store } = useContext(Context)
  const classes = useStyles()
  console.log(store) //eslint-disable-line
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" disableGutters className={classes.container}>
        <SearchBox />
        <Grid className={classes.content} container>
          <FilterBox />
          <Grid item xs={12} sm={9} />
        </Grid>
      </Container>
    </>
  )
}
export default Home
