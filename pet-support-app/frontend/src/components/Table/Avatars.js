import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {bucketType} from '../../utils'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
import typographyStyle from 'assets/jss/material-dashboard-react/components/typographyStyle'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  medium: {
    width: theme.spacing(5.5),
    height: theme.spacing(5.5),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  flex: {
    display:'flex'
  },
  img: {
    width:"100%",
    height:"100%",
  },
  ...typographyStyle
}));

export default function Avatars(props) {
    const classes = useStyles();
    const [avatarSrc, setAvatarSrc] = useState('');
    const [contentType, setContentType] = useState('');

    useEffect(() => {
      const bucketType = props.bucketType ? props.bucketType : null;
      const picture = props.data.picture || props.data.pictures ? 
      props.data.picture || props.data.pictures[0] : null;
      setContentType(bucketType)
       if (picture && bucketType) {
         getAvatarPicture(picture, bucketType)
       }
    }, []);

  const getAvatarPicture = async (picture, bucketType) =>{

    const imageRes = picture ? await (await axios.post('http://localhost:5000/images/getImage', {picture: picture, bucket: bucketType})).data : '';
    setAvatarSrc(imageRes)
  }

  return ( 
    <div className={classes.flex}>
    <Avatar src={avatarSrc} className={classes.medium} classes={{img: classes.img}} />
    {contentType === bucketType.Staff ? 
    <Typography className={classes.name}>{props.data.firstname +' '+ props.data.lastname}</Typography>
    : contentType === bucketType.Animal ? 
    <Typography className={classes.name}>{props.data.name}</Typography>
    : null
    }
    {/* <br/> {props.data.email}</p>  */}
    </div>
  )
}