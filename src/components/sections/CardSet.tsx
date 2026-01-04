import { Card } from "../ui/Card";
import { setData } from "../utils/devToolkit";

interface CardSetData {
  type: string,
  heading: string,
  songs: Array<{
    id: string,
    title: string,
    uploader: string,
    imagePath: string
  }>
}

interface CardSetProps {
  data: CardSetData;
}

export function CardSet({ data }: CardSetProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* ROW 1 - Title */}
      <div className="w-full">
        <span className="text-3xl text-shadow-md/20">{data["type"]}</span>
      </div>

      {/* ROW 2 - Card set */}
      <div className="flex gap-4 overflow-x-auto pb-2">
      {data["songs"].map(item =>
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
  return (
    <div className="flex flex-col gap-8 px-2 md:px-8 py-8">
      {setData.map((item, index) => (
        <CardSet key={`${index}-${item["type"]}`} data={item} />
      ))}
    </div>
  );
}