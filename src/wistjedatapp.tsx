import { useState } from "react";

export default function WistJeDatApp() {
  const [weetje, setWeetje] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeetje = async () => {
    setLoading(true);
    setWeetje(null);
    try {
      const res = await fetch(
        "https://nl.wikipedia.org/api/rest_v1/page/random/summary"
      );
      const data = await res.json();
      // Eenvoudige inkorting, hoofdletters blijven staan
      const eersteZin = data.extract.split(". ")[0] + ".";
      setWeetje("Wist je dat " + eersteZin);
    } catch {
      setWeetje("Kon geen weetje ophalen 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-yellow-50 rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold mb-6">🧠 Wist Je Dat...?</h1>
      <button
        onClick={fetchWeetje}
        disabled={loading}
        className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-200 text-white font-semibold py-2 px-4 rounded mb-6 transition"
      >
        {loading ? "Even zoeken..." : "Geef me een weetje!"}
      </button>

      {weetje && (
        <p className="bg-yellow-200 p-4 rounded shadow text-lg">{weetje}</p>
      )}
    </div>
  );
}