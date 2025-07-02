// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-blue-500 text-center py-4 mt-auto text-sm">
      © {new Date().getFullYear()} Tender Platform. All rights reserved.
    </footer>
  );
}
