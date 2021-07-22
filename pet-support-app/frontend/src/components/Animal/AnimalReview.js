import React from 'react';
//styles
import { makeStyles} from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/Animals/animalReviewStyle'
// @material-ui/core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import FileUploader from '../FileUploader'
//// @material-ui/icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DescriptionIcon from '@material-ui/icons/Description';
import InfoIcon from '@material-ui/icons/Info';
import PetsIcon from '@material-ui/icons/Pets';
import ImageIcon from '@material-ui/icons/Image';
  
const useStyles = makeStyles(styles);

function AnimalReview ({docFormData, infoFormData, handleBack, submitForm}) {
      const classes = useStyles();
      const {name, description, animalType,breed,age,gender,size,pictures,profilePicture,personalities} = infoFormData;
      const {isNeuteured, isVaccinated, isLeashTrained,isPottyTrained} = docFormData;

      const back = () => {
        handleBack()
      }
      return(
        <CardBody className={classes.grid}>
          <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
        <Accordion elevation={0} defaultExpanded square>
        <AccordionSummary
        classes={{root:classes.accordionSummary}}
          expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <PetsIcon className={classes.itemIcon}/>
           <Typography className={classes.heading}>General Information</Typography>
        </AccordionSummary>
        <AccordionDetails classes={{root:classes.accordionDetails}}>
            <GridItem xs={12} sm={12} md={6}>
               <Typography className={classes.title}> Name: <span className={classes.info}>{name}</span></Typography>
              <Typography className={classes.title}> Gender: <span className={classes.info}>{gender}</span> </Typography>
              <Typography  className={classes.title} > Age: <span className={classes.info}>{age}</span> </Typography>
              <Typography  className={classes.title} > Description:<span className={classes.info}> {description ? description : "N/A"} </span></Typography>
             </GridItem>
             <GridItem xs={12} sm={12} md={6}>
                   <Typography className={classes.title}> Animal Type: <span className={classes.info}>{animalType}</span> </Typography>
                    <Typography className={classes.title}> Breed: <span className={classes.info}>{breed}</span>  </Typography>
                    <Typography  className={classes.title} > Size: <span className={classes.info}>{size}</span> </Typography>
                    <div className={classes.title} > Personalities: <br></br> {personalities.length ? personalities.map((item, i) => {
                          return (
                              <Chip className={classes.chip} key={i} label={item}></Chip>
                          );
                          }) : "N/A"} </div>
              </GridItem>
        </AccordionDetails>
        </Accordion>
        </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
        <Accordion elevation={0} defaultExpanded square>
        <AccordionSummary
          classes={{root:classes.accordionSummary}}
          expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <DescriptionIcon className={classes.itemIcon}/>
           <Typography className={classes.heading}>Documents</Typography>
        </AccordionSummary>
        <AccordionDetails classes={{root:classes.accordionDetails}}>

            <GridItem xs={12} sm={12} md={6}>
              <Typography className={classes.title}> Is Neuteured: <span className={classes.info}>{isNeuteured.toString() === "true" ? "Yes" : "No"} </span></Typography>
              <Typography className={classes.title}> Is Vaccinated: <span className={classes.info}>{isVaccinated.toString() === "true" ? "Yes" : "No"}</span> </Typography>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
               <Typography  className={classes.title} > Is Potty Trained: <span className={classes.info}>{isPottyTrained.toString() === "true" ? "Yes" : "No"}</span> </Typography>
               <Typography  className={classes.title} > Is Leash Trained: <span className={classes.info}>{isLeashTrained.toString() === "true" ? "Yes" : "No"}</span> </Typography>
            </GridItem>

        </AccordionDetails>
        </Accordion>
        </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
        <Accordion elevation={0} defaultExpanded square>
        <AccordionSummary
          classes={{root:classes.accordionSummary}}
          expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <ImageIcon className={classes.itemIcon}/>
           <Typography className={classes.heading}>Pictures</Typography>
        </AccordionSummary>
        <AccordionDetails classes={{root:classes.accordionDetailPicture}}>
            <GridItem xs={12} sm={6} md={6}>
               <Typography className={classes.title}>Profile: </Typography>
             <FileUploader className={classes.fileUploader} justPreviews pics={profilePicture ? profilePicture : []}/>
            </GridItem>
           
            <GridItem xs={12} sm={6} md={6}>
              <Typography className={classes.title + " " + classes.pictureTitle}>Additional:</Typography>
              <FileUploader className={classes.fileUploader} justPreviews pics={pictures ? pictures : []}/>
            </GridItem>
        </AccordionDetails>
        </Accordion>
        </GridItem>
          </GridContainer>
          <div className={classes.buttonSpace}>
          <Button  
          color="transparent"
             onClick={back} 
             > Back
           </Button>
          <Button 
           onClick={submitForm}
           color="primary">Submit
          </Button>
          </div>
        </CardBody> 
  );
      
  }
  export default AnimalReview;


//   <Grid container direction="row" className={classes.root} >
//   <Card className={classes.card} container item xs={6}>
//   <Grid container direction="row" className={classes.grid} item xs={12}>
//   <CardContent>
//   <Grid container direction="column" className={classes.grid} item xs={4}>
      
         
//            <Typography className={classes.title}> <b>Name:</b> {name} </Typography>
//           <Typography className={classes.title}> <b>Gender:</b> {gender} </Typography>
//           <Typography  className={classes.title} > <b>Age:</b> {age} </Typography>
//           <Typography  className={classes.title} > <b>Description:</b> {description ? description : "N/A"} </Typography>
          
      
//   </Grid>
//   </CardContent>
//   <CardContent>
//   <Grid container direction="column" item xs={4}>
   
               
//                    <Typography className={classes.title}> <b>Animal Type:</b> {animalType} </Typography>
//                    <Typography className={classes.title}> <b>Breed:</b> {breed} </Typography>
//                    <Typography  className={classes.title} > <b>Size:</b> {size}</Typography>
//                    <Typography  className={classes.title} > <b>Personalities:</b> <br></br> {personalities.length ? personalities.map((item, i) => {
//                           return (
//                               <Chip className={classes.chip} key={i} label={item}></Chip>
//                           );
//                           }) : "N/A"} </Typography>
            
          
//   </Grid>
//   </CardContent>
//   </Grid>
//   </Card>
//   <Grid container direction="column" className={classes.grid} item xs={5}>
//       <Card>
//                <CardContent>
//                    <p>picture</p>
//                    <FileUploader pics={pictures ? pictures : []}/>
//                </CardContent>
//       </Card>
//   </Grid>
//   <Card className={classes.card} container item xs={6}>
//   <Grid container direction="row" className={classes.grid} item xs={12}>
//   <CardContent>
//   <Grid container direction="column" className={classes.grid} item xs={12}>
      
         
//   <Typography className={classes.title}> <b>Is Neuteured :</b> {isNeuteured.toString() === "true" ? "Yes" : "No"} </Typography>
//                    <Typography className={classes.title}> <b>Is Vaccinated:</b> {isVaccinated.toString() === "true" ? "Yes" : "No"} </Typography>
          
      
//   </Grid>
//   </CardContent>
//   <CardContent>
//   <Grid container direction="column" item xs={12}>
   
//   <Typography  className={classes.title} > <b>Is PottyTrained:</b> {isPottyTrained.toString() === "true" ? "Yes" : "No"} </Typography>
//                   <Typography  className={classes.title} > <b>Is LeashTrained:</b> {isLeashTrained.toString() === "true" ? "Yes" : "No"} </Typography>
            
          
//   </Grid>
//   </CardContent>
//   </Grid>
//   </Card>

//   <Button 
//           onClick={back}
//           type="submit"
//           className={classes.button}>
//            Back
//           </Button>
//           <Button
//               variant="contained"
//               color="primary"
//               className={classes.button}
//               type="submit"
//           >
//               Submit
//           </Button>
  
// </Grid>
//   return(
       
//     <Grid container direction="row" className={classes.root} >
//         <Grid className={classes.grid} item xs={12}>
//             <Accordion defaultExpanded>
//                 <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="panel1c-content"
//                 id="panel1c-header"
//                 >
//                 <div className={classes.column}>
//                     <Typography className={classes.heading}>General Infomation</Typography>
//                 </div>
//                 </AccordionSummary>
//                 <AccordionDetails className={classes.details}>
//                 <Grid container direction="row" spacing={3}>
//                 <Grid className={classes.grid} item xs={4} >
//                     <Card>
//                         <CardContent>
//                             <Typography className={classes.title}> <b>Name:</b> {name} </Typography>
//                             <Typography className={classes.title}> <b>Gender:</b> {gender} </Typography>
//                             <Typography  className={classes.title} > <b>Age:</b> {age} </Typography>
//                             <Typography  className={classes.title} > <b>Description:</b> {description ? description : "N/A"} </Typography>
//                             </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid className={classes.grid} item xs={4}>
                    // <Card>
                    //     <CardContent>
                    //         <Typography className={classes.title}> <b>Animal Type:</b> {animalType} </Typography>
                    //         <Typography className={classes.title}> <b>Breed:</b> {breed} </Typography>
                    //         <Typography  className={classes.title} > <b>Size:</b> {size}</Typography>
                    //         <Typography  className={classes.title} > <b>Personalities:</b> {personalities.length ? personalities.map((item, i) => {
                    //                 return (
                    //                     <option key={i} value={item}>
                    //                     {item}
                    //                     </option>
                    //                 );
                    //                 }) : "N/A"} </Typography>
                    //     </CardContent>
                    // </Card>
//                 </Grid>
//                 </Grid>
//                 <Grid container direction="row" spacing={3}>
//                 <Grid className={classes.grid} item xs={12}>
//                     <Card>
//                         <CardContent>
//                             <p>picture</p>
//                             <FileUploader pics={pictures ? pictures : []}/>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 </Grid>
//                 </AccordionDetails>
//                 <Divider />
//                 <AccordionActions>
//                 <Button size="small">Cancel</Button>
//                 <Button size="small" color="primary">
//                     Save
//                 </Button>
//                 </AccordionActions>
//             </Accordion>
//         </Grid>
//         <Grid className={classes.grid} item xs={12}>
//             <Accordion defaultExpanded>
//                 <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="panel1c-content"
//                 id="panel1c-header"
//                 >
//                 <div className={classes.column}>
//                     <Typography className={classes.heading}>General Infomation</Typography>
//                 </div>
//                 </AccordionSummary>
//                 <AccordionDetails className={classes.details}>
//                 <Grid container spacing={3}>
//                 <Grid className={classes.grid} item xs={4} >
//                     <Card>
//                         <CardContent>
//                             <Typography className={classes.title}> <b>Name:</b> {name} </Typography>
//                             <Typography className={classes.title}> <b>Gender:</b> {gender} </Typography>
//                             <Typography  className={classes.title} > <b>Age:</b> {age} </Typography>
//                             <Typography  className={classes.title} > <b>Description:</b> {description ? description : "N/A"} </Typography>
//                             </CardContent>
//                     </Card>
//                 </Grid>
//                 </Grid>
//                 </AccordionDetails>
//             </Accordion>
//         </Grid>
      
//     </Grid>
   
//   );