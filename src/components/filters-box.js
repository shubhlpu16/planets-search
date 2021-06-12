import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, FormControlLabel, Checkbox } from '@material-ui/core'
// eslint-disable-next-line import/no-extraneous-dependencies

const useStyles = makeStyles(() => ({
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRight: '1px solid #dce2ed',
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

const FILTERS = {
  Color: [
    { label: 'Red', selected: false },
    { label: 'Green', selected: false },
    { label: 'Blue', selected: false },
  ],
  Shape: [
    { label: 'Small', selected: false },
    { label: 'Medium', selected: false },
    { label: 'Large', selected: false },
  ],
  Size: [
    { label: 'Round', selected: false },
    { label: 'Oval', selected: false },
  ],
}

const FilterBox = () => {
  const classes = useStyles()
  return (
    <>
      <Grid item xs={12} sm={3} className={classes.filterContainer}>
        {Object.keys(FILTERS).map((item) => (
          <div item key={item} className={classes.filter}>
            <Typography className={classes.filterText}>{item}</Typography>
            {FILTERS[item].map((filter) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.selected}
                    onChange={() => {}}
                    name={filter.label}
                    color="primary"
                  />
                }
                label={filter.label}
              />
            ))}
          </div>
        ))}
      </Grid>
    </>
  )
}
export default FilterBox
