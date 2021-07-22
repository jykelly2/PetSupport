//components
import { Box, Typography, Container } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
//style
import { makeStyles} from "@material-ui/core/styles";
import styles from 'assets/jss/material-dashboard-react/views/page404Style'

const errorImg = require("assets/img/illustration_404.svg").default
const useStyles = makeStyles(styles);

export default function Page404() {
  const classes = useStyles();
    return (
        <Container className={classes.root}>
            <Box maxWidth={480} margin= 'auto' textAlign= 'center'>
              <div>
                <Typography variant="h3" className={classes.darkGrayText} paragraph>
                  Page not found!
                </Typography>
                </div>
                <div>
              <Typography>
              Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?
              Or check your permissions.
              </Typography>
              </div>
              <div>
                <Box
                  component="img"
                  src={errorImg}
                  height={260} 
                  mt={5}
                  mb={6}
                />
                </div>
              <Button href={"admin/dashboard"} color="primary">
                Go to Home
              </Button>
            </Box>
        </Container>
    );
  }