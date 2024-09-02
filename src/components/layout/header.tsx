export interface HeaderProps {}

export function Header({}: HeaderProps) {
    return (
        <header className="w-full">
            <h1 className="font-bold text-center border border-b-black text-3xl py-4"></h1>
        </header>
    );
}
