import Chart from 'react-apexcharts'
import React, {useState, useEffect} from 'react';
import MessageBox from 'components/MessageBox';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import  '../../assets/css/table.css'
//styles
import {
    grayColor,
    primaryColor
} from "assets/jss/material-dashboard-react.js";

export default function PopularAnimalChart(props) {
const dateToday = new Date()

const [chartData , setChartData] = useState([]);

const fileNameFormat = "Top 5 Popular Animal Count Record - (" + dateToday.toLocaleString('default', { month: 'long', year: "numeric"}) + ")"

var animals = []
useEffect(() => {
    if (props?.animals){
        animals = props.animals
    }
    if (animals?.length){
        const names = [];
        var data= [];
        animals.map(animal => {
            const name = animal.name
            if (!(names.includes(name))){
                const nameCount = (animals.filter(item => item.name === animal.name)).length
                names.push(name)
                data.push({"name": name, "count": nameCount})
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
      { animals?.length ? (<MessageBox color="danger" message={"No animals records found!"} place={"tr"}  openDuration={4000} ></MessageBox>
    ): (
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
            colors: primaryColor[1],
            plotOptions: {
                bar: {
                    horizontal: false,
                }
            },
            dataLabels: {
                enabled: false,
            },
            yaxis: {
                title: {
                    text: "Booking Count",
                    style: {
                        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                        fontWeight: "600",
                        color: grayColor[2],
                    },
                },
            },
            xaxis: {
                categories: chartData.map(data => data.name),
            },
            title: {
                text: 'Top 5 Popular Animals',
                style: {
                  fontSize: '16px'
                }
            },
		}}
        type="bar"
        series={[
            {
            name: "Breeds",
            data: chartData.map(data => data.count),
          }
        ]}
        height= {395}
    />
    )} 
    </div>
    )
}