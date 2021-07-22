import React from 'react';
import classNames from "classnames";
import PropTypes from "prop-types";
import { DropzoneArea} from 'material-ui-dropzone'
//styles
import { makeStyles} from '@material-ui/core/styles';
import {grayColor} from "assets/jss/material-dashboard-react.js";
import ImageIcon from '@material-ui/icons/Image';



const styles = (theme) => ({
    marginTop: {
      marginTop: "27px !important",
    },
    backgroundColor: {
        backgroundColor: grayColor[2],
    },
    dropZoneNone:{
        display: "none"
    },
    dropZoneText:{
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontSize: "18px",
        fontWeight: "600",
        lineHeight: "22px",
        color: grayColor[7], // #72849a
        textAlign:"center",
        marginBottom: "1.2rem",
    },
    fileIcon:{
        color: grayColor[2]
    },
    previewGridContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        padding: "40px 0px 30px 0px !important",
    },
    justPreviewGridContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'flex-start',
        padding: "30px 0px 0px 0px !important",
    },
    previewGridItem:{
        padding: "0px 0px 0px 0px !important",
        margin: "0px  5px 5px 5px !important"
    },
})

const useStyles = makeStyles(styles);

export default function FileUploader (props) {
    const classes = useStyles();
    const pics = props.pics ? props.pics : []
    const filesLimit = props.filesLimit ? props.filesLimit : 5
    const setPictures = props.setPictures ? props.setPictures : ''
    const {justPreviews} = props;
    
    const dropZoneClasses = classNames({
        [classes.dropZoneNone]: justPreviews,
        //[classes.myDropZone]: true,
    });
    const dropZoneTextClasses = classNames({
        [classes.dropZoneText]: true,
    });

    const previewGridClasses = classNames({
        [" " + classes.previewImage]: true,
    });

    return (
        <div>
            {setPictures ?
                <DropzoneArea
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    Icon={ImageIcon}
                    //showPreviews={true}
                    dropzoneParagraphClass={dropZoneTextClasses}
                    dropzoneClass={dropZoneClasses}
                    showPreviewsInDropzone={true}
                    previewGridClasses = {{
                        container:classes.previewGridContainer, 
                        item: classes.previewGridItem, 
                       //image: classes.previewGridImage
                    }}
                    dropzoneText={"Drag and Drop or Click"}
                    maxFileSize={5000000}
                    filesLimit={filesLimit}
                    initialFiles = {pics}
                    onChange={(e) => setPictures(e)}
                    />
                :
                <DropzoneArea
                    dropzoneText={"Drag and Drop or Click"}
                    showPreviews={true}
                    previewText={justPreviews ? "": "Previews"}
                    previewGridClasses = {{
                        container:classes.justPreviewGridContainer, 
                        item: classes.previewGridItem, 
                    }}
                    dropzoneClass={dropZoneClasses}
                    maxFileSize={5000000}
                    filesLimit={filesLimit}
                    initialFiles = {pics}
                /> 
            }
             </div>
    );
}

FileUploader.propTypes = {
    pics: PropTypes.array,
    filesLimit: PropTypes.number,
    setPictures: PropTypes.func,
    justPreviews: PropTypes.bool,
  };
//     previewImage:{
//         width: "80%",
//         height: "80%",
//         boxShadow: "2px 2px 12px -3px rgba(0,0,0,0.34)",
//         borderRadius: "7px",
//         objectFit:'cover',
//    },
    // previewGridImage: {
    //     width: "100px !important",
    //     height: "100px !important",
    //     boxShadow: "2px 2px 12px -3px rgba(0,0,0,0.34)",
    // },
    // myDropZone: {
    //     position: 'relative',
    //     width: '100%',
    //     height: '100%'
    //     //height: '50%',
    //     // minHeight: '400px',
    //     // backgroundColor: '#F0F0F0',
    //     // border: 'dashed',
    //     // borderColor: '#C8C8C8',
    //     // cursor: 'pointer',
    //     // boxSizing: 'border-box',
    // },
    
   //  getPreviewIcon={(file) => {
                    // //     console.log(file)
                    // //     if (file.file.type.split('/')[0] === 'image')
                    //       return (
                    //         // <Image className={previewGridClasses} src={file.data}></Image>
                    //          <img className={previewGridClasses} src={file.data} /> 
                    //         // <div className={classes.imageContainer}>
                    //         // </div>
                    //       );
                    // }}

    // previewGridProps={{classes: {
    //     root: previewGridProps
    // }}}
    // previewGridClasses={{
    //     item: classes.previewItem
    // }}

    // const previewGridProps = classNames({
    //     [ classes.root]: justPreviews,
    //     [ classes.backgroundColor]: justPreviews,
    // });
 
// export default class Previews extends Component {
//     constructor(props) {
//         super(props);
//         this.getMultilpleFiles = this.getMultilpleFiles.bind(this)
//        // this.onChange = this.onChange.bind(this)
//         this.state = {
//             files: this.props.pics,
//             intial: this.getMultilpleFiles(this.props.pics)
//         };
//     } 

    
//     componentDidMount(){

//          this.getMultilpleFiles(this.props.pics)
//     //    const arr = getMultilpleFiles(this.props.pics)
//     //    this.setState({files:arr})
//     // this.props.pics.map(imageDataUrl => {
//     //           fetch(imageDataUrl).then(res => {
//     //             res.arrayBuffer().then(buf => {
//     //               const file = new File([buf], 'image_data_url.jpg', { type: 'image/jpeg' })
//     //               this.setState({ file: file })
//     //             })
//     //         })
//     //     })

//     }

//     handleChange(files){
//         this.setState({
//           files: files
//         });

//         console.log(files)
//     }

//     async getMultilpleFiles(pics){
//         //console.log(pics)
//         const promisesOfS3Objects = []
//        return await Promise.all(pics.map(imageDataUrl=>fetch(imageDataUrl))).then(res =>
//             Promise.all(res.map(async res => {
//                 const buf = await res.arrayBuffer();
//              promisesOfS3Objects.push(new File([buf], 'image_data_url.jpg', { type: 'image/jpeg' }))
//              console.log(promisesOfS3Objects)
//             }))
//         )
//         console.log(promisesOfS3Objects)
//         return promisesOfS3Objects

//         // await Promise.all(pics.map(function(imageDataUrl) {
//         //     promisesOfS3Objects.push((fetch(imageDataUrl))
//         //           .then(function (res) {
//         //              // console.log(file)
//         //             return res.arrayBuffer().then(function (buf){
//         //                 return new File([buf], 'image_data_url.jpg', { type: 'image/jpeg' })
//         //             })
//         //           })
//         //           )}))

//         // await Promise.all(pics.map(function(imageDataUrl) {
//         //     promisesOfS3Objects.push((fetch(imageDataUrl))
//         //           .then(async res =>  {
//         //              // console.log(file)
//         //             const buf = await res.arrayBuffer();
//         //               return new File([buf], 'image_data_url.jpg', { type: 'image/jpeg' });
//         //           })
//         //           )}))
            
//         return pics.map(function(imageDataUrl) {(fetch(imageDataUrl))
//                   .then(async res =>  {
//                      // console.log(file)
//                     const buf = await res.arrayBuffer();
//                       return new File([buf], 'image_data_url.jpg', { type: 'image/jpeg' });
//                   })})
//         this.setState({files: promisesOfS3Objects})
//         console.log(this.state.files)

//     }
    
//     render() {
//         return (
//             <div>
//                 {/* <Button onClick={this.handleOpen.bind(this)}>
//                   Add Image
//                 </Button> */}
//                 <DropzoneArea
//                     acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
//                     //showPreviews={true}
//                     maxFileSize={5000000}
//                     filesLimit={5}
//                     initialFiles = {this.state.files}
//                     onChange={this.handleChange.bind(this)}//console.log('Files:::', files.map(file => file.name))}
//                     />
//             </div>
//         );
//     }
// }


