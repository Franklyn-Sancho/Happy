import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.css';
import mapIcon from '../utils/mapIcon'
import api from '../services/api';


interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    
    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, []);


    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato do mapa</h2>
                    <p>Muitas crianças estão esperando sua visita</p>
                </header>

                <footer>
                    <strong>Rio de Janeiro</strong>
                    <span>Rio de Janeiro</span>
                </footer>
            </aside>

            <Map 
            center={[-22.9132525,-43.7261833]} 
            zoom={10}
            style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                {orphanages.map(orphanage => {
                    return (
                <Marker 
                key={orphanage.id} 
                icon={mapIcon}
                position={[orphanage.latitude, orphanage.longitude]}
                >


                <Popup closeButton={false} minWidth={248} maxHeight={240} className="map-popup">
                    {orphanage.name}
                    <Link to={`/orphanages/${orphanage.id}`}>
                        <FiArrowRight size={20} color="#FFF" />
                    </Link>
                </Popup>
                </Marker>
                    )
                })}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}

export default OrphanagesMap;