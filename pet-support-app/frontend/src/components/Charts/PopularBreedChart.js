import Chart from 'react-apexcharts'
import React, {useState, useEffect} from 'react';
import MessageBox from 'components/MessageBox';
//styles
import {
    grayColor,
} from "assets/jss/material-dashboard-react.js";

export default function PopularBreedChart(props) {
const dateToday = new Date()
const [chartData , setChartData] = useState([]);
const fileNameFormat = "Top 5 Popular Breeds Count Record - (" + dateToday.toLocaleString('default', { month: 'long', year: "numeric"}) + ")"

var animals = []
useEffect(() => {
    if (props?.animals){
        animals = props.animals
    }
    if (animals?.length){
        var data= [];
        var breeds = [];
        animals.map(animal => {
            const breed = animal.breed
            if (!(breeds.includes(breed))){
                const breedCount = (animals.filter(item => item.breed === animal.breed)).length
                data.push({"breed": breed, "count": breedCount})
                breeds.push(breed)
            }
         })
         data = data.slice()
         .sort((a, b) => {
            return b.count - a.count
         })
         .slice(0, 5);
         setChartData(data)
    }
},[]);

return (
    <div>
    { animals?.length ? (<MessageBox color="danger" message={"No animal records found!"} place={"tr"}  openDuration={4000} ></MessageBox>
    ): (
        <div>
        <Chart
        options={{
            chart: {
                toolbar: {
                     show: true,
                    tools: {
                      download: true,
                    },
                    export: {
                      csv: {
                        filename: fileNameFormat,
                        columnDelimiter: ',',
                        headerCategory: 'Breed',
                        headerValue: 'Booking Count',
                      },
                      svg: {
                        filename: fileNameFormat,
                      },
                      png: {
                        filename: fileNameFormat,
                      }
                    },
                }
            },
            plotOptions: {
                pie: {
                  donut: {
                      height:450,
                    size: '80%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            offsetY: 20,
                            formatter: () => 'of Total'
                          },
                          value: {
                            show: true,
                            fontSize: '20px',
                            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                            fontWeight: "500",
                            offsetY: -20
                          },
                        total: {
                            show: true,
                            showAlways: true,
                            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                            fontWeight: "500",
                            color: grayColor[2],
                            formatter: function (w) { 
                                return  (((w.globals.seriesTotals.reduce((a, b) => a + b, 0)/props?.animals?.length)*100).toFixed(1))+"%"
                            }
                        },
                    },
                  },
                  offsetY: 16,
                },
              },
            dataLabels: {
                enabled: false,
            },
			labels: chartData.map(data => data.breed),
            title: {
                text: 'Top 5 Popular Breeds',
                style: {
                  fontSize: '16px'
                }
            },
            legend: {
                show:true,
                position: 'bottom',
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                fontWeight: "450",
                fontSize: "13px",
                formatter: function(seriesName, opts) {
                    return [seriesName, ": ", opts.w.globals.series[opts.seriesIndex]]
                },
                labels:{
                    colors: grayColor[2]
                },
                markers:{
                    width: 7,
                    height: 7,
                },
                itemMargin:{
                    vertical: 10,
                },
            },
		}}
        type="donut"
        series= {chartData.map(data => data.count)}
        height= {450} 
    />
    </div>
    )} 
    </div>
    )
}

//CUSTOM LEGENDS

// @material-ui/core
// import GridItem from "components/Grid/GridItem.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import Typography from '@material-ui/core/Typography'
// import Badge from "@material-ui/core/Badge";

// const useStyles = makeStyles((theme) => ({
//     title:{
//         fontSize: "0.8rem",
//         color: grayColor[2],
//         fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//         fontWeight: "450",
//         textAlign: "left",
//       },
//       info:{
//        float:"right",
//         fontSize: "0.8rem",
//         color: grayColor[13],
//         fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//         fontWeight: "700",
//       },
//       container:{
//           width: "50%",
//          margin: "0 auto"
//       },
//       customBadge:{
//         backgroundColor: "#00AFD7",
//         color: "white"
//       }
// }))

  {/* <GridContainer>
        <GridItem xs={12}>
        {labels.map((label, index) => {
           return <div className={classes.container}>
               <p className={classes.title} style={{ color:chartColor[index]}}>
                    {label}
                    <span className={classes.info}>{series[index]}</span>
                </p>
            </div>
        })}
        </GridItem>
    </GridContainer>  */}