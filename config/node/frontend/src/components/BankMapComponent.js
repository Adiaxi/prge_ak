import React, {useRef, useEffect} from 'react';
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import OSM from 'ol/source/OSM';
import {useGeographic} from 'ol/proj';
import "ol/ol.css";

import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Style, Circle, Fill, Stroke, Text} from 'ol/style';

function BankMapComponent(props) {
    const mapRef = useRef(null);


    const vectorSourceRef = useRef(new VectorSource());

    useGeographic();

    useEffect(() => {
        if (!mapRef.current) return;

        const markerLayer = new VectorLayer({
            source: vectorSourceRef.current,
            style: (feature) => {
                const labelText = feature.get('name');

                return new Style({
                    image: new Circle({
                        radius: 8,
                        fill: new Fill({color: '#7B61FF'}),
                        stroke: new Stroke({color: 'white', width: 2})
                    }),
                    text: new Text({
                        text: labelText,
                        font: 'bold 14px Arial',
                        fill: new Fill({ color: '#000' }),
                        stroke: new Stroke({ color: '#fff', width: 3 }),
                        offsetY: -20,
                    })
                });
            }
        });

        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                markerLayer
            ],
            view: new View({
                center: [19, 52],
                zoom: 6,
            })
        });

        setTimeout(() => {
            map.updateSize();
        }, 100);

        return () => map.setTarget(null);
    }, []);

    useEffect(() => {
        const source = vectorSourceRef.current;
        if (!source) return;

        source.clear();

        if (props.banks && props.banks.length > 0) {
            console.log("🟢 Otrzymano listę banków:", props.banks);

            props.banks.forEach(bank => {

                const lon = parseFloat(bank.longitude);
                const lat = parseFloat(bank.latitude);

                if (!isNaN(lon) && !isNaN(lat)) {
                    console.log(`📍 Rysuję marker: ${bank.name} [${lon}, ${lat}]`);

                    const marker = new Feature({
                        geometry: new Point([lon, lat]),
                        name: bank.name
                    });
                    source.addFeature(marker);
                } else {
                    console.warn(`⚠️ Błędne współrzędne dla banku: ${bank.name}`, bank);
                }
            });
        } else {
            console.log("⚪ Lista banków jest pusta lub null.");
        }
    }, [props.banks]);

    return (
        <div
            ref={mapRef}
            className='mapComponent'
            style={{ width: '100%', height: '100%', minHeight: '100%' }}
        ></div>
    );
}

export default BankMapComponent;