import { useNavigate } from 'react-router';

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full py-3 px-4 border-b border-gray-200 bg-white flex items-center justify-between">
      <div className="relative flex items-center gap-5">
        <button
          className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img src="./logo.svg" className="w-20" />
        </button>
      </div>
    </header>
  );
}
