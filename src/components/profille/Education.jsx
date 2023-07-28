import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsPencilFill } from "react-icons/bs";
import { formDataActions } from "../../store/slices/formData";
import { updateProfile } from "../../helpers/addSingle";
import { deleteProfile } from "../../helpers/deleteProfile";
import { editSingle } from "../../helpers/updateSingle";

const Education = () => {
  const dispatch = useDispatch();
  const [addNewData, setAddNewData] = useState(false);
  const [editData, setEditData] = useState(null);
  const [ableToEdit,setBeAbleToEdit] = useState(false);

  const education0 = useSelector((state) => state.logged.userData.profile.education);
  useEffect(() => {
    // Use a separate function to handle the asynchronous data transformation
      const educations = education0.flatMap((inner) => inner);
      dispatch(formDataActions.addEducation(educations));

  }, [education0]);
  const educationInitialValues0 = useSelector((state) => state.formData.education);
  const educationInitialValues = educationInitialValues0.flatMap((inner) => inner);
  const [education, setEducation] = useState({
    _id: Math.floor(Math.random() * 90),
    school: "",
    description: "",
  });

  const updateSchool = (e) => {
    setEducation((prev) => ({ ...prev, school: e.target.value }));
  };

  const updateShoolDescription = (e) => {
    setEducation((prev) => ({ ...prev, description: e.target.value }));
  };
  const handleNewData = (e) => {
    e.preventDefault();

    // Add a new invention
    // educationInitialValues.shift()
    dispatch(formDataActions.addEducation(education));
    updateProfile("education",education)

    setAddNewData(false);
    setEditData(null); // Reset the edit state after successfully handling edit or adding a new invention
  };
  const handleEdit = (itemId) => {
    setBeAbleToEdit(prev=>!prev)

    setEditData(itemId);
    const itemToEdit = educationInitialValues.find((item) => item._id === itemId);
    setEducation({
      _id: itemToEdit._id,
      school: itemToEdit.school,
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
    setEducation({
      _id: Math.floor(Math.random() * 90),
      school: "",
      description: "",
    });
  };
  const handleEditChanges = (e) => {
    e.preventDefault();
    const editEducation = {
      _id: editData,
      school: education.school,
      description: education.description,
    };
    editSingle("education", editEducation);

    dispatch(formDataActions.editEducation(editEducation));

    setEditData(null);
    setEducation({
      _id: null,
      school: "",
      description: "",
    });
  };

  const handleDelete = (_id) => {
    
    // dispatch(formDataActions.deleteEducation({ _id: _id }));
    deleteProfile(_id);
  };

  return (
    <div className="h-full  sm:px-20   overflow-x-auto-hidden">
      <div className="bg-white">
        <div className="w-full border-b py-5  relative   ss:px-[5%] ">
          <h1 className="text-[#9E6F27] font-extrabold text-xl">
            Education
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
            <div className="w-full border-b py-5  relative    ss:px-[5%] ">
              <form
                onSubmit={handleNewData}
              >
                <div className="flex flex-col">
                  <label htmlFor="school" className="text-[#555555] ">
                    School
                  </label>
                  <input
                    type="text"
                    id="school"
                    className="border-2 w-5/12 indent-5 rounded-md"
                    required
                    value={education.school}
                    onChange={updateSchool}
                  />
                </div>
                <div className="flex ss:flex-col lg:flex-row   lg:items-end  ss:gap-6">
                  <div className="flex flex-col md:w-full ">
                    <label htmlFor="description" className="text-[#555555] ">
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      className="border-2 w-10/12 h-24 indent-5 rounded-md"
                      required
                      value={education.description}
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
          {educationInitialValues.map((item) =>
            ableToEdit && editData == item._id ? (
              <>
                {" "}
                <form
                  key={item._id}
                  className="border-b  py-5 flex ss:px-[5%] flex-col gap-5"
                  onSubmit={handleEditChanges}
                >
                  <div className="flex flex-col">
                    <label htmlFor="school" className="text-[#555555] ">
                      School
                    </label>
                    <input
                      type="text"
                      id="school"
                      className="border-2  w-[50%] indent-5 rounded-md"
                      required
                      value={education.school}
                      onChange={updateSchool}
                    />
                  </div>
                  <div className="flex ss:flex-col lg:flex-row   lg:items-end  ss:gap-6 ">
                    <div className="flex flex-col md:w-full  "> 
                      <label htmlFor="description" className="text-[#555555] ">
                        Description
                      </label>
                      <input
                        type="text"
                        id="description"
                        className="border-2  md:w-[100%] sm:w-[80%] ss:w-[90%] indent-5  h-24 rounded-md"
                        required
                        value={education.description}
                        onChange={updateShoolDescription}
                      />
                    </div>
                    <div className="align-baseline  flex md:flex-row ss:flex-col ss:gap-3  gap-5 md:w- ss:w-full-5">
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
                  className="border-b  py-5 flex ss:px-[5%] flex-col gap-5  "
              >
                <div className="relative">
                  <h1 className="text-medium font-bold">{item.school}</h1>
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

export default Education;
