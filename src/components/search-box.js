import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Grid } from '@material-ui/core'
// eslint-disable-next-line import/no-extraneous-dependencies
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(() => ({
  searchBox: {
    height: '56px',
  },
  search: {
    backgroundColor: '#4E8DF5',
    borderRadius: '0',
    height: '100%',
    width: '20px',
  },
  searchField: {
    height: '100%',
    width: '70%',
  },
}))

const SearchBox = () => {
  const classes = useStyles()
  return (
    <>
      <Grid
        className={classes.searchBox}
        container
        direction="row"
        alignItems="center"
        justify="center"
      >
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          className={classes.searchField}
        />
        <Button variant="contained" color="primary" className={classes.search}>
          <SearchIcon />
        </Button>
      </Grid>
    </>
  )
}
export default SearchBox
