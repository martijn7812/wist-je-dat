export default function WistJeDatApp() {
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function WistJeDatApp() {
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeetje = async () => {
    setLoading(true);
    setSelected(null);

    try {
      const res = await fetch("https://nl.wikipedia.org/api/rest_v1/page/random/summary");
      const data = await res.json();
      setSelected(`Wist je dat ${data.extract.toLowerCase()}`);
    } catch (error) {
      setSelected("Kon geen weetje ophalen 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-yellow-50 to-white">
      <h1 className="text-3xl font-bold mb-6">🧠 Wist Je Dat...?</h1>

      <Card className="w-full max-w-md">
        <CardContent className="p-4 flex flex-col gap-4 items-center">
          <Button onClick={fetchWeetje} disabled={loading}>
            {loading ? "Even zoeken..." : "Geef me een weetje!"}
          </Button>

          {selected && (
            <div className="text-lg font-medium text-center p-4 bg-yellow-200 rounded-xl shadow">
              🤓 {selected}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
}