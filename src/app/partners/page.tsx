import Card from "@/components/partners/card";
export default async function Partners() {
  const partners = [
    {
      _id: "1",
      name: "Radio Guerilla",
      imageUrl:
        "https://res.cloudinary.com/dud0oiww7/image/upload/v1769358573/Radio_Guerrilla_logo_ns8ddv.png",
      role: "general",
    },
    {
      _id: "2",
      name: "SoundWave FM",
      imageUrl:
        "https://res.cloudinary.com/dud0oiww7/image/upload/v1769358573/Radio_Guerrilla_logo_ns8ddv.png",
      role: "general",
    },
    {
      _id: "3",
      name: "Urban Beats",
      imageUrl:
        "https://res.cloudinary.com/dud0oiww7/image/upload/v1769358573/Radio_Guerrilla_logo_ns8ddv.png",
      role: "general",
    },
    {
      _id: "4",
      name: "Echo Network",
      imageUrl:
        "https://res.cloudinary.com/dud0oiww7/image/upload/v1769358573/Radio_Guerrilla_logo_ns8ddv.png",
      role: "general",
    },
    {
      _id: "5",
      name: "Pulse Media",
      imageUrl:
        "https://res.cloudinary.com/dud0oiww7/image/upload/v1769358573/Radio_Guerrilla_logo_ns8ddv.png",
      role: "general",
    },
    {
      _id: "6",
      name: "Frequency Hub",
      imageUrl:
        "https://res.cloudinary.com/dud0oiww7/image/upload/v1769358573/Radio_Guerrilla_logo_ns8ddv.png",
      role: "general",
    },
    {
      _id: "7",
      name: "Signal Collective",
      imageUrl:
        "https://res.cloudinary.com/dud0oiww7/image/upload/v1769358573/Radio_Guerrilla_logo_ns8ddv.png",
      role: "general",
    },
    {
      _id: "8",
      name: "Primaria Sectorului 3",
      imageUrl:
        "https://res.cloudinary.com/dud0oiww7/image/upload/v1769358573/Radio_Guerrilla_logo_ns8ddv.png",
      role: "organizer",
    },
    {
      _id: "9",
      name: "Signal Collective",
      imageUrl:
        "https://res.cloudinary.com/dud0oiww7/image/upload/v1769358573/Radio_Guerrilla_logo_ns8ddv.png",
      role: "general",
    },
  ];

  const organizer = partners.find((p) => p.role === "organizer");
  const general = partners.filter((p) => p.role === "general");

  return (
    <main>
      <div className="m-15">
        <div className="m-10 p-2">
          <h2 className="text-4xl">Organizator</h2>
          <div className="grid gap-2 mt-10 justify-center">
            {organizer && (
              <Card name={organizer.name} imageUrl={organizer.imageUrl} />
            )}
          </div>
        </div>
        <div className="m-10 p-2 mt-15">
          <h2 className="text-4xl">Parteneri generali</h2>
          <div className="grid grid-cols-4 gap-6 mt-10 justify-center">
            {general?.map((partner) => (
              <Card
                key={partner._id}
                name={partner.name}
                imageUrl={partner.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
