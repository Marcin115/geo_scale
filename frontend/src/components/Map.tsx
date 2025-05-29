"use client";
import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";

type Place = {
  id: number;
  name: string;
  lat: number;
  lon: number;
};

export default function OLMap({ places = [] }: { places?: Place[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapRef.current || !Array.isArray(places)) return;

    const features = places?.map((place) => {
      if (!place) return null;
      return new Feature({
        geometry: new Point(fromLonLat([place.lon, place.lat])),
        name: place.name,
      });
    }).filter(Boolean);

    const vectorLayer = new VectorLayer({
      source: new VectorSource({ features }),
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([21, 52]),
        zoom: 6,
      }),
    });

    return () => map.setTarget(undefined);
  }, [isClient, places]);

  return (
    <div ref={mapRef} className="w-full h-screen" />
  );
}
