type StatCardProps = {
  label: string;
  value: number;
};

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-md w-full text-center">
      <h4 className="text-lg font-semibold">{label}</h4>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
