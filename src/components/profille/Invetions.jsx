import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsPencilFill } from "react-icons/bs";
import { formDataActions } from "../../store/slices/formData";
import { updateProfile } from "../../helpers/addSingle";
import { deleteProfile } from "../../helpers/deleteProfile";
import { editSingle } from "../../helpers/updateSingle";

const Invetions = () => {
  const dispatch = useDispatch();
  const [addNewData, setAddNewData] = useState(false);
  const [editData, setEditData] = useState(null);


  const inventionsO = useSelector((state) => state.logged.userData.profile.inventions);

  useEffect(() => {
    // Use a separate function to handle the asynchronous data transformation
      const inventions = inventionsO.flatMap((inner) => inner);
      dispatch(formDataActions.addInvention(inventions));

  }, [inventionsO]);
  const inventionsInitialValues = useSelector((state) => state.formData.inventions);
  const initialInvetion = inventionsInitialValues.flatMap((inner) => inner);


  const [invetion, setInvetion] = useState({
    _id: Math.floor(Math.random() * 90),
    title: "",
    description: "",
  });

  const udpateTitle = (e) => {
    setInvetion((prev) => ({ ...prev, title: e.target.value }));
  };

  const updateDesctiption = (e) => {
    setInvetion((prev) => ({ ...prev, description: e.target.value }));
  };
  const handleNewData = (e) => {
    e.preventDefault();

    // Add a new invention
    dispatch(formDataActions.addInvention(invetion));
    updateProfile("inventions",invetion)

    setAddNewData(false);
    setEditData(null); // Reset the edit state after successfully handling edit or adding a new invention
  };
  const handleEdit = (itemId) => {
    setEditData(itemId);
    const itemToEdit = initialInvetion.find((item) => item._id === itemId);
    setInvetion({
      _id: itemToEdit._id,
      title: itemToEdit.title,
      description: itemToEdit.description,
    });
    setAddNewData(false); // Close the add new data form when opening the edit form
  };

  const handleAddNewData = () => {
    if (editData) {
      // Reset the editData state to null if in edit mode
      setEditData(null);
    } else {
      // Toggle the addNewData state if not in edit mode
      setAddNewData((prev) => !prev);
    }
    // Reset the invetion state to its initial empty values
    setInvetion({
      _id: Math.floor(Math.random() * 90),
      title: "",
      description: "",
    });
  };
  const handleEditChanges = (e) => {
    e.preventDefault();
    const editedInvention = {
      _id: editData,
      title: invetion.title,
      description: invetion.description,
    };
    
    editSingle("inventions", editedInvention);
    // dispatch(formDataActions.editInvention(editedInvention));
    setEditData(null);
    setInvetion({
      _id: null,
      title: "",
      description: "",
    });
  };

  const handleDelete = (_id) => {
    // dispatch(formDataActions.deleteInvetion({ _id: _id }));
    deleteProfile(_id)
  };

  return (
    <div className="h-full sm:px-20 overflow-x-hidden ">
      <div className="bg-white">
        <div className="w-full border-b py-5  relative    ss:px-[5%]">
          <h1 className="text-[#9E6F27] font-extrabold text-xl">
            My Inventions
          </h1>
          <div
            className="absolute right-2 top-5 hover:cursor-pointer "
            onClick={handleAddNewData}
          >
            <img
              src="/assets/add.png"
              alt="add new invetion"
              className="object-cover"
            />
          </div>
        </div>
        <div>
          {addNewData && (
            <div className="w-full border-b py-5  relative    ss:px-[5%]    ">
              <form
                className="border-b  py-5 flex   flex-col gap-5"
                onSubmit={handleNewData}
              >
                <div className="flex flex-col">
                  <label htmlFor="title" className="text-[#555555] ">
                    title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="border-2 md:w-[50%] sm:w-[80%] ss:w-[90%] indent-5 rounded-md  "
                    required
                    value={invetion.title}
                    onChange={udpateTitle}
                  />
                </div>
                <div className="flex ss:flex-col lg:flex-row   lg:items-end  ss:gap-6  ">
                  <div className=" flex flex-col md:w-full ">
                    <label htmlFor="description" className="text-[#555555] ">
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      className="border-2 w-10/12  indent-5 h-24 rounded-md"
                      required
                      value={invetion.description}
                      onChange={updateDesctiption}
                    />
                  </div>
                  <div className="flex ss:flex-col md:flex-row  md:items-end  ss:gap-6 md:gap">
                    <input
                      type="submit"
                      value="Save"
                      className="px-10 bg-[#9E6F27] hover:bg-[#825E27] text-white py-1 rounded-xl"
                    />
                    <button
                      onClick={() => setAddNewData(false)}
                      className="px-10 hover:bg-[#EDE4CE] border-2 border-[#9E6F27] text-[#9E6F27] py-1 rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          {initialInvetion.map((item) =>
            editData == item._id ? (
              <>
                {" "}
                <form
                  key={item._id}
                  className="border-b  py-5 flex  ss:px-[5%] flex-col gap-5 "
                  onSubmit={handleEditChanges}
                >
                  <div className="flex flex-col">
                    <label htmlFor="title" className="text-[#555555] ">
                      title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="border-2 md:w-[50%] sm:w-[80%] ss:w-[90%] indent-5 rounded-md  "
                      required
                      value={invetion.title}
                      onChange={udpateTitle}
                    />
                  </div>
                  <div className="flex ss:flex-col lg:flex-row   lg:items-end  ss:gap-6  ">
                    <div className=" flex flex-col md:w-full ">
                      <label htmlFor="description" className="text-[#555555] ">
                        Description
                      </label>
                      <input
                        type="text"
                        id="description"
                        className="border-2 md:w-[100%] sm:w-[80%] ss:w-[90%]  indent-5 h-24 rounded-md"
                        required
                        value={invetion.description}
                        onChange={updateDesctiption}
                      />
                    </div>
                    <div className="flex ss:flex-col md:flex-row  md:items-end  ss:gap-6 md:gap">
                      <input
                        type="submit"
                        value="Save"
                        className="px-10 bg-[#9E6F27] hover:bg-[#825E27] text-white py-1 rounded-xl"
                      />
                      <button
                        onClick={() => setEditData(null)}
                        className="px-10 hover:bg-[#EDE4CE] border-2 border-[#9E6F27] text-[#9E6F27] py-1 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-10 bg-[#666666] border-2  text-white  hover:opacity-50 py-1 rounded-xl"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <div
                key={item._id}
                  className="border-b  py-5 flex  ss:px-[5%] flex-col gap-5"
              >
                <div className="relative">
                  <h1 className="text-medium font-bold">{item.title}</h1>
                  <div
                    className="bg-[#9E6F27] flex justify-center items-center rounded-full p-1 absolute right-2 top-2 hover:cursor-pointer"
                    onClick={() => handleEdit(item._id)} // Pass the itemId to handleEdit
                  >
                    <BsPencilFill size={20} color="white" />
                  </div>
                </div>
                <p>{item.description}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Invetions;