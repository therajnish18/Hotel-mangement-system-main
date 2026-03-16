import { useEffect, useState } from "react";
import { Parcel } from "@/types/index";
import ParcelCard from "@/components/parcels/ParcelCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const initialParcels: Parcel[] = [];

export default function Parcels() {
  const [parcels, setParcels] = useState<Parcel[]>(() => {
    const savedParcels = localStorage.getItem("parcels");
    return savedParcels ? JSON.parse(savedParcels) : initialParcels;
  });
  const [newReceipient, setNewRecipient] = useState("");
  useEffect(() => {
    localStorage.setItem("parcels", JSON.stringify(parcels));
  }, [parcels]);

  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  console.log(selectedParcel);

  const handleAddParcel = () => {
    //Also check if the newRecipient is unique

    let flag = parcels.some((parcel) => parcel.recipient === newReceipient);

    if (newReceipient.length > 0 && !flag) {
      setParcels([
        ...parcels,
        {
          id: parcels.length + 1,
          recipient: newReceipient,
          order: [],
        },
      ]);
      setNewRecipient("");
    }
  };
  return (
    <div className="space-y-6">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Parcels</h1>
        <p className="text-muted-foreground mt-1">Manage your parcels</p>
      </div>
      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200">
        {/* Create a parcel for recepent with empty order array */}
        <form
          className="flex max-w-3xl mr-auto gap-3"
          onSubmit={handleAddParcel}
        >
          <Input
            type="text"
            placeholder="Customer Name"
            className="w-full"
            value={newReceipient}
            autoFocus
            onChange={(e) => setNewRecipient(e.target.value)}
          />
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 font-semibold">Add Parcel</Button>
        </form>
        <div className="grid gap-4 md:grid-cols-4 p-2 mt-4">
          {parcels.map((parcel) => (
            <ParcelCard
              key={parcel.id}
              parcel={parcel}
              parcels={parcels}
              setSelectedParcel={setSelectedParcel}
              setParcels={setParcels}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
