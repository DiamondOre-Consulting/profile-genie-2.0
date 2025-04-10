import React from 'react'
import { useParams } from 'react-router-dom';
import MainPortfoliotemp1 from './MainPortfoliotemp1';
import MainPortfoliotemp2 from './MainPortfoliotemp2';
import MainPortfoliotemp3 from './MainPortfoliotemp3';


const MainPortofio = () => {
    const { uniqueUserName, portfolioId } = useParams();
    console.log(portfolioId , uniqueUserName )
  return (
    <>
    {portfolioId === '3' ? (
      <MainPortfoliotemp2 uniqueUserName={uniqueUserName} />
    )
    : portfolioId === "4" ? (
      <MainPortfoliotemp3 uniqueUserName = {uniqueUserName}/>
    ) 
    : portfolioId === '1' ? (
      <MainPortfoliotemp1 uniqueUserName={uniqueUserName} />
    ) : (
      <div>Invalid portfolio ID</div>
    )}
  </>
  )
}

export default MainPortofio