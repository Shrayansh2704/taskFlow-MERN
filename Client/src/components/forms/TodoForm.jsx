function TodoForm({

    todoData,

    editingId,

    handleChange,

    handleSubmit,

    clearForm,

}) {

    return (

        <div className="bg-white rounded-2xl shadow-md p-8">

            <h2 className="text-2xl font-bold mb-6">

                {editingId ? "Update Todo" : "Add New Todo"}

            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >

                <div className="md:col-span-2">

                    <label className="block mb-2 font-medium">

                        Todo Title

                    </label>

                    <input
                        type="text"
                        name="title"
                        value={todoData.title}
                        onChange={handleChange}
                        placeholder="Enter Todo Title"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#BDEB25]"
                        required
                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium">

                        Priority

                    </label>

                    <select
                        name="priority"
                        value={todoData.priority}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#BDEB25]"
                    >

                        <option value="Low">
                            Low
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="High">
                            High
                        </option>

                    </select>

                </div>

                <div>

                    <label className="block mb-2 font-medium">

                        Start Date

                    </label>

                    <input
                        type="date"
                        name="startDate"
                        value={todoData.startDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#BDEB25]"
                        required
                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium">

                        End Date

                    </label>

                    <input
                        type="date"
                        name="endDate"
                        value={todoData.endDate}
                        onChange={handleChange}
                        min={
                            todoData.startDate ||
                            new Date().toISOString().split("T")[0]
                        }
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#BDEB25]"
                        required
                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium">

                        Start Time

                    </label>

                    <input
                        type="time"
                        name="startTime"
                        value={todoData.startTime}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#BDEB25]"
                        required
                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium">

                        End Time

                    </label>

                   <input
                        type="time"
                        name="endTime"
                        value={todoData.endTime}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#BDEB25]"
                        required
                    />

                </div>

                <div className="md:col-span-2 flex gap-4">

                    <button
                        type="submit"
                        className="bg-[#BDEB25] hover:bg-[#acd61f] transition px-8 py-3 rounded-xl font-semibold"
                    >

                        {

                            editingId

                                ? "Update Todo"

                                : "Add Todo"

                        }

                    </button>

                    {

                        editingId && (

                            <button
                                type="button"
                                onClick={clearForm}
                                className="bg-gray-200 hover:bg-gray-300 transition px-8 py-3 rounded-xl"
                            >

                                Cancel

                            </button>

                        )

                    }

                </div>

            </form>

        </div>

    );

}

export default TodoForm;