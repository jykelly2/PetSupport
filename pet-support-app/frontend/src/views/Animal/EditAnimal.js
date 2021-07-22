import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsAnimal, updateAnimal  } from '../../actions/AnimalActions';
import { roles } from '../../utils';
//animal form components
import {AnimalInfo} from '../../components/Animal/AnimalInfo'
import {AnimalDocuments} from '../../components/Animal/AnimalDocuments'
import AnimalReview from '../../components/Animal/AnimalReview'
import AnimalStepper from '../../components/Stepper/AnimalStepper'
//@material/custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import CustomBreadcrumbs from 'components/BreadCrumbs/BreadCrumbs'
//styles
import { makeStyles } from '@material-ui/core/styles';
import styles from "assets/jss/material-dashboard-react/views/Animals/editAnimalStyle"
  
  
  const useStyles = makeStyles(styles);

  export default function EditAnimal(props) {
    const classes = useStyles();
    const animalId = props.match.params.id;

    var generalInfoData = "";
    var documentData = "";
    const [originalPictures, setOriginalPictures] = useState('');
    const [loaded, setLoaded] = useState('');
    const animalDetails = useSelector((state) => state.animalDetails);
    const { loading, error, animal,  pictureUrls} = animalDetails;

    const dispatch = useDispatch();

    const [activeStep, setActiveStep] = useState(0);
    const [infoFormData, setInfoForm] = useState('');
    const [docFormData, setDocForm] = useState('');

    const animalUpdate = useSelector((state) => state.animalUpdate);
    const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    } = animalUpdate;

    useEffect(() => {
        if (successUpdate) {
          setTimeout(function(){ 
            window.location = '/admin/animals';
          },2000)
        }
        if (!animal) {
            dispatch(detailsAnimal(animalId));
        } else {
            documentData = {
                isNeuteured: animal.isNeuteured? 'true' : 'false',
                isVaccinated: animal.isVaccinated? 'true' : 'false',
                isPottyTrained: animal.isPottyTrained? 'true' : 'false',
                isLeashTrained: animal.isLeashTrained? 'true' : 'false',
              }
            setDocForm(documentData)

            generalInfoData = {
                name: animal.name,
                description:animal.description,
                animalType:animal.animalType,
                breed:animal.breed,
                age:animal.age,
                gender:animal.gender,
                size:animal.size,
                pictures:[],
                profilePicture: [],
                personalities: animal.personalities ? animal.personalities : [],
            }

            setOriginalPictures(animal.pictures)
            setInitalPictureFiles(pictureUrls)
          }
      }, [dispatch, animal, successUpdate]);

    async function setInitalPictureFiles(pics) {
        const promisesOfS3Objects = []
        await Promise.all(pics.map((imageDataUrl)=>fetch(imageDataUrl))).then(res =>
            Promise.all(res.map(async (res, index) => {
                const buf = await res.arrayBuffer();
                const name = animal.pictures[index].split('||')[1]
                const type =  name != undefined || null || ""? 'image/' + name.split('.')[1] : ""
                 const file = new File([buf], name, { type: type })
                 promisesOfS3Objects.push(file)
        })))
        generalInfoData.pictures = promisesOfS3Objects.slice(1)
        generalInfoData.profilePicture = [promisesOfS3Objects[0]]
        setInfoForm(generalInfoData)
        setLoaded(true)
    }

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const submitForm = () => {
      if (infoFormData && docFormData){
        infoFormData["originalPictures"] = originalPictures
        infoFormData["id"] = animalId
        const animal = {
          generalInfo: infoFormData,
          documents: docFormData,
        }
        dispatch(updateAnimal(animal))
      }
    }

    const infoProps = {infoFormData, setInfoForm, handleBack, handleNext, classes }
    const docProps = {docFormData, setDocForm, handleBack, handleNext, classes}
    const reviewProps = {docFormData, infoFormData, handleBack, handleNext, submitForm}
  
    const getStepContent = (step) => {
        if (loaded){
        switch (step) {
          case 0:
            return  (<AnimalInfo {...infoProps} ></AnimalInfo>)
          case 1:
            return <AnimalDocuments {...docProps}></AnimalDocuments>
          case 2:
            return <AnimalReview {...reviewProps}></AnimalReview>;
          default:
            return 'Unknown step';
        }
    }
      }
    
    return (
    <div>
      {loading ? (<LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox color="danger" message={error} place={"tr"}  openDuration={4000} ></MessageBox>
        ) : (
        
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <CustomBreadcrumbs
              location={props.location}
              edit={true}
              plural={true}
              pageTitle={"Edit Animal"}
            />
          </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          {loadingUpdate ? (<LoadingBox></LoadingBox>
                ) : errorUpdate ? (
                  <MessageBox color="danger" message={errorUpdate} place={"tr"}  openDuration={4000} ></MessageBox>
                ) : successUpdate ? (
                  <MessageBox color="success" message={successUpdate} successMsg={true} place={"tr"}  openDuration={2000} ></MessageBox>
                ):(
                  <div></div>
                )}
          </GridItem>
        <GridItem xs={12} sm={12} md={12}>
        <Card>
        <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>Animal Information</h4>
            <p className={classes.cardCategoryWhite}>Complete the required steps</p>
        </CardHeader>
        <AnimalStepper activeStep={activeStep}/>
         <div className={classes.instructions}>{getStepContent(activeStep)}</div>
        </Card>
        </GridItem>
        </GridContainer>
        )
      }
      </div>
    );
  }

