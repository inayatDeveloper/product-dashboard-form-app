export default function ProductLoader() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
                <div
                    key={i}
                    className="h-40 bg-gray-200 animate-pulse rounded"
                />
            ))}
        </div>
    );
}