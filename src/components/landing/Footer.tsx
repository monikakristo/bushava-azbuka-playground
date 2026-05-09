export function Footer() {
  return (
    <footer className="bg-grape/10 px-6 py-10 text-center">
      <p className="font-display text-2xl text-grape">Бушава Азбука</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Направено со љубов за најмалите истражувачи на македонскиот јазик.
      </p>
      <div className="mt-4 flex justify-center gap-3 text-sm">
        <button className="min-h-11 rounded-full bg-white px-5 py-2 font-bold text-foreground shadow-sm">
          Македонски
        </button>
        <button className="min-h-11 rounded-full px-5 py-2 font-bold text-muted-foreground hover:text-foreground">
          English
        </button>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Бушава Азбука · Демо верзија
      </p>
    </footer>
  );
}
