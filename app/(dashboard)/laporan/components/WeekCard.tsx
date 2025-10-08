import TruckIcon from "./TruckIcon";

const WeekCard = ({ label }: { label: string }) => (
  <div className="border rounded-md p-4 flex flex-col gap-2 cursor-pointer hover:shadow-lg transition-shadow">
    <div className="flex items-center gap-2">
      <div className="bg-blue-100 p-2 rounded">
        <TruckIcon />
      </div>
      <div className="ml-auto text-blue-600 text-sm font-medium hover:underline">
        Lihat &gt;&gt;
      </div>
    </div>
    <div className="text-gray-500 text-sm">Laporan Mingguan</div>
    <div className="font-bold text-gray-900">{label}</div>
  </div>
);

export default WeekCard;
