export default function ExtendedFamily({ onNext, onBack }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Extended Family</h2>
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
          type="button"
          onClick={onNext}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </form>
    </div>
  );
}
