export default function Card({ title, titleColor, content, isLoading }) {
    return (
        <div className="bg-white shadow-md rounded-2xl p-4">
            <h2 className={`text-xl font-semibold mb-2 ${titleColor}`}>{title}</h2>
            {isLoading ? (
                <p className="text-gray-400 italic">Translating...</p>
            ) : (
                <p className="text-gray-800 leading-relaxed">{content}</p>
            )}
        </div>
    );
}
