import React from 'react'
import TestButton from './TestButton'
import logo from '../logo.png'
//logo mobile
import {Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles";
//import { mergeClasses } from '@material-ui/styles'


const styles = makeStyles({
    bar:{
        paddingTop: "1.15rem",
        backgroundColor:"fff",
        ['@media (max-width:500px)']:{flexDirection: "column"}

    },
    logo: {
        width: "15%",

    },
    menuItem:{
        cursor:"pointer",
        flexGrow: 1,
        "&:hover":{color: "#5a7757"},
        ['@media (max-width:500px)']: { 
            paddingBottom: "1rem"    }
    }


})

function NavigationBar() {
    const classes = styles()
    return (
        <Toolbar position="sticky" color="rgba(0,0,0,0.5" className={classes.bar}>
            <img src={logo} className={classes.logo}/>
            
            <Typography variant="h6" className={classes.menuItem}>
                Home
            </Typography>
            <Typography variant="h6" className={classes.menuItem}>
                About us
            </Typography>
            <Typography variant="h6" className={classes.menuItem}>
                FAQ
            </Typography>
            <Typography variant="h6" className={classes.menuItem}>
                Submit a Claim
            </Typography>
            <TestButton txt="Contact Us"/>



        </Toolbar>
    )
}

export default NavigationBar
