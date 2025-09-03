export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-10">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 max-w-lg w-full border border-gray-700">
        <h1 className="text-4xl font-gothic text-red-500 mb-6">
          𝕲𝖔𝖙𝖍𝖎𝖈 𝕾𝖙𝖞𝖑𝖊 🕯️
        </h1>
        <p className="text-gray-300 font-gothic text-xl mb-6">
          Этот текст написан готическим шрифтом, а фон — мрачный градиент.
        </p>

        <button className="w-full bg-red-700 hover:bg-red-800 text-white font-gothic py-3 px-4 rounded-xl transition duration-300">
          Призвать силу ⚔️
        </button>
      </div>
    </main>
  );
}
