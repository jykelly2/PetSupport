import Chart from 'react-apexcharts'
import React, {useState, useEffect} from 'react';
import { monthNames } from 'utils';
import MessageBox from 'components/MessageBox';
//styles
import {
  primaryColor,
  infoColor,
} from "assets/jss/material-dashboard-react.js";

export default function BookingCountChart(props) {
const dateToday = new Date()
const [category, setCategory] = useState([]);
const [countData, setCountData] = useState([]);
const [revenueData, setRevenueData] = useState([]);
const fileNameFormat = "Booking Count Record - (" + monthNames[dateToday.getMonth()-3].slice(0,3) + " - "  + monthNames[dateToday.getMonth()-1].slice(0,3) + " " + dateToday.getFullYear() + ")"   //new Date().toLocaleString('default', { month: 'long', year: "numeric"})
var bookings = []
useEffect(() => {
    if (props?.bookings){
        bookings = props.bookings
    }
    if (bookings?.length){
        const dates = [];
        const counts = [];
        const revenues = [];
        bookings.map(booking => {
            const date = new Date(booking.date.split('T')[0])
            const formattedDate = monthNames[date.getMonth()].slice(0,3) + " " + date.getDate()
            if (!(dates.includes(formattedDate))){
                const dateBookings = (bookings.filter(item => item.date === booking.date))
                counts.push(dateBookings.length)
                revenues.push(dateBookings.reduce((a, b) => a + b.totalAmount, 0))
                dates.push(formattedDate)
            }
         })
        setCategory(dates)
        setCountData(counts)
        setRevenueData(revenues)
    }
},[]);

return (
      <div>
      {bookings?.length ? ( <MessageBox color="danger" message={"Booking records not found!"} place={"tr"}  openDuration={4000} ></MessageBox>
      ) : (
          	<Chart
				      options={{
                    chart: {
                        toolbar: {
                            show: true,
                            offsetX: -25,
                            tools: {
                              selection: false,
                              zoom: false,
                              zoomin: false,
                              zoomout: false,
                              pan: false,
                              reset: false,
                            },
                            export: {
                              csv: {
                                filename: fileNameFormat,
                                columnDelimiter: ',',
                                headerCategory: 'Dates',
                                headerValue: 'value',
                              },
                              svg: {
                                filename: fileNameFormat,
                              },
                              png: {
                                filename: fileNameFormat,
                              }
                            },
                        },
                    },
                   colors: [ infoColor[2],primaryColor[1]],
                    fill: {
                      opacity: [0.85, 0.25, 1],
                      gradient: {
                        inverseColors: false,
                        shade: 'light',
                        type: "vertical",
                        opacityFrom: 0.85,
                        opacityTo: 0.55,
                        stops: [0, 100, 100, 100]
                      }
                    },
                    dataLabels: {
                        enabled: false,
                        // enabled: true,
                        // enabledOnSeries: [1]
                    },
                    title: {
                        text: 'Bookings Data Last 3 Months',
                        align: 'left',
                        style: {
                          fontSize: '16px',
                        },
                    },
                    stroke: {
                      width: [4, 4],
                      curve: 'smooth'
                    },
                    plotOptions: {
                      bar: {
                        columnWidth: '50%'
                      }
                    },
                    legend: {
                      show:true,
                      position: 'top',
                      horizontalAlign: 'left',
                      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                      fontWeight: "450",
                      fontSize: "13px",
                      offsetX: -15,
                      offsetY: -5,
                      itemMargin: {
                        vertical: 3
                      },
                      markers: {
                        width: 9,
                        height: 9,
                      },
                    },
                    xaxis: {
                        categories:category,
                    },
                    yaxis: [
                      {
                        min: 0,
                        labels: {
                            formatter: function(val, index) {
                              return val.toFixed(0);
                            },
                        },
                      },
                      {
                        opposite: true,
                        forceNiceScale: true,
                        min: 0,
                        labels: {
                            formatter: function(val, index) {
                              return "$" + val.toFixed(0);
                            },
                        },
                      },
                    ],
                }}
				series={[
          {
          name: "Booking Count",
          data: countData,
          type: 'line',
        },{
          name: 'Total Revenue',
          type: 'area',
          data: revenueData,
        },
        ]}
				type="line"
				height= {350}
			/>
      )}
    </div>
    )
  }