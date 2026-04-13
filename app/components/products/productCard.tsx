// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProductCard({ product }: any) {
    return (
        <div className="border rounded-lg p-3 shadow hover:shadow-md transition bg-white">
            <img
                src={product.thumbnail}
                alt={product.title}
                className="h-32 w-full object-cover rounded"
            />

            <h2 className="mt-2 font-semibold text-sm">
                {product.title}
            </h2>

            <p className="text-blue-600 font-bold">
                ${product.price}
            </p>

            <p className="text-xs text-gray-500">
                Rating: ⭐ {product.rating}
            </p>
        </div>
    );
}