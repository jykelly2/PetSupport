import { hexToRgb, blackColor, grayColor } from "assets/jss/material-dashboard-react.js";

const emptyCardStyle = {
    divImg:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    img: {
         objectFit:"cover",
         width: "100%",
         height: "100%",
         maxWidth: "300px",
         maxHheight: "300px",
         borderRadius: "50%",
    },
    title:{
        textAlign: "center",
        fontSize: "1.25rem",
        lineHeight: "22px",
        color: grayColor[2],
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontWeight: "600",
         marginBottom: "1rem",
    },
    message:{
        textAlign: "center",
        marginBottom: "1rem",
        fontSize: "0.95rem",
        lineHeight: "22px",
        color: grayColor[13],
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontWeight: "450",
    },  
}

export default emptyCardStyle;