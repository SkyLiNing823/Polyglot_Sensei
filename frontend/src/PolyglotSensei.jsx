import { useState } from "react";
import Card from "./Card"

export default function PolyglotSensei() {
    const [text, setText] = useState("");
    const [translation, setTranslation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [targetLang, setTargetLang] = useState("zh-TW(用繁體中文回應)"); // default
    const [history, setHistory] = useState([]);

    const handleTranslate = async () => {
        setIsLoading(true);
        setTranslation(""); 
        try {
            const res = await fetch("http://127.0.0.1:8000/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text, target_lang: targetLang }),
            });
            const data = await res.json();
            setTranslation(data.translation);
            setHistory([
                { text, translation: data.translation, lang: targetLang },
                ...history,
            ]);
        } catch (err) {
            setTranslation("Error: Could not fetch translation");
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-indigo-600 mb-6">Polyglot Sensei</h1>

            <div className="mb-4">
                <label className="mr-2 text-indigo-600 font-medium">Translate to:</label>
                <select
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="border rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                    <option value="zh-TW(用繁體中文回應)">繁體中文</option>
                    <option value="ja">日本語</option>
                    <option value="en">English</option>
                </select>
            </div>

            <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
                <Card
                    title="Original"
                    titleColor="text-blue-600"
                    content={text || "Example"}
                    isLoading={false}
                />
                <Card
                    title="Translation"
                    titleColor="text-red-600"
                    content={translation || "Translation will appear here..."}
                    isLoading={isLoading}
                />
            </div>

            <div className="mt-8 w-full max-w-4xl">
                <textarea
                    className="w-full border rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    rows="3"
                    placeholder="Paste your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    onClick={handleTranslate}
                    disabled={isLoading}
                    className={`mt-3 px-6 py-2 font-medium rounded-2xl shadow transition ${isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-500 text-indigo-600 hover:bg-indigo-600"
                        }`}
                >
                    {isLoading ? "Translating..." : "Translate"}
                </button>
            </div>

            <div className="mt-10 w-full max-w-4xl">
                <h2 className="text-xl font-bold text-gray-700 mb-4">History</h2>
                <ul className="space-y-2">
                    {history.map((item, idx) => (
                        <li key={idx} className="p-3 border rounded-xl bg-white shadow-sm">
                            <p className="text-gray-700"><b>Original:</b> {item.text}</p>
                            <p className="text-indigo-600"><b>Translation:</b> {item.translation}</p>
                            <p className="text-sm text-gray-400">Lang: {item.lang}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
