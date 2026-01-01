import { Card } from "../ui/Card";

export function SearchResult() {
    return (
      <div className="flex flex-wrap justify-center gap-8 px-2 md:px-8 py-8">
        {[...Array(7)].map((_, index) => (
          <Card
            key={index}
            title="Zenith"
            uploader="Kavinsky"
            imagePath="./zenith-cover.jpg"
          />
        ))}
      </div>
    );
}