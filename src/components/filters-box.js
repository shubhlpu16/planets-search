import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from '@material-ui/core'
// eslint-disable-next-line import/no-extraneous-dependencies

const useStyles = makeStyles(() => ({
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRight: '1px solid #dce2ed',
    height: '100%',
  },

  filter: {
    display: 'flex',
    flexDirection: 'column',
    width: '100px',
    marginBottom: '24px',
  },

  filterText: {
    fontWeight: 'bold',
  },
}))

const FilterBox = (props) => {
  const classes = useStyles()
  const { filters = {}, handleFilterSelect = () => {} } = props
  return (
    <>
      <Grid item xs={12} sm={3} className={classes.filterContainer}>
        {Object.keys(filters).map((item) => (
          <div key={item} className={classes.filter}>
            <Typography className={classes.filterText}>{item}</Typography>
            <FormGroup>
              {filters[item].map((filter) => (
                <FormControlLabel
                  key={filter.id}
                  control={
                    <Checkbox
                      checked={
                        filter.selected === undefined ? false : filter.selected
                      }
                      onChange={() => {
                        handleFilterSelect(item, filter.id)
                      }}
                      name={filter.name}
                      style={{
                        color: item === 'Color' ? filter.name : '#438de3',
                      }}
                    />
                  }
                  label={filter.name}
                />
              ))}
            </FormGroup>
          </div>
        ))}
      </Grid>
    </>
  )
}

FilterBox.propTypes = {
  filters: PropTypes.object.isRequired,
  handleFilterSelect: PropTypes.func.isRequired,
}
export default FilterBox
