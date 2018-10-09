import { Link } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import UserMenu from './UserMenu'
import NavMenu from './NavMenu'

const styles = {
  root: {
    flexGrow: 1
  }
}

const display = {
  display: 'flex',
  borderRadius: '12px',
  alignItems: 'baseline'
}

function NavBar (props) {
  const { classes } = props

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Toolbar>
          <Typography variant='h6' color='inherit'>
            <div style={display}>
              <Link to={`/`}>publicDiscourse</Link>{' '}
              <NavMenu />
              <UserMenu />
            </div>

          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavBar)
