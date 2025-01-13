export default function Calculation({ onBack }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Calculation</h2>
      <form>
        {/* Add form fields here */}
        <button
          type="button"
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded me-4"
        >
          Back
        </button>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
