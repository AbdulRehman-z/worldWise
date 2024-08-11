import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();

  return (
    <form className="min-w-96 mx-auto mt-10 p-4 bg-colorDark-2 text-colorLight-2 rounded shadow">
      <div className="mb-4">
        <label htmlFor="city" className="block  text-sm font-bold mb-2">
          City Name
        </label>
        <input
          type="text"
          id="city"
          className="shadow appearance-none  border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="visited" className="block  text-sm font-bold mb-2">
          When did you go?
        </label>
        <input
          type="date"
          id="visited"
          className="shadow appearance-none  border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="note" className="block  text-sm font-bold mb-2">
          Note
        </label>
        <textarea
          placeholder="Write your note here"
          id="note"
          className="shadow appearance-none  border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          rows={4}
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
            console.log("submit");
          }}
          type="button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
        >
          Back
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log("submit");
          }}
          type="submit"
          className="bg-blue-500 hove text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default Form;
