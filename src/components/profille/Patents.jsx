import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsPencilFill } from "react-icons/bs";
import { formDataActions } from "../../store/slices/formData";
import { updateProfile } from "../../helpers/addSingle";
import { deleteProfile } from "../../helpers/deleteProfile";
import { editSingle } from "../../helpers/updateSingle";

const Patents = () => {
  const dispatch = useDispatch();
  const [addNewData, setAddNewData] = useState(false);
  const [editData, setEditData] = useState(null);
  const [ableToEdit,setBeAbleToEdit] = useState(false);

  const patents0 = useSelector((state) => state.logged.userData.profile.patents);
  useEffect(() => {
    // Use a separate function to handle the asynchronous data transformation
      const patents = patents0.flatMap((inner) => inner);
      dispatch(formDataActions.addPatent(patents));

  }, [patents0]);
  const patentInitialValue0 = useSelector((state) => state.formData.patents);
  const patentsInitialValues = patentInitialValue0.flatMap((inner) => inner);

  const [patent, setPatent] = useState({
    _id: Math.floor(Math.random() * 90),
    title: "",
    description: "",
  });

  const updateTitle = (e) => {
    setPatent((prev) => ({ ...prev, title: e.target.value }));
  };

  const updateShoolDescription = (e) => {
    setPatent((prev) => ({ ...prev, description: e.target.value }));
  };
  const handleNewData = (e) => {
    e.preventDefault();

    // Add a new invention
    dispatch(formDataActions.addPatent(patent));
    updateProfile("patents",patent)

    setAddNewData(false);
    setEditData(null); // Reset the edit state after successfully handling edit or adding a new invention
  };
  const handleEdit = (itemId) => {
    setBeAbleToEdit(prev=>!prev)
    setEditData(itemId);
    const itemToEdit = patentsInitialValues.find((item) => item._id === itemId);
    setPatent({
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
    setPatent({
      _id: Math.floor(Math.random() * 90),
      title: "",
      description: "",
    });
  };
  const handleEditChanges = (e) => {
    e.preventDefault();
    const editPatent = {
      _id: editData,
      title: patent.title,
      description: patent.description,
    };
    editSingle("patents", editPatent);

    dispatch(formDataActions.editPatent(editPatent));
    setEditData(null);
    setPatent({
      _id: null,
      title: "",
      description: "",
    });
  };

  const handleDelete = (_id) => {
    // dispatch(formDataActions.deletePatent({ _id: _id }));
    setBeAbleToEdit(false)
    deleteProfile(_id)
  };

  return (
    <div className="h-full  sm:px-20   overflow-x-auto-hidden">
      
      <div className="bg-white">
        <div className="w-full border-b py-5  relative  ss:px-[5%]  ">
          <h1 className="text-[#9E6F27] font-extrabold text-xl">
            Patents
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
            <div className="w-full border-b py-5  relative    ss:px-[5%]">
              <form
                className=" border-b  py-5 flex   flex-col gap-5"
                onSubmit={handleNewData}
              >
                <div className="flex flex-col">
                  <label htmlFor="title" className="text-[#555555] ">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="border-2 md:w-[50%] sm:w-[80%] ss:w-[90%] indent-5 rounded-md"
                    required
                    value={patent.title}
                    onChange={updateTitle}
                  />
                </div>
                <div className="flex ss:flex-col lg:flex-row   lg:items-end  ss:gap-6  ">
                  <div className="flex flex-col md:w-full ">
                    <label htmlFor="description" className="text-[#555555] ">
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      className="border-2 w-10/12 indent-5  h-24 rounded-md"
                      required
                      value={patent.description}
                      onChange={updateShoolDescription}
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
          {patentsInitialValues.map((item) =>
          
           ableToEdit && editData == item._id ? (
              <>
                {" "}
                <form
                  key={item._id}
                  className="border-b  py-5 flex  ss:px-[5%] flex-col gap-5"
                  onSubmit={handleEditChanges}
                >
                  <div className="flex flex-col">
                    <label htmlFor="title" className="text-[#555555] ">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="border-2 md:w-[50%] sm:w-[80%] ss:w-[90%] indent-5 rounded-md"
                      required
                      value={patent.title}
                      onChange={updateTitle}
                    />
                  </div>
                  <div className="flex ss:flex-col md:flex-row  md:items-end   ss:gap-6  ">
                    <div className="flex flex-col md:w-full    ">
                      <label htmlFor="description" className="text-[#555555] ">
                        Description
                      </label>
                      <input
                        type="text"
                        id="description"
                        className="border-2 md:w-[100%] sm:w-[80%] ss:w-[90%]  indent-5 h-24 rounded-md"
                        required
                        value={patent.description}
                        onChange={updateShoolDescription}
                      />
                    </div>
                    <div className="align-baseline  flex md:flex-row ss:flex-col ss:gap-3 md:justify-between  gap-5 ss:w-full-5">
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
                      // type="button"
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

export default Patents;
