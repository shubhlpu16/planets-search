import React, { useContext, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Grid } from '@material-ui/core'
// eslint-disable-next-line import/no-extraneous-dependencies
import SearchBox from '../../components/search-box'
import FilterBox from '../../components/filters-box'
import SearchResults from '../../components/search-results'
import Loader from '../../components/loader'
import {
  fetchFilters,
  updateFilter,
  getSearchResults,
  handleSearchChange as handleChange,
} from '../../actions/filter'
import { Context } from '../../AppContext'

const useStyles = makeStyles(() => ({
  container: {
    border: '1px solid #dce2ed',
    height: '100vh',
    borderTop: 'none',
    borderBottom: 'none',
    paddingTop: '5vw',
    overflow: 'auto',
  },

  content: {
    marginTop: '48px',
    height: 'calc(100% - 80px)',
  },

  searchResults: {
    overflow: 'auto',
    padding: '5vw',
    height: '100%',
  },

  planetContainer: {
    padding: '1vw',
  },

  planetName: {
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  planetDescription: {
    color: '#888282',
    fontWeight: '500',
    marginBottom: '12px',
  },
  line: {
    background: '#dce2ed',
    borderLeft: 'none',
    opacity: '0.3',
  },
}))

const Home = (props) => {
  const { store } = useContext(Context)
  const classes = useStyles()
  const { filters, searchText, searchResults = [], colors, shapes } = props
  const loaderRef = useRef()
  const filterRef = useRef()
  const resultRef = useRef()

  useEffect(() => {
    ;(async () => {
      loaderRef.current.show()
      await props.fetchFilters(store)
      loaderRef.current.hide()
      filterRef.current.show()
      let filtered = false
      Object.keys(filters).forEach((key) => {
        filtered =
          filtered || filters[key].some((filter) => filter.selected === true)
      })
      if (filtered || searchResults) {
        resultRef.current.show()
      }
    })()
  }, [])

  const handleSearchChange = (value) => {
    props.handleChange(value)
  }

  const handleSearch = async () => {
    await props.getSearchResults(store)
    resultRef.current.show()
  }

  const handleKeydown = async (e) => {
    if (e.keyCode === 13) {
      await handleSearch()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown, false)
    return () => {
      document.removeEventListener('keydown', handleKeydown, false)
    }
  }, [])

  const handleFilterSelect = async (type, id) => {
    await props.updateFilter(store, type, id)
    await handleSearch()
  }

  return (
    <>
      <Container maxWidth="md" disableGutters className={classes.container}>
        <SearchBox
          searchText={searchText}
          handleSearchChange={handleSearchChange}
          handleSearch={handleSearch}
        />
        <Grid className={classes.content} container>
          <FilterBox
            filters={filters || {}}
            handleFilterSelect={handleFilterSelect}
            ref={filterRef}
          />
          <SearchResults
            searchResults={searchResults}
            colors={colors}
            shapes={shapes}
            ref={resultRef}
          />
        </Grid>
      </Container>
      <Loader ref={loaderRef} />
    </>
  )
}

Home.propTypes = {
  fetchFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  getSearchResults: PropTypes.func.isRequired,
  searchResults: PropTypes.array.isRequired,
  colors: PropTypes.object.isRequired,
  shapes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
}
export default connect(
  (store) => ({
    filters: store.appStore.filters,
    searchText: store.appStore.searchText,
    searchResults: store.appStore.searchResults,
    colors: store.appStore.colors,
    shapes: store.appStore.shapes,
  }),
  { fetchFilters, updateFilter, getSearchResults, handleChange },
)(Home)
