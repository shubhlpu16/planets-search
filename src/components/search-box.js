import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components'
import { TextField, Button, Grid } from '@material-ui/core'
// eslint-disable-next-line import/no-extraneous-dependencies
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(() => ({
  searchBox: {
    height: '56px',
  },
  search: {
    height: '100%',
    width: '20px',
  },
  searchField: {
    height: '100%',
    width: '70%',
  },
  root: {
    borderRadius: '0',
  },
}))

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    border-radius: 0;
    &:hover fieldset {
      border-color: #00baff;
    }
    &.Mui-focused fieldset {
      border-color: #00baff;
    }
  }
`
const StyledButton = styled(Button)({
  background: 'linear-gradient(45deg, #046ec9 30%, #041b67 90%)',
  border: 0,
  borderRadius: 0,
  boxShadow: 'none',
  color: 'white',
  padding: '0 30px',
})

const SearchBox = (props) => {
  const classes = useStyles()
  const {
    searchText = '',
    handleSearchChange = () => {},
    handleSearch = () => {},
  } = props
  const handleChange = (event) => {
    handleSearchChange(event.target.value)
  }
  return (
    <>
      <Grid
        className={classes.searchBox}
        container
        direction="row"
        alignItems="center"
        justify="center"
      >
        <StyledTextField
          variant="outlined"
          className={classes.searchField}
          value={searchText}
          onChange={handleChange}
          autoFocus
          classes={{ root: classes.root }}
          helperText="Please enter text to search"
        />
        <StyledButton
          variant="contained"
          className={classes.search}
          onClick={handleSearch}
        >
          <SearchIcon />
        </StyledButton>
      </Grid>
    </>
  )
}

SearchBox.propTypes = {
  searchText: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
}
export default SearchBox
