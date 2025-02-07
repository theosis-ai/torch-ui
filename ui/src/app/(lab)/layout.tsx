import "./lab.css";

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div >
        {children}
      </div>
  );
}
