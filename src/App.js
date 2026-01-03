import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import './App.css';
import HomePage from './Clients/Screens/HomePage';
import AboutPage from './Clients/Screens/AboutPage';
import PortfolioPage from './Clients/Screens/PortfolioPage';
import PortfolioDetailsPage from './Clients/Screens/PortfolioDetailsPage';
import ContactPage from './Clients/Screens/ContactPage';
import PageNotFound from './Clients/Screens/PageNotFound';
import AdminLoginPage from './Admin/Screens/AdminLoginPage';
import AdminHomePage from './Admin/Screens/AdminHomePage';
import AdminAboutPage from './Admin/Screens/AdminAboutPage';
import AdminPortfolioPage from './Admin/Screens/AdminPortfolioPage';
import AdminContactPage from './Admin/Screens/AdminContactPage';
import AdminSettingPage from './Admin/Screens/AdminSettingPage';
import {
  showloading,
  setVideoBannerData,
  setQuoteData,
  setContactData,
  setServiceData,
  setAboutData,
  setClientData,
  setTeamData,
  setPortfolioData,
  setPortfolioLengthData,
  hiddenloading,
  ReloadData
} from './API/Server/rootSlice'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {URL} from './Url/Url'
import LoadingPage from './Clients/Screens/LoadingPage';
import MMEPage from './Clients/Screens/MMEPage';

function App() {

  var hours = 12
  var now  = new Date().getTime()
  var setupTime = localStorage.getItem('setupTime')

  const today = new Date();
  const year = today.getFullYear();

  if(setupTime === null){
    localStorage.setItem('setupTime',now)
  }
  else{
    if(now - setupTime > hours*60*60*1000){
      localStorage.clear()
      localStorage.setItem('setupTime',now)
    }
  }

  const {
    isLoading,
    videoBannerData,
    quoteData,
    contactData,
    serviceData,
    aboutData,
    clientData,
    portfolioData,
    portfolioLengthData,
    teamData,
    reloadData
  } = useSelector((state) => state.root)

  const dispatch = useDispatch()

  // Banner Video For Home Page

  const getBannerVideo = async () => {

    try{
      dispatch(showloading())
      const responce = await axios.get(`${URL}/api/NextStudio/video-banner`)
      dispatch(setVideoBannerData(responce.data.video))
      dispatch(ReloadData(false))
      dispatch(hiddenloading())
    }catch(err){
      dispatch(hiddenloading())
    }
  }

  useEffect(() => {
    if(!videoBannerData){
      getBannerVideo()
    }
  },[videoBannerData])

  // get all slogan data

  const getSlonganData = async () =>{
    try{
      dispatch(showloading())
      const responce = await axios.get(`${URL}/api/NextStudio/quote`)
      dispatch(setQuoteData(responce.data.quote))
      dispatch(ReloadData(false))
      dispatch(hiddenloading())
    }catch(err){
      dispatch(hiddenloading())
    }
  }

  useEffect(() => {
    if(!quoteData){
      getSlonganData()
    }
  },[quoteData])

  //get all contact Data

  const getContactData = async () => {
    try{
      dispatch(showloading())
      const responce = await axios.get(`${URL}/api/NextStudio/contact`)
      dispatch(setContactData(responce.data.contact))
      dispatch(ReloadData(false))
      dispatch(hiddenloading())
    }catch(err){
      dispatch(hiddenloading())
    }
  }

  useEffect(() => {
    if(!contactData){
      getContactData()
    }
  },[contactData])

  // get all Service Data 

  const getServiceData = async () => {
    try{
      dispatch(showloading())
      const responce = await axios.get(`${URL}/api/NextStudio/service`)
      dispatch(setServiceData(responce.data.service))
      dispatch(ReloadData(false))
      dispatch(hiddenloading())
    }catch(err){
      dispatch(hiddenloading())
    }
  }

  useEffect(() => {
    if(!serviceData){
      getServiceData()
    }
  },[serviceData])

  // get all About Data

  const getAboutData= async () => {
    try{
      dispatch(showloading())
      const responce = await axios.get(`${URL}/api/NextStudio/about`)
      dispatch(setAboutData(responce.data.about))
      dispatch(ReloadData(false))
      dispatch(hiddenloading())
    }catch(err){
      dispatch(hiddenloading())
    }
  }

  useEffect(() => {
    if(!aboutData){
      getAboutData()
    }
  },[aboutData])

  const getClientData = async () => {
    try{
      dispatch(showloading())
      const responce = await axios.get(`${URL}/api/NextStudio/client`)
      dispatch(setClientData(responce.data.client))
      dispatch(ReloadData(false))
      dispatch(hiddenloading())
    }catch(err){
      dispatch(hiddenloading())
    }
  }

  useEffect(() => {
    if(!clientData){
      getClientData()
    }
  },[clientData])

  const getTeamData = async () => {
    try{
      dispatch(hiddenloading())
      const responce = await axios.get(`${URL}/api/NextStudio/team`)
      dispatch(setTeamData(responce.data.team))
      dispatch(ReloadData(false))
      dispatch(hiddenloading())
    }catch(err){
      dispatch(hiddenloading())
    }
  }

  useEffect(() => {
    if(!teamData){
      getTeamData()
    }
  },[teamData])

  // get all portfolio data

  const getPortfolioData = async () => {
    try{
      dispatch(hiddenloading())
      const responce = await axios.get(`${URL}/api/NextStudio/portfolio`)
      dispatch(setPortfolioData(responce.data.portfolios))
      dispatch(ReloadData(false))
      dispatch(hiddenloading())
    }catch(err){
      dispatch(hiddenloading())
    }
  }
  
  useEffect(() => {
    if(!portfolioData){
      getPortfolioData()
    }
  },[portfolioData])

  // get all portfolio data length

  const getPortfolioLengthData = async () => {
    try{
      dispatch(hiddenloading())
      const responce = await axios.get(`${URL}/api/NextStudio/portfolio/length`)
      dispatch(setPortfolioLengthData(responce.data.portfolios))
      dispatch(ReloadData(false))
      dispatch(hiddenloading())
    }catch(err){
      dispatch(hiddenloading())
    }
  }

  useEffect(() => {
    if(!portfolioLengthData){
      getPortfolioLengthData()
    }
  },[portfolioLengthData])

  //get all data when reload

  useEffect(() => {
    if(reloadData){
      getBannerVideo()
      getSlonganData()
      getContactData()
      getServiceData()
      getAboutData()
      getClientData()
      getTeamData()
      getPortfolioData()
      getPortfolioLengthData()
    }
  },[reloadData])

  return (
    <Router>
      {isLoading ? <LoadingPage/> : null}
      <div className="App">
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route path='about' element={<AboutPage/>}/>
          <Route path='portfolios' element={<PortfolioPage/>}/>
          <Route path='portfolios/:id' element={<PortfolioDetailsPage/>}/>
          <Route path='contact' element={<ContactPage/>}/>
          <Route path='mme' element={<MMEPage/>}/>
          <Route path='administrator' element={<AdminLoginPage/>}/>
          <Route path='admindashboard/home' element={<AdminHomePage/>}/>
          <Route path='admindashboard/about' element={<AdminAboutPage/>}/>
          <Route path='admindashboard/portfolios' element={<AdminPortfolioPage/>}/>
          <Route path='admindashboard/contact' element={<AdminContactPage/>}/>
          <Route path='admindashboard/setting' element={<AdminSettingPage/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
