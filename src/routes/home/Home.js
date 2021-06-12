import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, CssBaseline, Grid } from '@material-ui/core'
// eslint-disable-next-line import/no-extraneous-dependencies
import SearchBox from '../../components/search-box'
import FilterBox from '../../components/filters-box'
import { fetchFilters, updateFilter } from '../../actions/filter'
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

const Home = (props) => {
  const { store } = useContext(Context)
  const classes = useStyles()
  const { filters } = props
  const [filterData, setFilter] = React.useState(filters)

  useEffect(() => {
    ;(async () => {
      await props.fetchFilters(store)
    })()
  }, [])

  useEffect(() => {
    setFilter(filters)
  }, [store])
  // console.log(filters, store.getState().filterStore.filters)
  const handleFilterSelect = async (type, id) => {
    console.log(type, id)
    await props.updateFilter(store, type, id)
  }
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" disableGutters className={classes.container}>
        <SearchBox />
        <Grid className={classes.content} container>
          <FilterBox
            filters={filters || {}}
            handleFilterSelect={handleFilterSelect}
          />
          <Grid item xs={12} sm={9} />
        </Grid>
      </Container>
    </>
  )
}

Home.propTypes = {
  fetchFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
}
export default connect(
  (store) => ({
    filters: store.appStore.filters,
  }),
  { fetchFilters, updateFilter },
)(Home)
