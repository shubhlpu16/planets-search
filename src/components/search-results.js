import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core'

const HOVER_COLORS = {
  red: '#e8563c',
  blue: '#046ec9',
  green: '#22c347',
}

const useStyles = makeStyles(() => ({
  container: {
    border: '1px solid #dce2ed',
    height: '100vh',
    borderTop: 'none',
    borderBottom: 'none',
    paddingTop: '5vw',
    overflow: 'hidden',
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
    fontWeight: '500',
    marginBottom: '12px',
    color: '#707070',
  },
  line: {
    background: '#dce2ed',
    borderLeft: 'none',
    opacity: '0.3',
  },
}))

const SearchResults = (props) => {
  const classes = useStyles()
  const { searchResults = [], colors, shapes } = props
  const planetRef = useRef([])

  const handleMouseEnter = (index, color) => {
    planetRef.current[index]
      .animate(
        { backgroundColor: [HOVER_COLORS[colors[color].toLowerCase()]] },
        { duration: 300, easing: 'ease-in', fill: 'forwards' },
      )
      .play()
  }

  const handleMouseLeave = (index) => {
    planetRef.current[index]
      .animate(
        { backgroundColor: ['#ffffff'] },
        { duration: 300, easing: 'ease-in', fill: 'forwards' },
      )
      .play()
  }
  return (
    <>
      <Grid item xs={12} sm={9} className={classes.searchResults}>
        {searchResults.map((planet, i) => (
          <>
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
          </>
        ))}
      </Grid>
    </>
  )
}

SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
  colors: PropTypes.object.isRequired,
  shapes: PropTypes.object.isRequired,
}
export default SearchResults
