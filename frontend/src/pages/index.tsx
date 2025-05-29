import dynamic from "next/dynamic";
import axios from "axios";
import { useEffect, useState } from "react";

const OLMap = dynamic(() => import("../components/Map"), { ssr: false });

type Place = {
  id: number;
  name: string;
  lat: number;
  lon: number;
};

export default function Home() {
  const [places, setPlaces] = useState<Place[] | null>(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/places`)
      .then((res) => setPlaces(res.data))
      .catch((err) => {
        console.error("Błąd ładowania places:", err);
        setPlaces([]);
      });
  }, []);

  if (!places) {
    return <div className="p-4">Ładowanie mapy...</div>;
  }

  return (
    <>
      <OLMap places={places} />
      <div className="fixed top-4 left-4 bg-white p-2 rounded shadow text-sm z-10 max-w-sm">
        <h2 className="font-bold mb-2">Places</h2>
        <pre>{JSON.stringify(places, null, 2)}</pre>
      </div>
    </>
  );
}
