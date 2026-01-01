import { Card } from "../ui/Card";

interface CardSetProps {
  title: string;
}

export function CardSet({ title }: CardSetProps) {
    const songList = [
        {"id": "A101", "title": "Beat It", "uploader": "Michael Jackson", "imagePath": "./beat-it-thumbnail.jpg"},
        {"id": "A102", "title": "Thriller", "uploader": "Michael Jackson", "imagePath": "./thriller-thumbnail.jpg"},
        {"id": "A103", "title": "Don't Stop Till You Get Enough", "uploader": "Michael Jackson", "imagePath": "./off-the-wall-album-thumbnail.jpg"},
        {"id": "A104", "title": "Lonely Night", "uploader": "The Weeknd", "imagePath": "./starboy-album-thumbnail.jpg"},
        {"id": "A105", "title": "Starboy", "uploader": "The Weeknd", "imagePath": "./starboy-album-thumbnail.jpg"},
        {"id": "A106", "title": "Love to Lay", "uploader": "The Weeknd", "imagePath": "./starboy-album-thumbnail.jpg"},
        {"id": "A107", "title": "Love to Lay", "uploader": "The Weeknd", "imagePath": "./starboy-album-thumbnail.jpg"},
        {"id": "A108", "title": "Love to Lay", "uploader": "The Weeknd", "imagePath": "./starboy-album-thumbnail.jpg"},
    ];

  return (
    <div className="flex flex-col gap-4">
      {/* ROW 1 - Title */}
      <div>
        <span className="text-3xl text-shadow-md/20">{title}</span>
      </div>

      {/* ROW 2 - Card set */}
      <div className="flex gap-4 overflow-x-auto pb-2">
      {songList.map(item =>
          <Card
            key={item["id"]}
            title={item["title"]}
            uploader={item["uploader"]}
            imagePath={item["imagePath"]}
          />
        )}
      </div>
    </div>
  );
}

export function CardSetContainer() {
  const CardSetTitles = ["Today's Pick", "Queue", "Favorites", "Downloads"];

  return (
    <div className="flex flex-col gap-8 px-2 md:px-8 py-8">
      {CardSetTitles.map((item, index) => (
        <CardSet key={`${index}-${item}`} title={item} />
      ))}
    </div>
  );
}