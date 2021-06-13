import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
// eslint-disable-next-line import/no-extraneous-dependencies

const useStyles = makeStyles(() => ({
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: '0',
    pointerEvents: 'none',
  },
}))

const Loader = forwardRef(function Loader(props, ref) {
  const classes = useStyles()
  const loaderRef = useRef()

  useImperativeHandle(ref, () => ({
    show: () => {
      loaderRef.current.animate(
        { opacity: [1] },
        { duration: 500, easing: 'ease-in', fill: 'forwards' },
      )
    },
    hide: () => {
      loaderRef.current.animate(
        { opacity: [0] },
        { duration: 500, easing: 'ease-in', fill: 'forwards' },
      )
    },
  }))

  return (
    <>
      <div ref={loaderRef} className={classes.loader}>
        <CircularProgress />
      </div>
    </>
  )
})

Loader.propTypes = {}
export default Loader
