import React, { useEffect, useState } from 'react';
import logoKaleka from './assets/logo_kuning_kaleka.png';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import kalekaCopyright from './assets/kaleka-copyright.png';

function App() {
  const [apiData, setApiData] = useState(null);

  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);
  const handleHamburgerClick = () => {
    setIsHamburgerClicked(!isHamburgerClicked);
  };


  useEffect(() => {
    fetch('https://run.mocky.io/v3/07e88d94-b1de-4e13-89c3-1851cc16019b')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setApiData(data.data);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }, []);
  return (
    <div>
      <div className="bg-black w-full">
        <div className="flex items-center justify-between">
          <img className="h-[67px] my-5 ml-5 mobile:h-[50px]" src={logoKaleka} alt="" />
          <div className="mobile:hidden mr-[287px] tablet:ml-[100px]">
            <ul className="flex gap-11 tablet:w-[300px]">
              <li className="text-[#F8BE1A] uppercase text-xl"><a href="#" className="hover:border-b">Beranda</a></li>
              <li className="text-[#F8BE1A] uppercase text-xl"><a href="#" className='hover:border-b'>Tentang Kami</a></li>
            </ul>
          </div>
          {/* humburger */}
          <div  className="hidden mobile:block mobile:ml-[140px]" onClick={handleHamburgerClick}>
            <div className="text-white font-bold text-xl">
              <div className="w-6 h-1 bg-white mb-1"></div>
              <div className="w-6 h-1 bg-white mb-1"></div>
              <div className="w-6 h-1 bg-white"></div>
            </div>
          </div>
          {/* endhumburger */}
          {isHamburgerClicked ?
            (
              <div className='bg-black text-[#F8BE1A] font-bold w-full top-[85px] absolute flex flex-col gap-3 pb-8'>
                <div className='ml-5'><a href="#">Beranda</a></div>
                <div className='ml-5'><a href="#">Tentang Kami</a></div>
              </div>
            ) : ('')
          }
          <div className="bg-black"></div>
        </div>
        <div>
          <img className="w-full" src={kalekaCopyright} alt="" />
        </div>
      </div>
      <div className="pt-[64px] pb-[83px] flex justify-center mobile:px-[20px] mobile:pt-[30px] mobile:pb-0 tablet:px-[40px]">
            <MapContainer center={[0.469260, 114.387484]} zoom={5} scrollWheelZoom={false} className='h-[477px] w-[828px]'>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {apiData && apiData.map((item, index) => {
                  const latitude = item.coordinates[1];
                  const longitude = item.coordinates[0];
                  return (
                    <CircleMarker radius={14} weight={2} key={index} center={[latitude, longitude]}>
                      <Popup>
                        <span className="uppercase font-bold">
                          <a href="#" style={{ color: '#e53e3e' }}>
                            Lihat Detail
                          </a>
                        </span>
                      </Popup>
                    </CircleMarker>
                  ); 
                })}
            </MapContainer>
        </div>
    </div>
    
  );
}

export default App;
