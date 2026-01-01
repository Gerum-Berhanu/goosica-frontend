import { Card } from "./CardSet";
import { generateId } from "./devToolkit";

export function SearchResult() {
    return (
      <div className="flex flex-wrap justify-center gap-8 px-2 md:px-8 py-8">
        {[...Array(7)].map((_) => (
          <Card
            key={generateId()}
            title="Zenith"
            uploader="Kavinsky"
            imagePath="./zenith-cover.jpg"
          />
        ))}
      </div>
    );
}