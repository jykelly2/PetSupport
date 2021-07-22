import Chart from 'react-apexcharts'
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {listRecentClients} from '../../actions/ClientActions';
import LoadingBox from 'components/LoadingBox';
import MessageBox from 'components/MessageBox';

export default function ClientCountChart(props) {
const clientRecentList = useSelector((state) => state.clientRecentList);
const { loading, error,role} = clientRecentList;
var {clientsPrevMonth : clients} = clientRecentList

const dateToday = new Date()

const [category, setCategory] = useState([]);
const [data, setData] = useState([]);
const fileNameFormat = "New Clients Count Record - (" + dateToday.toLocaleString('default', { month: 'long', year: "numeric"}) + ")"
const dispatch = useDispatch();

useEffect(() => {
    if (props?.clients){
        clients = props.clients
    }
    if (clients?.length){
        const dates = [];
        const count = [];
        clients.map(client => {
            const date = client.createdAt.split('T')[0]
            if (!(dates.includes(date))){
                const dayCount = (clients.filter(item => item.createdAt === client.createdAt)).length
                count.push(dayCount)
                dates.push(date)
            }
         })
        setCategory(dates)
        setData(count)
    }else{
        dispatch(listRecentClients());
    }
},[dispatch, clients]);

return (
    <div>
    {loading ? (<LoadingBox></LoadingBox>
    ) : error ? (
    <MessageBox color="danger" message={error} place={"tr"}  openDuration={4000} ></MessageBox>
    ) : ( 
        <Chart
        options={{
            chart: {
                toolbar: {
                    show: true,
                    offsetX: 0,
                    offsetY: 0,
                    tools: {
                      download: true,
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
                    autoSelected: 'zoom' 
                  },
            },
            colors: ["#ffa726"],
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.9,
                    stops: [0, 80, 100]
                }
            },
            dataLabels: {
                enabled: true,
            },
            title: {
                text: 'New Clients',
                align: 'left',
                style: {
                    fontSize: '16px',
                }
            },
            stroke: {
                curve: 'smooth',
                width: 3,
            },
            xaxis: {
                categories:category,
            },
            yaxis: {
                min: 0,
                labels: {
                    formatter: function(val, index) {
                      return val.toFixed(0);
                    }
                  },
                title: {
                    text: "Client Count",
                },
            },
        }}
        series={[{
            name: "Client Count",
            data: data
        }]}
        type="area"
        height= {300}
    />
    )}
    </div>
    )
}
