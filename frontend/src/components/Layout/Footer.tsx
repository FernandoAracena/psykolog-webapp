export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-12 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm gap-4">
        {/* <div className="flex gap-6">
          <a href="/privacy" className="hover:text-secondary">Personvern & Vilkår</a>
          <span>HPR-nummer: 123456</span>
          <a href="/faq" className="hover:text-secondary">FAQ</a>
        </div> */}
        <div>
          &copy; {new Date().getFullYear()} Miriam Heen Skotland
        </div>
      </div>
    </footer>
  );
}
