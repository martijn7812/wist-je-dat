import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Weetje {
  title: string;
  extract: string;
  url: string;
}

function formatWeetje(text: string) {
  if (!text) return "";
  // Eerste letter hoofdletter, rest ongewijzigd
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function WistJeDatApp() {
  const [selected, setSelected] = useState<Weetje | null>(null);
  const [history, setHistory] = useState<Weetje[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWeetje = async () => {
    setLoading(true);
    setSelected(null);

    try {
      const res = await fetch(
        "https://nl.wikipedia.org/api/rest_v1/page/random/summary"
      );
      const data = await res.json();

      const weetje: Weetje = {
        title: data.title,
        extract: data.extract,
        url: data.content_urls.desktop.page,
      };

      setSelected(weetje);
      setHistory((prev) => [weetje, ...prev]);
    } catch (error) {
      setSelected({
        title: "Fout",
        extract: "Kon geen weetje ophalen 😢",
        url: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-yellow-50 to-white">
      <h1 className="text-3xl font-bold mb-6">🧠 Wist Je Dat...?</h1>

      <Card className="w-full max-w-md mb-6">
        <CardContent className="p-4 flex flex-col gap-4 items-center">
          <Button onClick={fetchWeetje} disabled={loading}>
            {loading ? "Even zoeken..." : "Geef me een weetje!"}
          </Button>

          {selected && (
            <div className="text-lg text-center p-4 bg-yellow-200 rounded-xl shadow">
              🤓 {formatWeetje(selected.extract)} <br />
              {selected.url && (
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline mt-2 inline-block"
                >
                  Lees meer op Wikipedia
                </a>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {history.length > 1 && (
        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">📜 Vorige weetjes</h2>
          <ul className="space-y-2">
            {history.slice(1).map((item, index) => (
              <li key={index} className="bg-white p-3 rounded shadow">
                <span className="block text-sm">{formatWeetje(item.extract)}</span>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline mt-1 inline-block"
                  >
                    Bekijk artikel
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}