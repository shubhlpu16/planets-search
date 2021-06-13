import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core'

const HOVER_COLORS = {
  red: '#e8563c',
  blue: '#046ec9',
  green: '#22c347',
}

const useStyles = makeStyles(() => ({
  searchResults: {
    overflow: 'auto',
    padding: '5vw',
    height: '100%',
    opacity: '0',
  },

  planetContainer: {
    padding: '1vw',
    border: '2px solid white',
  },

  planetName: {
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  planetDescription: {
    fontWeight: '500',
    marginBottom: '12px',
    color: '#707070',
  },
  line: {
    background: '#dce2ed',
    borderLeft: 'none',
    opacity: '0.3',
  },
  noPlanets: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const SearchResults = forwardRef(function SearchResults(props, ref) {
  const classes = useStyles()
  const { searchResults = [], colors, shapes } = props
  const planetRef = useRef([])
  const resultsRef = useRef()

  const handleMouseEnter = (index, color) => {
    const colorValue = HOVER_COLORS[colors[color].toLowerCase()]
    if (planetRef.current[index])
      planetRef.current[index]
        .animate(
          {
            borderColor: [colorValue],
            boxShadow: [`0px 0px 24px ${colorValue}`],
          },
          { duration: 300, easing: 'ease-in', fill: 'forwards' },
        )
        .play()
  }

  const handleMouseLeave = (index) => {
    if (planetRef.current[index])
      planetRef.current[index]
        .animate(
          { borderColor: ['#ffffff'], boxShadow: ['none'] },
          { duration: 300, easing: 'ease-in', fill: 'forwards' },
        )
        .play()
  }

  useImperativeHandle(ref, () => ({
    show: () => {
      if (resultsRef.current)
        resultsRef.current.animate(
          { opacity: [0, 1] },
          { duration: 1000, easing: 'ease-in', fill: 'forwards' },
        )
    },
  }))
  return (
    <>
      <Grid
        item
        xs={12}
        sm={9}
        className={classes.searchResults}
        ref={resultsRef}
      >
        {searchResults.length ? (
          searchResults.map((planet, i) => (
            <React.Fragment key={planet.id}>
              <div
                className={classes.planetContainer}
                onMouseEnter={() => handleMouseEnter(i, planet.color)}
                onMouseLeave={() => handleMouseLeave(i)}
                ref={(node) => {
                  if (node) {
                    planetRef.current[i] = node
                  }
                }}
              >
                <Typography className={classes.planetName}>
                  {planet.name}
                </Typography>
                <Typography className={classes.planetDescription}>
                  {planet.name} have {colors[planet.color]} color and{' '}
                  {shapes[planet.shape]} shape
                </Typography>
              </div>
              <hr className={classes.line} />
            </React.Fragment>
          ))
        ) : (
          <div className={classes.noPlanets}>No Planets found</div>
        )}
      </Grid>
    </>
  )
})

SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
  colors: PropTypes.object.isRequired,
  shapes: PropTypes.object.isRequired,
}
export default SearchResults
