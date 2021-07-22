const loginStyle = (theme) => ({
    root: {
      height: '100vh',
    },
    image: {
     width: '100%',
     height: '100%',
     objectFit: 'cover',
    },
    logo: {
      width: '220px', 
      height: '80px', 
      objectFit: 'contain',
      marginRight: theme.spacing(4),
      marginBottom: theme.spacing(4),
     },
    paper: {
      margin: theme.spacing(12, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    marginTop: {
      marginTop: theme.spacing(0),
    },
  });

  export default loginStyle;