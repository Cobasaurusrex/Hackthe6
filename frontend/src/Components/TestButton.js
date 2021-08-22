import React from 'react'
import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
//import { getThemeProps } from '@material-ui/styles'

const StyledButton = withStyles({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "44px",
        padding: "0 25px",
        boxSizing: "border-box",
        borderRadius: 20, 
        background: "#25DB43",
        color: "#ff",
        //transform: "none",
        boxShadow: "6px 6px 0 0 #82a0b3",
        transition: "background .3s,border-color .3s,color .3s",
        "&:hover": {
            backgroundColor:  "#3B5D51"
          },
    },
    label: {
        textTransform: 'capitalize',
      },
    })(Button);

function TestButton(props){
    return(
        <StyledButton variant="containted">{props.txt}</StyledButton>

    )

}
export default TestButton
