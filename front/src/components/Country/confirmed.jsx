import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {Line} from 'react-chartjs-2';
import {Col,Row,Card} from 'react-bootstrap';
const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};
function Confirmed () {
   
    let {name} =useParams()
    console.log(name)
    const [last,setLast]=useState()
    const [dates,setDate]=useState()
    const [confirmed,setConfirmed]=useState()
    const [today,settoday]= useState()


    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/${name}/`)
        .then(response => {
           setLast(response.data.last_day_values.Confirmed)
           setConfirmed(response.data.confirmed)
           setDate(response.data.Date)
           settoday(response.data.today)

           })
      },[] ) 
      const lineChart = (
      
          <Line
            data={{
              labels: dates ,
              datasets: [{
                data: confirmed ,
                label: 'Cumulutive Confirmed Over Time ',
                borderColor: '#14B5D0',
                backgroundColor: '#DDEBF7',
                fill: true ,
              }, 
                
              ],
            }}
          />
        
      );
      return (
        <div>
            <Row style={{margin :'5%'}}>
                <Col sm={9}>{lineChart} </Col>
                <Col style={{marginTop :"2%"}} sm={3}>
                    <Card bg ='dark'style={{height:'90%'}} text='light'>
                   
                        <Card.Body>
                          <Card.Title style={{textAlign:'center',marginTop:'3%',fontSize:'36px'}} > Total Confirmed </Card.Title>
                          <Card.Text  >
                            
                             <h1 style={{textAlign :'center',fontSize:'48px',marginTop:'27%'}}>{rounded(last)}</h1>
                               <br/>
                               <br/>
                               <br/>
                                 <h4 style={{marginTop:'5%'}}>latest update : {today}</h4>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
            </Row>
        </div>
    );
}


export default Confirmed;